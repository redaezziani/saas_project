"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardList, MoveRight } from "lucide-react"

import React from "react"
import CreateEmploayee from "@/components/dashbaord/employees/create-emploayee"
import NumberTicker from "@/components/dashbaord/globals/counter"
import EmployeesTable from "@/components/dashbaord/employees/table-employee"
const DashboardPage = () => {
    return (
        <div className="relative z-30 flex w-full flex-col items-start justify-start gap-2 overflow-x-hidden px-6">
            <div className="mt-20 flex flex-col items-start justify-start gap-1">
                <h1 className="text-xl font-semibold text-slate-700">
                    Employees
                </h1>
                <p className="text-sm text-slate-400">
                    Manage all employees in the company
                </p>
            </div>
            <div className="mt-3 w-full gap-4 rounded-lg border bg-white dark:divide-neutral-700 dark:border-neutral-700">
                <EmployeesTable />
            </div>
        </div>
    )
}

export default DashboardPage
