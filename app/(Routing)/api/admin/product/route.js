import { NextResponse } from "next/server";
import ConnectDB from '@/lib/MongoDB';
import ProductSchema from "@/Models/ProductModel";

export async function GET(req) {
    try {
        const products = await ProductSchema.find().populate('Category');
        if (products.length === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
    }
}