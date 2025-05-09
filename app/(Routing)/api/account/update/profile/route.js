import ConnectDB from "@/lib/MongoDB";
import { GenerateFileName } from "@/lib/BaseConfig";
import fs from 'fs/promises';
import UserSchema from "@/Models/UserModel";
import { NextResponse } from "next/server";
export const config = {
    api: {
        bodyParser: false,
    },
};
export async function PUT(request) {
    try {
        const formData = await request.formData();
        const UserID = formData.get('UserID');
        const CurrentPassword = formData.get('CurrentPassword');
        const Password = formData.get('Password');
        const isChagePassword = formData.get('isChagePassword');

        if (isChagePassword == "true") {
            const User = await UserSchema.findById(UserID);
            if (!User) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            const isPasswordValid = await User.Password === CurrentPassword;
            if (!isPasswordValid) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
            await UserSchema.findByIdAndUpdate(UserID, { Password });
        } else {
            const ProfilePic = formData.get('ProfilePic');
            if (ProfilePic) {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(ProfilePic.type)) {
                    return NextResponse.json(
                        { error: 'Only images are allowed (JPEG, PNG, GIF, WEBP)' },
                        { status: 415 }
                    );
                }

                let { filePath, filename, year, month } = await GenerateFileName(ProfilePic);
                const buffer = Buffer.from(await ProfilePic.arrayBuffer());
                await fs.writeFile(filePath, buffer);
                filePath = `${year}/${month}/${filename}`;
                await UserSchema.findByIdAndUpdate(UserID, { ProfilePic: filePath });
            }
            const Gender = formData.get('Gender');
            const DOB = formData.get('DOB');
            const Country = formData.get('Country');
            const City = formData.get('City');

            await UserSchema.findByIdAndUpdate(UserID, { Country, City, Gender, DOB });
        }
        return Response.json({ message: "success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}