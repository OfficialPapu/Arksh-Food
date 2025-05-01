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
    const files = formData.getAll('WysiwygImages'); 

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No image files provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const uploadedPaths = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 415 });
      }

      let { filePath, filename, year, month } = await GenerateFileName(file);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      const storedPath = `${year}/${month}/${filename}`;
      uploadedPaths.push(process.env.NEXT_PUBLIC_IMAGE_URL + storedPath);
    }

    return NextResponse.json({ success: true, urls: uploadedPaths }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
