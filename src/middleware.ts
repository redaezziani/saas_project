'use server';
import { verifyToken } from './(auth)/lib/auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const middleware = async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value ?? '';
    const isVerified = await verifyToken(token);
    const publicRoute = ['/', 'auth/', 'auth/forgot-password', '/api/auth/sign-in', '/api/auth/sign-up',];
    if (publicRoute.includes(path)) {
        return NextResponse.next();
    }
    const privateRouteRegex = new RegExp('^/dashboard/*');
    if (privateRouteRegex.test(path) && !isVerified) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl).toString());
    }
    const authRouteRegex = new RegExp('^/auth/*');
    if (isVerified && authRouteRegex.test(path)) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl).toString());
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}