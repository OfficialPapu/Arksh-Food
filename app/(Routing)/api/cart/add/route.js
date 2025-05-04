import ConnectDB from "@/lib/MongoDB";

import { CalculateTotalPrice } from "@/lib/BaseConfig";
import { CartItemSchema, CartSchema } from "@/Models/CartModel";
import { NextResponse } from "next/server";
import ProductSchema from "@/Models/ProductModel";

export async function POST(request) {
  try {
    let {
      UserID,
      Product: { _id, Price, Discount, Quantity, BuyNow },
    } = await request.json();
    Discount = Discount.Percentage;
    const Product = await ProductSchema.findById(_id);
    console.log(Product.Quantity);
    console.log(Quantity);

    if (Quantity <= 0)
      return NextResponse.json(
        { message: "Quantity must be greater than 0" },
        { status: 450 }
      );

    if (Product.Quantity <= 0 || Product.Quantity < Quantity) {
      return NextResponse.json(
        { message: "Product quantity is not available" },
        { status: 450 }
      );
    }

    let Cart = await CartSchema.findOne({ UserID });
    if (!Cart) {
      Cart = new CartSchema({ UserID, CartItems: [], Total: 0, Discount: 0 });
    }

    if (BuyNow) {
      if (Cart && Cart.CartItems.length > 0) {
        await CartItemSchema.updateMany(
          { _id: { $in: Cart.CartItems } },
          { $set: { Status: "Abandoned" } }
        );
      }
    }

    if (Discount) {
      Discount = (Price / 100) * Discount;
      Price = Price - Discount;
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
    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
