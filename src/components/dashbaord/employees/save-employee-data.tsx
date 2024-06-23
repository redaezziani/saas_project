"use client"
import { useState } from "react"
import { Download } from "lucide-react"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"

enum SaveFormat {
    CSV = "csv",
    JSON = "json",
}

export interface EmployeeType {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    hireDate: string
    jobTitle: string
    department: string
    monthSalary: number
    status: string
}

interface SaveEmployeeProps {
    employees: EmployeeType[]
    type?: SaveFormat
}

export const SaveEmployee = ({
    employees,
    type = SaveFormat.CSV,
}: SaveEmployeeProps) => {
    const [selectedFormat, setSelectedFormat] = useState(type)

    const handleSave = () => {
        let data: string
        switch (selectedFormat) {
            case SaveFormat.CSV:
                data = convertToCSV(employees)
                break
            case SaveFormat.JSON:
                data = JSON.stringify(employees, null, 2)
                break
            default:
                return // Handle the default case if needed
        }

        const blob = new Blob([data], { type: `text/${selectedFormat}` })
        saveAs(blob, `employees.${selectedFormat}`)
    }

    const convertToCSV = (data: EmployeeType[]) => {
        const headers = Object.keys(data[0]).join(",")
        const rows = data.map((row) =>
            Object.values(row)
                .map(
                    (value) =>
                        typeof value === "string" && value.includes(",")
                            ? `"${value}"`
                            : value, // Handle commas in string values
                )
                .join(","),
        )
        return [headers, ...rows].join("\n")
    }

    return (
        <Button
            variant={"outline"}
            className="flex items-center gap-2 text-slate-500"
            onClick={handleSave}
        >
            <Download size={18} className="mr-2" />
            Save
        </Button>
    )
}
