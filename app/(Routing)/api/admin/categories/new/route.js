import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { createSlug, GenerateFileName } from '@/lib/BaseConfig';
import CategoriesSchema from '@/Models/CategoryModel';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const name = formData.get('name');
    const slug = createSlug(name);
    const description = formData.get('description');

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
    const newCategory = new CategoriesSchema({ Category: name, Slug: slug, Description: description, Image: filePath });
    await newCategory.save();
    return NextResponse.json("New Category added successfully!", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

