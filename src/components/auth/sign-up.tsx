"use client"
import SubmitButton from "@/components/auth/submit"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignUpSchema } from "@/lib/types/auth"
import { SignUp } from "@/(auth)/user-actions"
import { useState } from "react"
import { z } from "zod"
import Link from "next/link"
import { CheckCircle, Eye, EyeOff, ShieldAlert } from "lucide-react"
import AlertMessage from "@/components/auth/alert-message"
import { ResErrType } from "@/lib/types/help"

const SignUpForm = () => {
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [resErr, setResErr] = useState<ResErrType>({
        status: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        formData: FormData,
    ) => {
        event.preventDefault()
        setIsLoading(true)
        setErrors({
            email: "",
            password: "",
            name: "",
        })

        try {
            const form = Object.fromEntries(formData.entries())
            const result = await SignUpSchema.parseAsync(form)
            console.log(result)
            if (
                result.password !== (formData.get("passwordConfirm") as string)
            ) {
                setErrors((prev) => ({
                    ...prev,
                    password: "Passwords do not match , please check them",
                }))
                return
            }

            const res = (await SignUp(result)) as any
            setResErr({
                status: res.status,
                message: res.message,
            })
        } catch (error: any) {
            if (error.errors) {
                error.errors.forEach((err: z.ZodIssue) => {
                    setErrors((prev) => ({
                        ...prev,
                        [err.path[0]]: err.message,
                    }))
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div className="relative flex w-full max-w-lg flex-col items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit(event, new FormData(event.currentTarget))
                }
                className="flex w-full flex-col items-start justify-start gap-5 lg:max-w-[33rem]"
            >
                <div className="flex flex-col items-start justify-start">
                    {resErr?.status === "error" && (
                        <AlertMessage
                            title="Error"
                            className="bg-red-500/10 text-red-500"
                            icon={
                                <ShieldAlert
                                    className="text-red-500"
                                    size={20}
                                />
                            }
                            description={resErr.message ?? ""}
                        />
                    )}
                    {resErr?.status === "success" && (
                        <AlertMessage
                            title="Success"
                            className="bg-green-500/10 text-green-500"
                            icon={
                                <CheckCircle
                                    className="text-green-500"
                                    size={20}
                                />
                            }
                            description={resErr.message ?? ""}
                        />
                    )}
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                    <div className="mt-7 flex w-full flex-col items-start justify-start gap-3">
                        <Label
                            className="font-semibold text-neutral-500"
                            htmlFor="name"
                        >
                            First name
                        </Label>
                        <Input
                            className="w-full py-5"
                            type="text"
                            placeholder="Enter your first name"
                            autoComplete="name"
                            name="name"
                        />
                        <p className="text-sm font-normal text-red-600">
                            {errors.name}
                        </p>
                    </div>
                    <div className="mt-7 flex w-full flex-col items-start justify-start gap-3">
                        <Label
                            className="font-semibold text-neutral-500"
                            htmlFor="name"
                        >
                            Last name
                        </Label>
                        <Input
                            className="w-full py-5"
                            type="text"
                            placeholder="Enter your last name"
                            autoComplete="name"
                            name="name"
                        />
                        <p className="text-sm font-normal text-red-600">
                            {errors.name}
                        </p>
                    </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-3">
                    <Label
                        className="font-semibold text-neutral-500"
                        htmlFor="email"
                    >
                        Email
                    </Label>
                    <Input
                        className="w-full py-5"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        name="email"
                    />
                    <p className="text-sm font-normal text-red-600">
                        {errors.email}
                    </p>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-3">
                    <Label
                        className="font-semibold text-neutral-500"
                        htmlFor="password"
                    >
                        Password
                    </Label>
                    <div className="relative flex w-full items-center justify-start">
                        <Input
                            className="z-10 w-full py-5"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            name="password"
                        />
                        <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 z-30 flex aspect-square h-[90%] cursor-pointer items-center justify-center bg-background"
                        >
                            {showPassword ? (
                                <EyeOff className="text-pretty" size={18} />
                            ) : (
                                <Eye className="text-slate-300" size={18} />
                            )}
                        </div>
                    </div>
                    <p className="text-sm font-normal text-red-600">
                        {errors.password}
                    </p>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-3">
                    <Label
                        className="font-semibold text-neutral-500"
                        htmlFor="passwordConfirm"
                    >
                        Confirm Password
                    </Label>

                    <div className="relative flex w-full items-center justify-start">
                        <Input
                            className="z-10 w-full py-5"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            autoComplete="current-password"
                            name="passwordConfirm"
                        />
                        <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 z-30 flex aspect-square h-[90%] cursor-pointer items-center justify-center bg-background"
                        >
                            {showPassword ? (
                                <EyeOff className="text-pretty" size={18} />
                            ) : (
                                <Eye className="text-slate-300" size={18} />
                            )}
                        </div>
                    </div>
                    <p className="text-sm font-normal text-red-600">
                        {errors.password}
                    </p>
                </div>
                <div className="flex items-start justify-start gap-2">
                    <Checkbox />
                    <p className="text-sm text-neutral-400">
                        I dont want to recive emails about Talent Traker feature
                        updates
                    </p>
                </div>
                <SubmitButton ispending={isLoading}>Sign Up</SubmitButton>
            </form>
        </div>
    )
}

export default SignUpForm
