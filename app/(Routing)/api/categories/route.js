import ConnectDB from "@/lib/MongoDB";
import CategoriesSchema from "@/Models/CategoryModel";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const Categories = await CategoriesSchema.aggregate([
      {
        $lookup: {
          from: "Products",
          localField: "_id",
          foreignField: "Category",
          as: "Products"
        }
      },
      {
        $addFields: {
          ProductCount: { $size: "$Products" }
        }
      },
      {
        $project: {
          Products: 0
        }
      }
    ])
    
    if (Categories.length === 0) {
      return NextResponse.json({ error: "No categories found" }, { status: 404 });
    }
    return NextResponse.json(Categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
