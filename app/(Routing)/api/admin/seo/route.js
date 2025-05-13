import ConnectDB from "@/lib/MongoDB";
import SEOSchema from "@/Models/SEOModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { page, title, description, keywords } = await request.json();
    if (!page || !title || !description || !keywords) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await SEOSchema.findOneAndUpdate(
      { PageName: page },
      {
        Title: title,
        Description: description,
        Keywords: keywords,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    return NextResponse.json({ message: "SEO saved successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
