import { verifyToken } from "@/(auth)/lib/auth"
import db from "@/(auth)/secrets"
import { NextResponse, NextRequest } from "next/server"

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
        const data = await verifyToken(token)
        const user = await db.user.findUnique({
            where: {
                id: data?.payload.id as string,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                image: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        return Response.json({
            status: "success",
            data: user,
            message: "user found",
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            status: "error",
            message: "An error occurred while processing your request.",
        })
    }
}
