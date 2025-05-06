import { NextResponse } from "next/server";
import ConnectDB from '@/lib/MongoDB';
import UserSchema from "@/Models/UserModel";
export async function GET(request) {
try {
    const Users = await UserSchema.find().select("-_id -Password -Role -ProfilePic -UpdatedAt -__v");
    if (Users.length === 0) {
        return NextResponse.json({ message: "Users not found" }, { status: 404 });
    }
    return NextResponse.json(Users, { status: 200 });
} catch (error) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
}
}