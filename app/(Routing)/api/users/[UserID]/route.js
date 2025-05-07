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
      { $unwind: { path: "$OrderItems", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "Products",
          localField: "OrderItems.ProductID",
          foreignField: "_id",
          as: "ProductDetails",
        },
      },
      { $unwind: { path: "$ProductDetails", preserveNullAndEmptyArrays: true } },

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
          _id: {
            userId: "$_id",
            orderId: "$Orders._id",
          },
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
          OrderID: { $first: "$Orders.OrderID" },
          GrandTotal: { $first: "$Orders.GrandTotal" },
          BaseTotal: { $first: "$Orders.BaseTotal" },
          Discount: { $first: "$Orders.Discount" },
          CouponCode: { $first: "$Orders.CouponCode" },
          Shipping: { $first: "$Orders.Shipping" },
          Payment: { $first: "$Orders.Payment" },
          Notes: { $first: "$Orders.Notes" },
          OrderCreatedAt: { $first: "$Orders.CreatedAt" },
          Delivery: { $first: { $arrayElemAt: ["$Deliverys", 0] } },
          Items: {
            $push: {
              _id: "$OrderItems._id",
              ProductID: "$OrderItems.ProductID",
              BasePrice: "$OrderItems.BasePrice",
              UnitPrice: "$OrderItems.UnitPrice",
              Quantity: "$OrderItems.Quantity",
              Total: "$OrderItems.Total",
              ProductName: "$ProductDetails.Name",
              ProductPrice: "$ProductDetails.Price",
              ProductImage: { $arrayElemAt: ["$ProductDetails.Media.Images", 0] },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.userId",
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
              _id: "$_id.orderId",
              OrderID: "$OrderID",
              GrandTotal: "$GrandTotal",
              BaseTotal: "$BaseTotal",
              Discount: "$Discount",
              CouponCode: "$CouponCode",
              Shipping: "$Shipping",
              Payment: "$Payment",
              Notes: "$Notes",
              CreatedAt: "$OrderCreatedAt",
              Items: "$Items",
              Delivery: "$Delivery",
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
