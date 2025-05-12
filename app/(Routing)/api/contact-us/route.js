import ConnectDB from "@/lib/MongoDB";
import ContactUsSchema from "@/Models/ContactUsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const ContactUs = await ContactUsSchema.find().sort({ CreatedAt: -1 });
        return NextResponse.json(
            ContactUs,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
