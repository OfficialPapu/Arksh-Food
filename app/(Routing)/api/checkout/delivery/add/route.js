import { CountryInfo } from "@/lib/BaseConfig";
import ConnectDB from "@/lib/MongoDB";
import DeliverySchema from "@/Models/DeliveryModel";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        let ip = request.headers.get('x-forwarded-for') || request.ip || "127.0.0.1";
        const { Country } = CountryInfo(ip);
        const { UserID, Name, Phone, City, Address, PostalCode, AddressName } = await request.json();
        const newAddress = new DeliverySchema({ UserID, AddressName, Name, Phone, City, Address, Country, PostalCode });
        const savedAddress = await newAddress.save();
        return NextResponse.json({ AddressID: savedAddress._id }, { status: 201 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}