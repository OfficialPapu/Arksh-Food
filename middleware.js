import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import Hashids from 'hashids';

export async function middleware(request) {
    const hashids = new Hashids(process.env.NEXT_PUBLIC_HASH_SALT, 10);
    const path = request.nextUrl.pathname;
    const encodedPath = hashids.encodeHex(Buffer.from(path).toString('hex'));
    const loginPath = `/auth/login?r=${encodedPath}`;
    const publicRoutes = ['/auth/login'];
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }
    const Token = request.cookies.get('AF_LOGIN_INFO')?.value;
    try {
        if (!Token) {
            return NextResponse.redirect(new URL(loginPath, request.url));
        }
        const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jwtVerify(Token, SECRET_KEY);
        const userIP = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0];
        const userAgent = request.headers.get('user-agent');
        if (payload.IP !== userIP || payload.UserAgent !== userAgent) {
            const response = NextResponse.redirect(new URL(loginPath, request.url));
            response.cookies.delete('AF_LOGIN_INFO');
            return response;
        }

        if (path.startsWith('/admin') && !payload.Role?.includes('Admin')) {
            return NextResponse.redirect(new URL(loginPath, request.url));
        }
        return NextResponse.next();

    } catch (error) {
        const response = NextResponse.redirect(new URL(loginPath, request.url));
        response.cookies.delete('AF_LOGIN_INFO');
        return response;
    }
}

export const config = {
    matcher: ['/admin/:path*', '/account/:path*',],
};