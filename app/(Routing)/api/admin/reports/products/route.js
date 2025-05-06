import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import ProductSchema from "@/Models/ProductModel";
export async function GET(request) {
  try {
    let Products = await ProductSchema.find(
      {},
      {
        _id: 0,
        Name: 1,
        Slug: 1,
        Price: 1,
        Discount: 1,
        Quantity: 1,
        Status: 1,
        CreatedAt: 1
      }
    );
    if (Products.length === 0) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 }
      );
    }

    Products = Products.map((product, index) => {
        const obj = product.toObject();
        return {
          "S.N.": index + 1,
          Name: obj.Name,
          Slug: obj.Slug,
          Price: obj.Price,
          Discount: obj.Discount?.Percentage ?? 0,  
          Quantity: obj.Quantity,
          Status: obj.Status,
          CreatedAt: obj.CreatedAt
        };
      });

    return NextResponse.json(Products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
