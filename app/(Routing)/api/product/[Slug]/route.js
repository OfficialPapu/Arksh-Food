import ConnectDB from "@/lib/MongoDB";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    const { Slug } = await params;
    if (!Slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const Product = await ProductSchema.find({ Slug }).populate({
      path: "Category",
      model: "Categories",
    })
    Product[0].Quantity = Product[0].Quantity ? 1 : 0;
    if (!Product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(Product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
