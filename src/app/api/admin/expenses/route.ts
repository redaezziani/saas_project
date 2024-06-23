import { NextResponse, NextRequest } from "next/server"
import db from "@/(auth)/secrets"
import { verifyToken } from "@/(auth)/lib/auth"

type Payload = {
    id: string
    email: string
    username: string
    profile: string
    role: string
    iat: number
}

export const dynamic = "force-dynamic"
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return Response.json({ status: "error", message: "No token found" })
        }

        const { payload } = (await verifyToken(token)) as { payload: Payload }

        if (!payload) {
            return Response.json({ status: "error", message: "No token found" })
        }

        // First get the user  
        const user = await db.user.findUnique({
            where: {
                id: payload.id,
            },
            select: {
                company: true,
            },
        })

        // Then get the company
        const company = await db.company.findUnique({
            where: {
                id: user?.company?.id,
            },
            select: {
                name: true,
                companyEmail: true,
                compnayPhone: true,
                companyAddress: true,
                companyCity: true,
                expenses: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                        createdAt: true,
                    }
                },
                employees: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        jobTitle: true,
                        hireDate: true,
                    }
                },
                notes: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                    }
                },
                
                
            },
        })

        if (!company) {
            return Response.json({
                status: 400,
                message: "Please try again later.",
                data: null,
            })
        }

        // Count the total expenses and employees
        const totalExpenses = company.expenses.length
        const totalEmployees = company.employees.length

        // Let's reduce the expenses to get the total amount
        const totalAmount = company.expenses.reduce((acc, curr) => acc + Number(curr.amount), 0)

        return Response.json({
            status: 200,
            message: "success",
            data: {
                company,
                totalExpenses,
                totalEmployees,
                totalAmount,
            },
        })
    } catch (error) {
        console.log(error)
    }
}
