import ConnectDB from "@/lib/MongoDB";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { ProductID } = await params;
      if (!ProductID) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const Product = await ProductSchema.find({ _id: ProductID })
      .populate({
        path: "Review.User",
        model: "Users",
        select: "Name",
      })
      .select("Review")
      .sort({ CreatedAt: -1 });
    if (!Product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const Review = Product[0].Review;
    return NextResponse.json({ Review }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Something went wrong" }
    );
  }
}
