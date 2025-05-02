import ConnectDB from "@/lib/MongoDB";
import { CartItemSchema } from "@/Models/CartModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { CartItemID } = await params;
        await CartItemSchema.updateOne(
            { _id: CartItemID },
            { $set: { Status: 'Abandoned' } }
        );
        return NextResponse.json({ message: "Cart item removed successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}