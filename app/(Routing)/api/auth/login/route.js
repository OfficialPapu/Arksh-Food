import ConnectDB from "@/lib/MongoDB";
import UserSchema from "@/Models/UserModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptPassword } from "@/lib/BaseConfig";
const jwt = require('jsonwebtoken');

export const POST = async (req) => {
    try {
        let { Email, Password, isAdmin } = await req.json();
        if (!Email || !Password) {
            return NextResponse.json({ message: "All fields are mandatory" }, { status: 400 });
        }
        let User = await UserSchema.findOne({ Email: Email });
        if (!User) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        User.Password = decryptPassword(User.Password);
        if (Password !== User.Password) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        if (isAdmin && !User.Role.includes("Admin")) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }
        await UserSchema.findOneAndUpdate({ Email: Email }, { $inc: { LoginCount: 1 } }, { new: true });
        const token = GenerateJWTToken(User, req);
        const cookieStore = await cookies();
        cookieStore.set("AF_LOGIN_INFO", token, { httpOnly: true, secure: true, sameSite: "Strict", path: "/", maxAge: 2592000000, domain: process.env.NODE_ENV === 'production' ? '.arkshgroup.com' : undefined });
        return NextResponse.json({ UserID: User._id, Name: User.Name, Email: User.Email, Mobile: User.Mobile, Role: User.Role })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

const GenerateJWTToken = (User, req) => {
    const UserData = { UserID: User._id, Email: User.Email, UserAgent: req.headers.get("user-agent"), IP: (req.headers.get('x-forwarded-for') || req.ip || "127.0.0.1"), Role: User.Role }
    return jwt.sign(UserData, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
}