import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import ConnectDB from '@/lib/MongoDB';
import ProductSchema from '@/Models/ProductModel';
import { createSlug, GenerateFileName } from '@/lib/BaseConfig';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const getMultipleFiles = (field) => formData.getAll(field).filter(Boolean);
        const images = getMultipleFiles('Images');
        const Name = formData.get('name');
        const Price = formData.get('price');
        const Excerpt = formData.get('excerpt');
        const Discount = formData.get('discountPercentage');
        const Category = formData.get('category');
        const Stock = formData.get('stock');
        const isNew = formData.get('isNew') === 'true';
        const isBestSeller = formData.get('isBestSeller') === 'true';
        const Description = formData.get('Description');
        const Ingredients = formData.get('Ingredients');
        const Slug = createSlug(Name);

        // const imagePaths = [];
        // for (const file of images) {
        //     let { filePath, filename, year, month } = await GenerateFileName(file);
        //     const buffer = Buffer.from(await file.arrayBuffer());
        //     await fs.writeFile(filePath, buffer);
        //     const storedPath = `${year}/${month}/${filename}`;
        //     imagePaths.push(storedPath);
        // }

        // console.log(Name, Price, Excerpt, Discount, Category, Stock, isNew, isBestSeller, Slug);



        // if (imagePaths.length === 0) {
        //     return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        // }

        // const newProduct = new ProductSchema({
        //     Name,
        //     Slug,
        //     Excerpt,
        //     Description,
        //     Ingredients,
        //     Category,
        //     isNewArrival: isNew,
        //     isBestSeller,
        //     Price,
        //     Discount,
        //     Stock,
        //     Media: {
        //         Images: imagePaths,
        //     }
        // });

        // await newProduct.save();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.log(err);

        return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
    }
}
