"use server"
import { date, z } from "zod"
import { SignInSchema, SignUpSchema } from "@/lib/types/auth"
import {
    createToken,
    generateRandomNumbers,
    generateRestePasswordToken,
    getResetPasswordToken,
    getUserByEmail,
    ResetPassowrdEmail,
    VereficationEmail,
} from "./lib/auth"
import { cookies } from "next/headers"
import { createHash } from "crypto"
import db, { knock, secret } from "./secrets"
import { SignUpSchemaType } from "@/lib/types/auth"
import { redirect } from "next/navigation"

export const SignIn = async (result: z.infer<typeof SignInSchema>) => {
    try {
        const findUser = await db.user.findFirst({
            where: {
                email: result.email,
            },
            include: {
                settings: true,
            },
        })
        if (!findUser) {
            return {
                status: "error",
                message: "User not found. Please sign up.",
            }
        }
        if (!findUser.isVerified) {
            console.log("user not verified", findUser)
            const token = await generateRandomNumbers()
            const { email, id } = findUser
            const name = findUser.name ?? ""

            const findToken = await db.userVerificationRequest.findMany({
                where: {
                    userId: findUser.id,
                },
            })
            if (findToken.length > 0) {
                await db.userVerificationRequest.deleteMany({
                    where: {
                        userId: findUser.id,
                    },
                })
            }

            const res = await db.userVerificationRequest.create({
                data: {
                    token: token,
                    userId: findUser.id,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                },
            })
            if (!res) {
                return { status: "error", message: "Token not created" }
            }

            //@ts-ignore
            const send = await VereficationEmail({
                email: email ?? "", // Provide a default empty string if email is null/undefined
                name: name ?? "",
                token: token ?? "",
                id: id ?? "",
            })
            if (!send) {
                return { status: "error", message: "Email not sent" }
            }
            return {
                status: "error",
                message: "User not verified yet, please check your email",
            }
        }
        const hashedPassword = createHash("sha256")
            .update(result.password)
            .digest("hex")
        if (hashedPassword !== findUser.password) {
            return { status: "error", message: "Password or email not match" }
        }
        // delete the old token

        const token = (await createToken(findUser)) ?? ""

        const cookie = cookies().set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        })
        if (!cookie) {
            return { status: "error", message: "Cookie not set" }
        }
        return {
            status: "success",
            message: "User logged in successfully",
            data: findUser,
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Somthing Worng ! try again laiter.",
        }
    }
}

