import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ForgotPassword from "@/Views/Emails/ForgotPassword";
import SendEmail from "@/lib/EmailService";
import UserSchema from "@/Models/UserModel";
export const POST = async (req) => {
    try {
        const { Email } = await req.json();
        if (!Email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
        const User = await UserSchema.findOne({ Email });
        if (!User) {
            return NextResponse.json({ message: "Email address not found!" }, { status: 404 });
        }
        const OrderData = {
            UserID: User._id,
            Name: User.Name,
            UserEmail: User.Email,
            Password: User.Password,
        }
        await PasswordEmail(OrderData);
        return NextResponse.json({ message: "Password sent to your email" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

const PasswordEmail = async (OrderData) => {
    try {
        const Email = {
            isAdminNotification: true,
        }
        OrderData.Email = Email;
        const to = OrderData.UserEmail;
        const subject = 'Request Password Reset - Arksh Food';
        const html = ForgotPassword(OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        NextResponse.json({ status: 500 });
    }
}