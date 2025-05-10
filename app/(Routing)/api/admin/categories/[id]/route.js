import fs from 'fs/promises';
import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import CategoriesSchema from "@/Models/CategoryModel";
import { createSlug, GenerateFileName } from "@/lib/BaseConfig";
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const deletedCategory = await CategoriesSchema.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const existingCategory = await CategoriesSchema.findById(id)
    if (!existingCategory) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    const formData = await req.formData()
    const category = formData.get("Category")
    const description = formData.get("Description")
    const imageFile = formData.get("image")
    const seoTitle = formData.get("metaTitle")
    const seoDescription = formData.get("metaDescription")
    const seoKeywords = formData.get("keywords")

    if (!category) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 })
    }
    const slug = createSlug(category);
    const duplicateCategory = await CategoriesSchema.findOne({
      Slug: slug,
      _id: { $ne: id },
    })

    if (duplicateCategory) {
      return NextResponse.json({ message: "A category with this name already exists" }, { status: 409 })
    }

    const updateData = {
      Category: category,
      Slug: slug,
      Description: description || existingCategory.Description,
      SEO: {
        Title: seoTitle || category,
        Description: seoDescription || existingCategory.SEO?.Description || "",
        Keywords: seoKeywords || existingCategory.SEO?.Keywords || "",
      },
    }
    if (imageFile) {
      let { filePath, filename, year, month } = await GenerateFileName(imageFile);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      filePath = `${year}/${month}/${filename}`;
      updateData.Image = filePath
    }
    const updatedCategory = await CategoriesSchema.findByIdAndUpdate(id, updateData)
    return NextResponse.json(updatedCategory, { status: 200 })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ message: "Failed to update category" }, { status: 500 })
  }
}
