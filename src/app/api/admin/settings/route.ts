import { NextResponse, NextRequest } from "next/server";
import db from "@/(auth)/secrets";
import { verifyToken } from "@/(auth)/lib/auth"

import { z } from 'zod';

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const { payload } = await verifyToken(token);

        const settings = await db.settings.findFirst({
            where: {
                userId: payload.id as string,
            }
        });

        if (!settings) {
            return Response.json({
                status: 400,
                message: "please try again later.",
                data: null
            });
        }

        return Response.json({
            status: 200,
            message: "success",
            data: settings
        });
                


    } catch (error) {
        console.log(error);
    }
}

