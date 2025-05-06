import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import { OrderSchema } from "@/Models/OrderModel";
import ProductSchema from "@/Models/ProductModel";
import UserSchema from "@/Models/UserModel";

function getStartAndEndDate(filter) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate, endDate;
  switch (filter) {
    case "today":
      startDate = new Date(today);
      endDate = new Date();
      break;
    case "yesterday":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 1);
      endDate = new Date(today);
      break;
    case "7days":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
      endDate = new Date();
      break;
    case "15days":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 15);
      endDate = new Date();
      break;
    case "30days":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 30);
      endDate = new Date();
      break;
    case "60days":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 60);
      endDate = new Date();
      break;
    default:
      startDate = null;
      endDate = null;
  }
  return { startDate, endDate };
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "today";

    const { startDate, endDate } = getStartAndEndDate(filter);
    const dateFilter =
      startDate && endDate
        ? { CreatedAt: { $gte: startDate, $lte: endDate } }
        : {};
    const orders = await OrderSchema.find(dateFilter);
    const users = await UserSchema.find(dateFilter);
    const products = await ProductSchema.find(dateFilter);

    const TotalRevenue = orders.reduce(
      (sum, order) => sum + (order.GrandTotal || 0),
      0
    );
    const TotalUsers = users.length || 0;
    const TotalProducts = products.length || 0;
    const TotalOrders = orders[0]?.OrderItemsID.length || 0;
    return NextResponse.json(
      { TotalRevenue, TotalUsers, TotalProducts, TotalOrders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
