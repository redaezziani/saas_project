import { NextResponse, NextRequest } from "next/server"
import db from "@/(auth)/secrets"
import { verifyToken } from "@/(auth)/lib/auth"

export const dynamic = "force-dynamic"

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
): Promise<Response> {
    try {
        // 1. Authentication (if needed)
        const token = request.cookies.get("token")?.value
        if (!token) {
            return NextResponse.json(
                { status: 401, message: "Unauthorized", data: null },
                { status: 401 },
            )
        }

        const { payload } = await verifyToken(token)
        if (!payload) {
            return NextResponse.json(
                { status: 401, message: "Unauthorized", data: null },
                { status: 401 },
            )
        }
        // 2. Input Validation with Direct Parameter Access
        const id = params.id

        if (!id) {
            return NextResponse.json(
                { status: 400, message: "Missing employee ID", data: null },
                { status: 400 },
            )
        }

        // 3. Delete Employee
        const deletedEmployee = await db.employee.delete({
            where: {
                id: id[0],
            },
        })

        // 4. Handle Deletion Failure (Optional)
        if (!deletedEmployee) {
            return NextResponse.json(
                { status: 404, message: "Employee not found", data: null },
                { status: 404 },
            )
        }

        // 5. Success Response with NextResponse.json
        return NextResponse.json(
            {
                status: 200,
                message: "Employee deleted successfully",
                data: deletedEmployee,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("Error deleting employee:", error)
        return NextResponse.json(
            { status: 500, message: "Internal server error", data: null },
            { status: 500 },
        )
    }
}
