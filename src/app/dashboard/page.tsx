"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardList, MoveRight } from "lucide-react"
import React from "react"
import CreateEmploayee from "@/components/dashbaord/employees/create-emploayee"
import NumberTicker from "@/components/dashbaord/globals/counter"
import { CreateCompany } from "@/components/dashbaord/company/create-company"
import LineChar from "@/components/dashbaord/dashbaord/line-char"
import SingleBarChart from "@/components/dashbaord/dashbaord/bar-chart"
const DashboardPage = () => {
    return (
        <div className="relative z-30 flex w-full flex-col items-start justify-start gap-2 overflow-x-hidden px-3">
            <div className="relative mt-24 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                <LineChar />
                <SingleBarChart />
            </div>
        </div>
    )
}

export default DashboardPage
