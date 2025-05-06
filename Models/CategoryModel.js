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
    Description: {
        type: String,
    },
    Image: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } })

CategoriesSchema = mongoose.models.Categories || mongoose.model("Categories", CategoriesSchema, "Categories");
export default CategoriesSchema;