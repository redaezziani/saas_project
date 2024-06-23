"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "../globals/date-piker"
import { mutate } from "swr"

import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { EmployeeIcon } from "./icons"
import { Switch } from "@/components/ui/switch"

export const EmployeeSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name should be at least 2 characters long.")
        .max(50, "First name should not exceed 50 characters.")
        .nullable(),
    lastName: z
        .string()
        .min(2, "Last name should be at least 2 characters long.")
        .max(50, "Last name should not exceed 50 characters.")
        .nullable(),
    phone: z
        .string()
        .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number.")
        .nullable(),
    daySalary: z
        .number()
        .nonnegative("Day salary must be a positive number.")
        .nullable(),
    monthSalary: z
        .number()
        .nonnegative("Month salary must be a positive number.")
        .nullable(),
    hireDate: z.string().nonempty("Hire date is required."),
    jobTitle: z.string().nonempty("Job title is required."),
})

export type Employee = z.infer<typeof EmployeeSchema>

const CreateEmployee = () => {
    const [isOpened, setIsOpened] = React.useState(false)
    const [userId, setUserId] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<Employee>({
        resolver: zodResolver(EmployeeSchema),
    })

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setValue("hireDate", date.toISOString())
        }
    }

    const onSubmit = async (data: Employee) => {
        try {
            setLoading(true)
            const response = await fetch("/api/admin/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            })
            const json = await response.json()
            if (json.status === 200) {
                toast({
                    variant: "success",
                    title: "Employee created",
                    description: "The employee has been created successfully",
                })
                setIsOpened(false)
                mutate("/api/admin/employees")
                setValue({})
            } else {
                toast({
                    variant: "error",
                    title: "Error",
                    description: json.message,
                })
            }
        } catch (error) {
            console.error(error)
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
        <Sheet open={isOpened} onOpenChange={setIsOpened}>
            <SheetTrigger asChild>
                <Button className="flex items-center justify-center gap-2">
                    <EmployeeIcon />
                    <span className="">New employee</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className="w-full p-3">
                <div className="mt-10 flex w-full flex-col items-start justify-start gap-4 md:mt-20">
                    <div className="w-full items-start justify-start space-y-2">
                        <h2 className="text-lg font-semibold text-slate-700">
                            Create a new Employee
                        </h2>
                        <p className="text-sm font-normal text-slate-400">
                            Fill the form below to create a new employee
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-5 w-full space-y-4"
                    >
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="firstName"
                            >
                                First Name
                            </Label>
                            <Input
                                type="text"
                                id="firstName"
                                {...register("firstName")}
                                className={
                                    errors.firstName ? "border-red-500" : ""
                                }
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="lastName"
                            >
                                Last Name
                            </Label>
                            <Input
                                type="text"
                                id="lastName"
                                {...register("lastName")}
                                className={
                                    errors.lastName ? "border-red-500" : ""
                                }
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-slate-500" htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                type="tel"
                                id="phone"
                                {...register("phone")}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="daySalary"
                            >
                                Day Salary
                            </Label>
                            <Input
                                type="number"
                                id="daySalary"
                                {...register("daySalary", {
                                    valueAsNumber: true,
                                })}
                                className={
                                    errors.daySalary ? "border-red-500" : ""
                                }
                            />
                            {errors.daySalary && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.daySalary.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="monthSalary"
                            >
                                Month Salary
                            </Label>
                            <Input
                                type="number"
                                id="monthSalary"
                                {...register("monthSalary", {
                                    valueAsNumber: true,
                                })}
                                className={
                                    errors.monthSalary ? "border-red-500" : ""
                                }
                            />
                            {errors.monthSalary && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.monthSalary.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="hireDate"
                            >
                                Hire Date
                            </Label>
                            <DatePicker onDateChange={handleDateChange} />
                            {errors.hireDate && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.hireDate.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label
                                className="text-slate-500"
                                htmlFor="jobTitle"
                            >
                                Job Title
                            </Label>
                            <Input
                                type="text"
                                id="jobTitle"
                                {...register("jobTitle")}
                                className={
                                    errors.jobTitle ? "border-red-500" : ""
                                }
                            />
                            {errors.jobTitle && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.jobTitle.message}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setValue(
                                            "hireDate",
                                            new Date().toISOString(),
                                        )
                                    } else {
                                        setValue("hireDate", null)
                                    }
                                }}
                            />
                            <Label
                                className="font-medium text-slate-500"
                                htmlFor="date"
                            >
                                Set as current date
                            </Label>
                        </div>
                        <div className="mt-5">
                            <Button
                                disabled={loading}
                                loading={loading}
                                type="submit"
                                className="mt-7 w-full items-center justify-center gap-x-2 font-semibold"
                            >
                                <EmployeeIcon />
                                Create Employee
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateEmployee
