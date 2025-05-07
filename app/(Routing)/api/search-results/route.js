import ConnectDB from "@/lib/MongoDB";
import ProductSchema from "@/Models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        let searchQuery = searchParams.get('query') || "";
        let products;
        if (searchQuery.trim() === "") {
            products = await ProductSchema.find({ Status: "Active" })
                .sort({ CreatedAt: -1 })
                .limit(20)
                .populate("Category")
                .populate("Review.User");
        } else {
            products = await ProductSchema.find({
                $and: [
                    { $text: { $search: searchQuery } },
                    { Status: "Active" }
                ]
            })
        }
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
