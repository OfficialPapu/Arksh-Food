import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import CategoriesSchema from "@/Models/CategoryModel";
import { OrderItemsSchema, OrderSchema } from "@/Models/OrderModel";
import EmailTemplate from "@/Views/Emails/EmailTemplate";
import SendEmail from "@/lib/EmailService";
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

export async function PUT(request, { params }) {
  try {
    const { OrderID } = await params;
    let { updateMode, selectedItems, NewStatus } = await request.json();
    NewStatus = NewStatus.charAt(0).toUpperCase() + NewStatus.slice(1);
    const OrderData = await OrderSchema.findById(OrderID)
      .populate({
        path: "OrderItemsID",
        populate: { path: "ProductID", select: "Name Price" },
      })
      .populate("UserID", "Name Email")
      .populate("Shipping.Address", "Name Phone Address City PostalCode");
    const OrderItemID = OrderData.OrderItemsID.map((item) => item._id);
    await OrderSchema.updateOne(
      { _id: OrderID },
      { "Shipping.Status": NewStatus }
    );
    if (updateMode == "all") {
      await OrderItemsSchema.updateMany(
        { _id: { $in: OrderItemID } },
        { Status: NewStatus }
      );
    } else {
      const unselectedItems = OrderItemID.filter(
        (id) => !selectedItems.includes(id.toString())
      );
      if (unselectedItems.length > 0) {
        await OrderItemsSchema.updateMany(
          { _id: { $in: unselectedItems } },
          { Status: "Cancelled" }
        );
      }
      if (selectedItems.length > 0) {
        await OrderItemsSchema.updateMany(
          { _id: { $in: selectedItems } },
          { Status: NewStatus }
        );
      }
    }
    const StatusActions = {
      Shipped: OrderStatusShipped,
      Delivered: OrderStatusDelivered,
      Cancelled: OrderStatusCanceled,
    };
    StatusActions[NewStatus]?.(OrderData);
   return NextResponse.json(
      { message: "Order updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const OrderStatusDelivered = async (OrderData) => {
  try {
    const Email = {
      Title: "Order Delivered!",
      Subtitle: "Your order has been delivered successfully.",
      Description:
        "We are pleased to inform you that your order has been successfully delivered.",
      isAdminNotification: false,
    };
    OrderData.Email = Email;
    const to = OrderData.UserID.Email;
    const subject = "Regarding your Arksh Food Order!";
    const html = EmailTemplate(OrderData);
    const info = await SendEmail(to, subject, html);
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
};

const OrderStatusShipped = async (OrderData) => {
  try {
    const Email = {
      Title: "Order Shipped!",
      Subtitle: "Your package is on the way!",
      Description:
        "We are excited to inform you that your order(s) have been shipped. Below are the tracking information:",
      isAdminNotification: false,
    };
    OrderData.Email = Email;
    const to = OrderData.UserID.Email;
    const subject = "Regarding your Arksh Food Order!";
    const html = EmailTemplate(OrderData);
    const info = await SendEmail(to, subject, html);
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
};

const OrderStatusCanceled = async (OrderData) => {
  try {
    const Email = {
      Title: "Order Cancelled!",
      Subtitle: "Your order has been cancelled.",
      Description:
        "We regret to inform you that your order has been cancelled. Please contact our customer support for further assistance.",
      isAdminNotification: false,
    };
    OrderData.Email = Email;
    const to = OrderData.UserID.Email;
    const subject = "Regarding your Arksh Food Order!";
    const html = EmailTemplate(OrderData);
    const info = await SendEmail(to, subject, html);
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
};
