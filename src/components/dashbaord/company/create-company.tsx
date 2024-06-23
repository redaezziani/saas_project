"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import z from "zod"
import { CompanyIcon } from "./icons"

import useSWR from "swr"
const fetcher = (url) => fetch(url).then((res) => res.json())

export const CompanySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    companyEmail: z.string().email("Invalid email address"),
    companyPhone: z
        .string()
        .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
    companyAddress: z
        .string()
        .min(2, "Company address must be at least 2 characters"),
    companyCity: z
        .string()
        .min(2, "Company city must be at least 2 characters"),
})

export type CompanyType = z.infer<typeof CompanySchema>

export function CreateCompany() {
    const [isOpened, setIsOpened] = React.useState(true)
    const { data: company } = useSWR("/api/admin/settings", fetcher)
    const [loading, setLoading] = React.useState(false)
    const { toast } = useToast()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CompanyType>({
        resolver: zodResolver(CompanySchema),
    })

    const onSubmit = async (data: CompanyType) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/admin/company", data)

            if (response.status === 200) {
                toast({ variant: "success", title: "Company Created" })
                setIsOpened(false)
                reset() // Reset the form after successful submission
            } else {
                toast({
                    variant: "error",
                    title: "Company Creation Failed",
                    description: "An unexpected error occurred.",
                })
            }
        } catch (error: any) {
            console.error(error)
            toast({
                variant: "error",
                title: "Error Creating Company",
                description: error.message || "Please try again.",
            }) // Show error message if available
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "e") {
                setIsOpened(true)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="flex items-center gap-2">
                    <CompanyIcon />
                    <span>New Company</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className="w-full p-3">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 flex flex-col items-start justify-start gap-3 space-y-4"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Create Company</h2>
                        <p className="text-sm text-slate-500">
                            Create a new company to manage its employees and
                            departments.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Company Name"
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="companyEmail">Company Email</Label>
                        <Controller
                            name="companyEmail"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="companyEmail"
                                    placeholder="Company Email"
                                    error={errors.companyEmail?.message}
                                />
                            )}
                        />
                        {errors.companyEmail && (
                            <p className="text-sm text-red-500">
                                {errors.companyEmail.message}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="companyPhone">Company Phone</Label>
                        <Controller
                            name="companyPhone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="companyPhone"
                                    placeholder="Company Phone"
                                    error={errors.companyPhone?.message}
                                />
                            )}
                        />
                        {errors.companyPhone && (
                            <p className="text-sm text-red-500">
                                {errors.companyPhone.message}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="companyAddress">Company Address</Label>
                        <Controller
                            name="companyAddress"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="companyAddress"
                                    placeholder="Company Address"
                                    error={errors.companyAddress?.message}
                                />
                            )}
                        />
                        {errors.companyAddress && (
                            <p className="text-sm text-red-500">
                                {errors.companyAddress.message}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="companyCity">Company City</Label>
                        <Controller
                            name="companyCity"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="companyCity"
                                    placeholder="Company City"
                                    error={errors.companyCity?.message}
                                />
                            )}
                        />
                        {errors.companyCity && (
                            <p className="text-sm text-red-500">
                                {errors.companyCity.message}
                            </p>
                        )}
                    </div>
                    <div className="flex w-full gap-2">
                        <Button
                            size={"lg"}
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            className="w-full"
                        >
                            Create Company
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}
