import mongoose from "mongoose";
let ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Slug: { type: String, required: true },
    Excerpt: { type: String, required: true },
    Description: { type: String },
    Ingredients: { type: String },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    Price: { type: Number, required: true },
    Discount: {
      Percentage: { type: Number, default: 0 },
    },
    Quantity: { type: Number, required: true },
    Media: { Images: [{ type: String }] },
    SEO: {
      Title: { type: String },
      Description: { type: String },
      Keywords: { type: String },
    },
    Review: [
      {
        User: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        Comment: { type: String },
        Rating: { type: Number, min: 1, max: 5 },
        CreatedAt: { type: Date, default: Date.now },
      },
    ],
    Status: {
      type: String,
      enum: ["Active", "Inactive", "Discontinued"],
      default: "Active",
    },
  },
  { timestamps: { createdAt: "CreatedAt", updatedAt: "UpdateAt" } }
);

ProductSchema =
  mongoose.models.Products ||
  mongoose.model("Products", ProductSchema, "Products");

export default ProductSchema;

