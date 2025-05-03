import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { GenerateFileName } from '@/lib/BaseConfig';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json(
                { error: 'No image file provided' },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Only images are allowed (JPEG, PNG, GIF, WEBP)' },
                { status: 415 }
            );
        }

        let { filePath, filename, year, month } = await GenerateFileName(file);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        filePath = `${year}/${month}/${filename}`;
        return NextResponse.json({ PaymentScreenshot: filePath }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

