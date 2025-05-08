import ConnectDB from "@/lib/MongoDB";
import { CartItemSchema } from "@/Models/CartModel";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { CartItemID } = await params;
        const { ProductID, Quantity } = await request.json();
        const Product = await ProductSchema.findOne({ _id: ProductID });
        if (Product.Quantity < Quantity) {
            return NextResponse.json({ message: "Low in stock" }, { status: 450 });
        }
        await CartItemSchema.updateOne(
            { _id: CartItemID },
            { $set: { Quantity: parseInt(Quantity) } }
        );
        return NextResponse.json({ message: "Quantity updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}