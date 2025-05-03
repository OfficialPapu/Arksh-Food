import ConnectDB from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import CategoriesSchema from "@/Models/CategoryModel";
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
