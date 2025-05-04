import ConnectDB from "@/lib/MongoDB";
import { CartItemSchema, CartSchema } from "@/Models/CartModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { UserID } = await params;
    if (!UserID) {
      return NextResponse.json(
        { message: "UserID is required" },
        { status: 400 }
      );
    }
    let CartItems = await CartSchema.findOne({ UserID }).populate({
      path: "CartItems",
      match: { Status: "Active" },
      populate: {
        path: "ProductID",
        model: "Products",
      },
    });
    if (!CartItems) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const outOfStockItemIDs = CartItems.CartItems.filter(
      (item) => !item.ProductID || item.ProductID.Quantity <= 0
    ).map((item) => item._id);

    if (outOfStockItemIDs.length > 0) {
      await CartItemSchema.updateMany(
        { _id: { $in: outOfStockItemIDs } },
        { $set: { Status: "Abandoned" } }
      );
    }

    CartItems = CartItems.CartItems.filter(
      (item) => item.ProductID && item.ProductID.Quantity > 0
    );
    

    return NextResponse.json(CartItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
