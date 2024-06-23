import { NextResponse, NextRequest } from "next/server"
import db from "@/(auth)/secrets"
import { verifyToken } from "@/(auth)/lib/auth"

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

        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
            },
        })
        if (!users) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null,
            })
        }

        return Response.json({
            status: 200,
            message: "the data is here.",
            data: users,
        })
    } catch (error) {
        console.log(error)
    }
}
