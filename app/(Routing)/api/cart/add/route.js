import ConnectDB from "@/lib/MongoDB";

import { CalculateTotalPrice } from "@/lib/BaseConfig";
import { CartItemSchema, CartSchema } from "@/Models/CartModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        let { UserID, Product: { _id, Price, Discount, Quantity } } = await request.json();
        Discount = Discount.Percentage;
        let Cart = await CartSchema.findOne({ UserID });
        if (!Cart) {
            Cart = new CartSchema({ UserID, CartItems: [], Total: 0, Discount: 0 });
        }

        if (Discount) {
            Discount =((Price / 100) * Discount)
            Price =((Price - Discount))
        }

        const CartItem = new CartItemSchema({
            ProductID: _id,
            Price: Math.round(Price),
            Quantity,
        });
        await CartItem.save();

        Cart.CartItems.push(CartItem._id);
        await Cart.save();

        const { ProductTotal, CartTotal } = await CalculateTotalPrice(UserID);
        Discount = ProductTotal - CartTotal;
        await CartSchema.updateOne(
            { UserID },
            { $set: { Total: CartTotal, Discount: Discount } }
        );
        return NextResponse.json({ message: "Cart updated successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}