"use client"

import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import React from "react"
import { DatePicker } from "../globals/date-piker"
import { useEffect, useState } from "react"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const SingleBarChart = () => {
    const handleDateChange = (date: Date) => {
        console.log(date)
    }
    const ref = React.useRef(null)
    const [chartWidth, setChartWidth] = useState(755)
    useEffect(() => {
        // Set chart width based on the parent container width
        setChartWidth(ref.current.offsetWidth)
    }, [])

    const options = {
        chart: {
            height: 300,
            type: "bar",
            toolbar: { show: false },
            zoom: { enabled: false }, // Added for area chart style
            sparkline: { enabled: false },
            width: chartWidth,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        colors: ["#0ea5e9", "#f59e0b"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth", // Added for area chart style
            width: 2,
            colors: ["#0ea5e9", "#f59e0b"], // Colors for the bar outlines
        },
        grid: { strokeDashArray: 2 }, // Added for area chart style
        xaxis: {
            categories: [
                "01 Jan",
                "02 Jan",
                "03 Jan",
                "04 Jan",
                "05 Jan",
                "06 Jan",
                "07 Jan",
                "08 Jan",
                "09 Jan",
                "10 Jan",
                "11 Jan",
                "12 Jan",
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                show: true,
                style: { colors: "#9ca3af", fontSize: "13px" },
            },
        },
        yaxis: {
            labels: {
                align: "left",
                minWidth: 0,
                maxWidth: 140,
                style: { colors: "#9ca3af", fontSize: "13px" },
            },
        },

        legend: { show: false }, // Hide the legend
        tooltip: {
            enabled: false, // Disable tooltips entirely
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { height: 200 },
                },
            },
        ],
    }

    const series = [
        {
            name: "Visitors",
            data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
        },
        {
            name: "Sales",
            data: [108, 110, 120, 80, 140, 100, 90, 110, 140, 130, 120, 140],
        },
    ]

    return (
        <Card
            ref={ref}
            className="col-span-1 flex w-full flex-col items-center justify-center rounded-lg"
        >
            <div className="flex w-full items-center justify-between gap-2 p-4">
                <p className="text-sm text-slate-700">Sales & Visitors</p>
                <div className="w-32">
                    <DatePicker onDateChange={handleDateChange} />
                </div>
            </div>
            <ApexChart
                options={options}
                series={series}
                type="bar"
                height={300}
                width={chartWidth}
            />
        </Card>
    )
}

export default SingleBarChart
