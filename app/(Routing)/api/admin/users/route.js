import ConnectDB from "@/lib/MongoDB";
import UserSchema from "@/Models/UserModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const Users = await UserSchema.aggregate([
      {
        $lookup: {
          from: "Orders",
          localField: "_id",
          foreignField: "UserID",
          as: "Orders",
        },
      },
      {
        $project: {
          Password: 0,
          Country: 0,
          City: 0,
          LoginCount: 0,
          Orders: {
            OrderID: 0,
            Shipping: 0,
            BaseTotal: 0,
            Discount: 0,
            PickupCost: 0,
            Payment: 0,
            Notes: 0,
            CreatedAt: 0,
            UpdatedAt: 0,
            __v: 0,
          },
        },
      },
    ]);
    return NextResponse.json(Users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
