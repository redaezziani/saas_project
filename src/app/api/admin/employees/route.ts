import { NextResponse, NextRequest } from "next/server";
import db from "@/(auth)/secrets";
import { verifyToken } from "@/(auth)/lib/auth"


import { z } from 'zod';



export const EmployeeSchema = z.object({
    id: z.string().cuid(),
    userId: z.string().uuid(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phone: z.string().nullable(),
    daySalary: z.number().nullable(),
    monthSalary: z.number().nullable(),
    hireDate: z.date(),
    jobTitle: z.string(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date(),
});

export type Employee = z.infer<typeof EmployeeSchema>;


export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const employees = await db.employee.findMany();
        if (!employees) {
            return Response.json({
                status: 400,
                message: "please try again later.",
                data: null
            });
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
            status: employee.status,
        }));

        return Response.json({
            status: 200,
            message: "The data is here.",
            data: employeesWithEmail
        });
    } catch (error) {
        console.log(error);
    }
}


export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }

        const data = await req.json()

        // lets see if the userId is already in the database
        const user = await db.employee.findUnique({
            where: {
                id: data.userId
            }
        });

        if (!user) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null
            });
        };


        const employee = await db.employee.create({
            data: {
                ...data,
                hireDate: new Date(data.hireDate),
            }
        });

        if (!employee) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null
            });
        };

        return Response.json({
            status: 200,
            message: "the data is here.",
            data: employee
        });
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 400,
            message: "please try agian latter.",
            data: null
        });
    }
};


export async function DELETE(req: NextRequest): Promise<Response> {
    try {
        const  id  = await req.json()
        console.log(id)
        if (!id) {
            return new Response(JSON.stringify({
                status: 400, 
                message: "Please provide an id.",
                data: null
            }), { status: 400 });
        }
        
        const employee = await db.employee.delete({
            where: { id }
        })

        if (!employee) {
            return new Response(JSON.stringify({
                status: 400,
                message: "Employee not deleted, please try again later.", 
                data: null
            }), { status: 400 });
        }

        return new Response(JSON.stringify({
            status: 200,
            message: "Employee deleted successfully",
            data: employee 
        }), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            status: 500,
            message: "An error occurred",
            data: null
        }), { status: 500 });
    }
}




