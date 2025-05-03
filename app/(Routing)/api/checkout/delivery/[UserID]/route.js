import ConnectDB from "@/lib/MongoDB";
import DeliverySchema from "@/Models/DeliveryModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { UserID } = await params;
        if (!UserID) {
            return NextResponse.json({ message: "UserID is required" }, { status: 400 });
        }
        const Addresses = await DeliverySchema.find({ UserID }, { _id: 1, AddressName: 1, Name: 1, Address: 1, City: 1, PostalCode: 1, Phone: 1 });
        const AddressesToSend = Addresses.map(address => ({
            ID: address._id,
            AddressName: address.AddressName,
            Name: address.Name,
            Address: `${address.Address}, ${address.City}${address.PostalCode ? ", " + address.PostalCode : ""}`,
            Phone: address.Phone,
        }));
        return NextResponse.json(AddressesToSend, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}