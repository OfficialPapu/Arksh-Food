import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET() {
    try { 
        const cookieStore = await cookies();
        cookieStore.delete("AF_LOGIN_INFO");
        return NextResponse.json({ message: "Logout successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}