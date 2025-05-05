import SendEmail from "@/lib/EmailService";
import ConnectDB from "@/lib/MongoDB";
import { CartItemSchema } from "@/Models/CartModel";
import { OrderItemsSchema, OrderSchema } from "@/Models/OrderModel";
import ProductSchema from "@/Models/ProductModel";
import UserSchema from "@/Models/UserModel";
import EmailTemplate from "@/Views/Emails/EmailTemplate";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const { PaymentMethod, PickupLocation, AddressID, PickupCost, Total, Subtotal, Discount, UserID, CartItems, PaymentProof } = await request.json();
        if (!PaymentMethod || !PickupLocation || !AddressID || !CartItems || CartItems.length === 0 || !Total || !UserID) {
            return NextResponse.json({ message: "Missing required fields or empty cart" }, { status: 400 })
        }

        const User = await UserSchema.findById(UserID);
        if (!User) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        let OrderItemsID = [];
        for (const [key, Item] of Object.entries(CartItems)) {
            const Product = await ProductSchema.findById(Item.ProductID);
            if (!Product) {
                return NextResponse.json({ message: `Product not found: ${Item.ProductID}` }, { status: 404 })
            }

            if (Product.Stock < Item.Quantity) {
                return NextResponse.json({ message: `Insufficient stock for product: ${Product.Name}` }, { status: 400 });
            }
            Product.Stock -= Item.Quantity;
            await Product.save();

            let UnitPrice = Item.PriceAfterDiscount ? Item.PriceAfterDiscount : Item.Price;
            let OrderItem = new OrderItemsSchema({
                ProductID: Product._id,
                BasePrice: Product.Price,
                UnitPrice: UnitPrice,
                Quantity: Item.Quantity,
                Total: UnitPrice * Item.Quantity,
            });
            await CartItemSchema.updateOne(
                { _id: Item.CartItemID },
                { $set: { Status: 'Converted' } }
            );
            await OrderItem.save();
            OrderItemsID.push(OrderItem._id);
        }
        let LastOrderID = (await OrderSchema.findOne().sort({ OrderID: -1 }).select('OrderID -_id').limit(1))?.OrderID || "ORD-0000-000";
        let OrderID = `ORD-${new Date().getFullYear()}-${String(parseInt(LastOrderID.split('-')[2]) + 1).padStart(3, '0')}`;
        const NewOrder = new OrderSchema({
            OrderID,
            UserID,
            OrderItemsID,
            BaseTotal: Subtotal,
            GrandTotal: Total,
            Discount,
            Shipping: {
                ShipmentID: generateShipmentID(),
                Address: AddressID,
                Method: PickupLocation,
                Status: "Pending",
                Cost: PickupCost || 0,
            },
            Payment: {
                Method: PaymentMethod,
                Screenshot: PaymentProof,
            },
        });

        await NewOrder.save();
        const OrderData = await OrderSchema.findById(NewOrder._id).populate({ path: 'OrderItemsID', populate: { path: 'ProductID', select: 'Name Price' } }).populate('UserID', 'Name Email').populate('Shipping.Address', 'Name Phone Address City PostalCode');
        await UserNotify(OrderData);
        await AdminNotify(OrderData);
        return NextResponse.json({ OrderID: OrderID }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

function generateShipmentID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const timePart = String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
    return `AF${year}${month}${timePart}`;
}


const AdminNotify = async (OrderData) => {
    try {
        const Email = {
            Title: "New Order Notification",
            Subtitle: "A new order has been placed.",
            Description: "A new order has been placed. Please review the order details and take appropriate action.",
            isAdminNotification: true,
        }
        OrderData.Email = Email;
        const to = process.env.EMAIL;
        const subject = 'New Order Notification';
        const html = EmailTemplate(OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        NextResponse.json({ status: 500 });
    }
}

const UserNotify = async (OrderData) => {
    try {
        
        const Email = {
            Title: "Order placed successfully!",
            Subtitle: "Your order has been placed successfully.",
            Description: "Your order has been confirmed and is now being processed. We'll send you another email when your order ships.",
            isAdminNotification: false,
        }
        OrderData.Email = Email;
        const to = OrderData.UserID.Email;
        const subject = 'Order placed successfully - Arksh Food';
        const html = EmailTemplate(OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        NextResponse.json({ status: 500 });
    }
}