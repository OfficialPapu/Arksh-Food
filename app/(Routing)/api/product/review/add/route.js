import ConnectDB from "@/lib/MongoDB";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { UserID, ProductID, Rating, Comment } = await req.json();
    if (!UserID || !ProductID || !Rating || !Comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const Product = await ProductSchema.findById(ProductID);
    if (!Product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const AlreadyReviewed = Array.isArray(Product.Review)
      ? Product.Review.find((rev) => rev.User.toString() === UserID)
      : null;
    if (AlreadyReviewed) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 401 }
      );
    }
    Product.Review.push({
      User: UserID,
      Rating,
      Comment,
    });
    await Product.save();
    return NextResponse.json({
      message: "Review added successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
