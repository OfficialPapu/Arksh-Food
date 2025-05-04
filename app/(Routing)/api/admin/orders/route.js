import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import { OrderSchema } from "@/Models/OrderModel";
export async function GET(req) {
  try {
    const Orders = await OrderSchema.find(
      {},
      "OrderID Shipping.Status GrandTotal OrderItemsID CreatedAt"
    )
      .populate("UserID")
      .populate("Shipping.Address")
      .sort({ CreatedAt: -1 });

    return NextResponse.json(Orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
