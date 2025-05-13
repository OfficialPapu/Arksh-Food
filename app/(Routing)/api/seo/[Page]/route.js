import ConnectDB from "@/lib/MongoDB";
import SEOSchema from "@/Models/SEOModel";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    const { Page } = await params;
    const SEOData = await SEOSchema.find({ PageName: Page });
    return NextResponse.json( SEOData[0] || [] , { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
