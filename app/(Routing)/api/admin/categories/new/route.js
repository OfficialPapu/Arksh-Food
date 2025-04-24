import ConnectDB from "@/lib/MongoDB";
import CategoriesSchema from "@/Models/CategoryModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // const { CategoryName, CategoryImage } = await req.json();
    console.log(await req.json());
    
    // if (!CategoryName || !CategoryImage) {
    //   return NextResponse.json(
    //     { message: "All fields are mandatory" },
    //     { status: 400 }
    //   );
    // }
    // await CategoriesSchema.create({ CategoryName, CategoryImage });
    // return NextResponse.json(
    //   { message: "Category Created Successfully" },
    //   { status: 201 }
    // );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
