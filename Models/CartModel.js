import mongoose from 'mongoose';

const CartItemSchemaDef = new mongoose.Schema({
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  Price: Number,
  Quantity: Number,
  Status: {
    type: String,
    enum: ['Active', 'Abandoned', 'Converted'],
    default: 'Active'
  }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } });

const CartItemSchema = mongoose.models.CartItems || mongoose.model("CartItems", CartItemSchemaDef, "CartItems");


const CartSchemaDef = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  CartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItems" }],
  Total: { type: Number, default: 0 },
  Discount: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } });

const CartSchema = mongoose.models.Carts || mongoose.model("Carts", CartSchemaDef, "Carts");
export { CartSchema, CartItemSchema };
