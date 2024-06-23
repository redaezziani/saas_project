"use client"
import SubmitButton from "./submit"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignInSchema } from "@/lib/types/auth"
import { SignIn } from "@/(auth)/user-actions"
import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ShieldAlert } from "lucide-react"
import AlertMessage from "./alert-message"
import { ResErrType } from "@/lib/types/help"

const SignInForm = () => {
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [resErr, setResErr] = useState<ResErrType>({
        status: "",
        message: "",
    })

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        formData: FormData,
    ) => {
        event.preventDefault()
        setIsLoading(true)
        setErrors({ email: "", password: "" })

        try {
            const form = Object.fromEntries(formData.entries())
            const result = await SignInSchema.parseAsync(form)
            const res = (await SignIn(result)) as any
            if (res.status === "success") {
                router.refresh()
                return
            } else if (res.status === "error") {
                setResErr({ status: res.status, message: res.message })
            }
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
                <div className="flex w-full flex-col items-start justify-start">
                    {resErr?.status === "error" && (
                        <AlertMessage
                            title="Error"
                            className="border border-red-500/35 bg-red-400/10 text-red-500"
                            icon={
                                <ShieldAlert
                                    className="text-red-500"
                                    size={20}
                                />
                            }
                            description={resErr.message ?? ""}
                        />
                    )}
                </div>
                <div className="mt-4 flex w-full flex-col items-start justify-start gap-3">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="email"
                    >
                        Email Address
                    </Label>
                    <Input
                        className="w-full"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        name="email"
                    />
                    <p className="text-sm font-normal text-destructive">
                        {errors.email}
                    </p>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-3">
                    <Label
                        className="font-semibold text-slate-600"
                        htmlFor="password"
                    >
                        Password
                    </Label>
                    <div className="relative flex w-full items-center justify-start">
                        <Input
                            className="z-10 w-full"
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
                    <p className="text-sm font-normal text-destructive">
                        {errors.password}
                    </p>
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm font-normal text-slate-400 transition-all duration-300 ease-in-out hover:text-slate-600"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <SubmitButton ispending={isLoading}>Sign in</SubmitButton>
                <div className="flex w-full items-center justify-center text-sm">
                    <p className="flex gap-1 text-slate-300">
                        Don't have an account ?
                        <Link href="/auth/signup" className="ml-1 text-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