export const SignUp = async (result: SignUpSchemaType) => {
    try {
        const isValid = SignUpSchema.safeParse(result)
        if (!isValid.success) {
            return { status: "error", message: "Invalid data" }
        }

        const { name, email, password } = result
        const findUser = await getUserByEmail(email)
        if (findUser) {
            return { status: "error", message: "User already exist" }
        }
        const hashedPassword = createHash("sha256")
            .update(password)
            .digest("hex")
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        if (!user) {
            return { status: "error", message: "User not created" }
        }
        const token = await generateRandomNumbers()
        const { id } = user
        const findToken = await db.userVerificationRequest.findMany({
            where: {
                userId: user.id,
            },
        })
        if (findToken.length > 0) {
            await db.userVerificationRequest.deleteMany({
                where: {
                    userId: user.id,
                },
            })
        }

        const res = await db.userVerificationRequest.create({
            data: {
                token: token,
                userId: user.id,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        })
        if (!res) {
            return { status: "error", message: "Token not created" }
        }
        //@ts-ignore
        const send = await VereficationEmail({
            email: email ?? "", // Provide a default empty string if email is null/undefined
            name: name ?? "",
            token: token ?? "",
            id: id ?? "",
        })

        if (!send) {
            return { status: "error", message: "Email not sent" }
        }
        // make the settings for the user

        const settings = await db.settings.create({
            data: {
                userId: user.id,
            },
        })
        if (!settings) {
            return { status: "error", message: "Settings not created" }
        }
        return {
            status: "success",
            message: "User created successfully. Please verify your email.",
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Somthing Worng ! try again laiter.",
        }
    }
}

const types = z.object({
    id: z.string(),
    token: z.string(),
})

export const verifyTokenUser = async ({ id, token }: z.infer<typeof types>) => {
    try {
        const findToken = await db.userVerificationRequest.findFirst({
            where: {
                userId: id,
                token: token,
                expires: {
                    gt: new Date(),
                },
            },
        })

        if (!findToken) {
            return { status: "error", message: "Token not found" }
        }

        await db.user.update({
            where: {
                id: id,
            },
            data: {
                isVerified: true,
            },
        })

        await db.userVerificationRequest.deleteMany({
            where: {
                userId: id,
            },
        })

        return { status: "success", message: "User verified successfully" }
    } catch (error) {
        console.error(error)
        return {
            status: "error",
            message: "Something went wrong! Please try again later.",
        }
    }
}

export const forgetPassword = async (userEmail: string) => {
    try {
        const user = await getUserByEmail(userEmail)
        if (!user) {
            return {
                status: "error",
                message: "are you sure this email is correct ?",
            }
        }
        const token = await generateRandomNumbers()
        const { email, name } = user
        const secret = await generateRestePasswordToken(
            email ?? "", // Provide a default empty string if email is null/undefined
            token ?? "",
        )
        if (!secret) {
            return {
                status: "error",
                message:
                    "we can not create a reset link for you, try again laiter.",
            }
        }
        const send = await ResetPassowrdEmail(
            secret.toString(),
            name ?? "",
            email ?? "",
        )
        if (!send) {
            return {
                status: "error",
                message: "we can not send you a reset link, try again laiter.",
            }
        }
        const res = await db.resetPasswordRequest.upsert({
            where: {
                userId: user.id,
            },
            update: {
                token: parseInt(token),
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
            create: {
                token: parseInt(token),
                userId: user.id,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        })
        if (!res) {
            return {
                status: "error",
                message:
                    "we can not create a reset link for you, try again laiter.",
            }
        }
        return {
            status: "success",
            message:
                "we sent you a reset link to your email, please check your email.",
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Somthing Worng ! try again laiter.",
        }
    }
}

const resetPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "try to use a more secure password with at least 8 characters",
    }),
    secret: z.string(),
})

export const resetPassword = async (
    data: z.infer<typeof resetPasswordSchema>,
) => {
    try {
        const { payload: userData } = (await getResetPasswordToken(
            data.secret,
        )) as any
        if (!userData) {
            return { status: "error", message: "Invalid token" }
        }
        const result = resetPasswordSchema.parse(data)

        const hashedPassword = createHash("sha256")
            .update(result.password)
            .digest("hex")
        if (!hashedPassword) {
            return { status: "error", message: "Password not hashed" }
        }
        // ceck if token is exist
        const user = (await getUserByEmail(userData.email)) as any
        if (!user) {
            return { status: "error", message: "User not found" }
        }
        const findToken = await db.resetPasswordRequest.findFirst({
            where: {
                userId: user.id,
            },
        })
        if (!findToken) {
            return { status: "error", message: "Token not found" }
        }

        const res = await db.user.update({
            where: {
                email: userData.email,
            },
            data: {
                password: hashedPassword,
            },
        })
        if (!res) {
            return { status: "error", message: "Password not updated" }
        }

        if (!user) {
            return { status: "error", message: "User not found" }
        }
        await db.resetPasswordRequest.deleteMany({
            where: {
                userId: user.id,
            },
        })
        return { status: "success", message: "Password updated successfully" }
    } catch (error: any) {
        if (error.errors) {
            error.errors.map((err: any) => {
                if (err.path[0] === "password") {
                    return { status: "error", message: err.message }
                }
            })
        }
        return {
            status: "error",
            message: "Somthing Worng ! try again laiter.",
        }
    }
}
