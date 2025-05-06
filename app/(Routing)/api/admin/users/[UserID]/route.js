import ConnectDB from "@/lib/MongoDB";
import UserSchema from "@/Models/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    const { UserID } = await params;
    if (!UserID) {
      return NextResponse.json({ message: "UserID is required" }, { status: 400 });
    }

    const UserDetails = await UserSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(UserID) } },
      {
        $lookup: {
          from: "Orders",
          localField: "_id",
          foreignField: "UserID",
          as: "Orders",
        },
      },
      { $unwind: { path: "$Orders", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "OrderItems",
          localField: "Orders.OrderItemsID",
          foreignField: "_id",
          as: "OrderItems",
        },
      },
      {
        $lookup: {
          from: "Deliverys",
          localField: "Orders.Shipping.Address",
          foreignField: "_id",
          as: "Deliverys",
        },
      },
      {
        $group: {
          _id: "$_id",
          UID: { $first: "$UID" },
          Name: { $first: "$Name" },
          Email: { $first: "$Email" },
          Mobile: { $first: "$Mobile" },
          Country: { $first: "$Country" },
          City: { $first: "$City" },
          Gender: { $first: "$Gender" },
          DOB: { $first: "$DOB" },
          Role: { $first: "$Role" },
          LoginCount: { $first: "$LoginCount" },
          ProfilePic: { $first: "$ProfilePic" },
          CreatedAt: { $first: "$CreatedAt" },
          Orders: {
            $push: {
              _id: "$Orders._id",
              OrderID: "$Orders.OrderID",
              GrandTotal: "$Orders.GrandTotal",
              BaseTotal: "$Orders.BaseTotal",
              Discount: "$Orders.Discount",
              CouponCode: "$Orders.CouponCode",
              Shipping: "$Orders.Shipping",
              Payment: "$Orders.Payment",
              Notes: "$Orders.Notes",
              CreatedAt: "$Orders.CreatedAt",
              Items: "$OrderItems",
              Delivery: { $arrayElemAt: ["$Deliverys", 0] },
            },
          },
        },
      },
    ]);

    return NextResponse.json(UserDetails[0] || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
