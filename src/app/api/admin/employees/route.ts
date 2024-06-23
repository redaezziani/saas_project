import { NextResponse, NextRequest } from "next/server"
import db from "@/(auth)/secrets"
import { verifyToken } from "@/(auth)/lib/auth"

import { z } from "zod"

const EmployeeSchema = z.object({
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phone: z.string().nullable(),
    daySalary: z.number().nullable(),
    monthSalary: z.number().nullable(),
    hireDate: z.string(),
    jobTitle: z.string(),
})

type payload = {
    id: string
    email: string
    username: string
    profile: string
    role: string
    iat: number
}

type Employee = z.infer<typeof EmployeeSchema>

export const dynamic = "force-dynamic"
export async function GET(
    req: NextRequest,
    res: NextResponse,
): Promise<void | Response> {
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return Response.json({ status: "error", message: "No token found" })
        }

        const { payload } = (await verifyToken(token)) as { payload: payload }
        if (!payload) {
            return Response.json({ status: "error", message: "No token found" })
        }

        const company = await db.company.findUnique({
            where: {
                ownerId: payload.id as string,
            },
        })
        const employees = await db.employee.findMany({
            where: {
                companyId: company.id,
            },
        })
        if (!employees) {
            return Response.json({
                status: 400,
                message: "please try again later.",
                data: null, // Assuming Prisma client is in "@/lib/db"
            })
        }

        const employeesWithEmail = employees.map((employee) => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            phone: employee.phone,
            hireDate: employee.hireDate,
            jobTitle: employee.jobTitle,
            department: employee.department,
            monthSalary: employee.monthSalary,
        }))

        return Response.json({
            status: 200,
            message: "The data is here.",
            data: employeesWithEmail,
        })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(
    req: NextRequest,
    res: NextResponse,
): Promise<void | Response> {
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return Response.json({ status: "error", message: "No token found" })
        }

        const { payload } = (await verifyToken(token)) as { payload: payload }
        if (!payload) {
            return Response.json({ status: "error", message: "No token found" })
        }

        // check if the user is the owner of the company and if the company exists and also for the plan that he not have more than 10 employees
        const company = await db.company.findUnique({
            where: {
                ownerId: payload.id as string,
            },
        })
        if (!company) {
            return Response.json({
                status: 400,
                message: "you are not the owner of the company.",
                data: null,
            })
        }

        const employees = await db.employee.findMany({
            where: {
                companyId: company.id,
            },
        })

        if (employees.length >= 10 && payload.role === "guest") {
            return Response.json({
                status: 400,
                message: "you have reached the maximum number of employees.",
                data: null,
            })
        }

        const data = await req.json()

        const parsedData = EmployeeSchema.safeParse(data)
        if (!parsedData.success) {
            return Response.json({
                status: 400,
                message: parsedData.error.issues,
            })
        }

        const employee = await db.employee.create({
            data: {
                ...data,
                companyId: company.id,
            },
        })

        if (!employee) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null,
            })
        }

        return Response.json({
            status: 200,
            message: "the data is here.",
            data: employee,
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 400,
            message: "please try agian latter.",
            data: null,
        })
    }
}

export async function DELETE(req: NextRequest): Promise<Response> {
    try {
        const { arrayId } = await req.json()

        const token = req.cookies.get("token")?.value
        if (!token) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "No token found",
                    data: null,
                }),
                { status: 400 },
            )
        }

        const { payload } = (await verifyToken(token)) as { payload: payload }
        if (!payload) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "No token found",
                    data: null,
                }),
                { status: 400 },
            )
        }

        // check if the user is the owner of the company and if the company exists
        const company = await db.company.findUnique({
            where: {
                ownerId: payload.id as string,
            },
        })
        if (!company) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "you are not the owner of the company.",
                    data: null,
                }),
                { status: 400 },
            )
        }

        // lets delete the employees

        const employees = await db.employee.deleteMany({
            where: {
                id: {
                    in: arrayId,
                },
            },
        })

        if (!employees) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "please try again later.",
                    data: null,
                }),
                { status: 400 },
            )
        }

        return new Response(
            JSON.stringify({
                status: 200,
                message: "The data is here.",
                data: employees,
            }),
            { status: 200 },
        )
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({
                status: 500,
                message: "An error occurred",
                data: null,
            }),
            { status: 500 },
        )
    }
}
