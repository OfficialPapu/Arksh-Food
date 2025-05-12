import ConnectDB from "@/lib/MongoDB";
import ContactUsSchema from "@/Models/ContactUsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { Name, Email, Phone, Subject, Message } = await req.json();
        if (!Name || !Email || !Phone || !Subject || !Message) {
            return NextResponse.json(
                { error: "All Fields are Required" },
                { status: 400 }
            );
        }
        await ContactUsSchema.create({
            Name,
            Email,
            Phone,
            Subject,
            Message,
        });
        return NextResponse.json(
            { message: "Contact Us Created Successfully" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
