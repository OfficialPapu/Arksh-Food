import ConnectDB from "@/lib/MongoDB";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {
  try {
    const { ID } = await params;
    if (!ID) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const Product = await ProductSchema.findById(ID);

    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }
    Product.Status = Product.Status === "Active" ? "Inactive" : "Active";
    await Product.save();
    return NextResponse.json(
      { message: "Status updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
