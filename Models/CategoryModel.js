import mongoose from "mongoose";
let CategoriesSchema = mongoose.Schema({
    Category: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

CategoriesSchema = mongoose.models.Categories || mongoose.model("Categories", CategoriesSchema, "Categories");
export default CategoriesSchema;