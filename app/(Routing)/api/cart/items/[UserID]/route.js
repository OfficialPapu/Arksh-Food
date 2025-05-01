import ConnectDB from "@/lib/MongoDB";
import { CartSchema } from "@/Models/CartModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { UserID } = await params;
        if (!UserID) {
            return NextResponse.json({ message: "UserID is required" }, { status: 400 });
        } 
        const CartItems = await CartSchema.findOne({ UserID }).populate({
            path: 'CartItems',
            match: { Status: 'Active' },
            populate: {
                path: 'ProductID',
                model: "Products",
            }
        })
        if (!CartItems) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }
        return NextResponse.json(CartItems['CartItems'], { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}