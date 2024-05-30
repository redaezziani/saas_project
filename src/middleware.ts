'use server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from './lib/db';
const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
    const cookies = req.headers.get("cookie");
    
    
    return NextResponse.next();
};



export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

// export the edge handler
export default middleware
