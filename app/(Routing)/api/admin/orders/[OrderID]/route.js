import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import CategoriesSchema from "@/Models/CategoryModel";
import { OrderSchema } from "@/Models/OrderModel";
export async function GET(request, { params }) {
  try {
    const { OrderID } = await params;
    if (!OrderID) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const Order = await OrderSchema.findOne({ _id: OrderID })
      .populate("UserID")
      .populate("OrderItemsID")
      .populate({
        path: "OrderItemsID",
        populate: {
          path: "ProductID",
          model: "Products",
        },
      })
      .populate("Shipping.Address")
      .exec();

    if (!Order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(Order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
