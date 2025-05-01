const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    Name: { type: String, required: true, trim: true },
    Slug: { type: String, required: true, unique: true },
    Excerpt: { type: String, required: true },
    Description: { type: String },
    Ingredients: { type: String },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    Price: { type: Number, required: true },
    Discount: {
        Percentage: { type: Number, default: 0 },
    },
    Stock: {
        Quantity: { type: Number, required: true },
    },
    Media: { Images: { type: String} },
    SEO: {
        Title: { type: String },
        Description: { type: String },
        Keywords: { type: String },
    },
    Status: { type: String, enum: ['Active', 'Inactive', 'Discontinued'], default: 'Active' }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } });

ProductSchema = mongoose.models.Products || mongoose.model('Products', ProductSchema, 'Products');

export default ProductSchema;