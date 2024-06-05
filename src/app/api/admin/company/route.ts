import { NextResponse, NextRequest } from "next/server";
import db from "@/(auth)/secrets";
import { verifyToken } from "@/(auth)/lib/auth"


import { z, date } from 'zod';





export const dynamic = 'force-dynamic'

export const CompanySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    companyEmail: z.string().email("Invalid email address"),
    companyPhone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
    companyAddress: z.string().min(2, "Company address must be at least 2 characters"),
    companyCity: z.string().min(2, "Company city must be at least 2 characters"),
});

export type CompanyType = z.infer<typeof CompanySchema>;

export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }

        const {payload} = await verifyToken(token);
        const data = await req.json()

        // lets see if the userId is already in the database
        const user = await db.user.findUnique({
            where: {
                id: payload.id as string
            },
            include: {
                settings: true
            }
        });

        if (!user) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null
            });
        };
        const settingsId = user.settings.id;
        const companyEmail = data.companyEmail || user.email;
        const company = await db.company.create({
          data:{
            name: data.name,
            companyEmail: companyEmail,
            compnayPhone: data.companyPhone,
            companyAddress: data.companyAddress,
            companyCity: data.companyCity,
            ownerId: user.id ,
            settingsId
          }
        });

        if (!company) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null
            });
        }

        const settings = await db.settings.update({
            where: {
                userId: user.id
            },
            data: {
                
                completed: true
            }
        });

        if (!settings) {
            return Response.json({
                status: 400,
                message: "please try agian latter.",
                data: null
            });
        }

        return Response.json({
            status: 200,
            message: "Company created successfully.",
            data: company
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


