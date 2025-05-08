import ConnectDB from "@/lib/MongoDB";
import CategoriesSchema from "@/Models/CategoryModel";
import ProductSchema from "@/Models/ProductModel";
import UserSchema from "@/Models/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    try {
        const { Slug } = await params;
        if (!Slug) {
            return NextResponse.json({ message: "Slug is required" }, { status: 400 });
        }

        const Products = await CategoriesSchema.aggregate([
            { $match: { Slug: Slug } },
            {
                $lookup: {
                    from: "Products",
                    localField: "_id",
                    foreignField: "Category",
                    as: "Products",
                }
            }
        ]);

        return NextResponse.json(Products[0] || {}, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
