import ConnectDB from "@/lib/MongoDB";
import UserSchema from "@/Models/UserModel";
import { NextResponse } from "next/server";
import { CountryInfo, encryptPassword } from "@/lib/BaseConfig";

export const POST = async (req) => {
    try {
        let ip = req.headers.get('x-forwarded-for') || req.ip || "127.0.0.1";
        const { Country, City } = await CountryInfo(ip);
        let { Name, Email, Mobile, Password } = await req.json();
        if (!Name || !Email || !Mobile || !Password) {
            return NextResponse.json({ message: "All fields are mandatory" }, { status: 400 });
        }
        const lastUser = await UserSchema.findOne({}, {}, { sort: { 'UID': -1 } });
        let UID;
        if (lastUser && lastUser.UID) {
            const lastUIDNumber = parseInt(lastUser.UID.slice(3), 10);
            UID = `UID${(lastUIDNumber + 1).toString().padStart(3, '0')}`;
        } else {
            UID = 'UID001';
        }
        const IsUserExist = await UserSchema.findOne({ $or: [{ Email }, { Mobile }] });
        if (IsUserExist) {
            return NextResponse.json({ message: "User alredy exist" }, { status: 401 });
        }
        Password = encryptPassword(Password);
        const NewUser = new UserSchema({ UID, Name, Email, Mobile, Password, Country, City });
        await NewUser.save();
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
