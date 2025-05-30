import mongoose from 'mongoose';
import ProductSchema from './ProductModel';
import UserSchema from './UserModel';

const CartItemSchemaDef = new mongoose.Schema({
  ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  Price: Number,
  Quantity: Number,
  Status: {
    type: String,
    enum: ['Active', 'Abandoned', 'Converted'],
    default: 'Active'
  }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } });

const CartItemSchema = mongoose.models.CartItems || mongoose.model("CartItems", CartItemSchemaDef, "CartItems");


const CartSchemaDef = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  CartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItems" }],
  Total: { type: Number, default: 0 },
  Discount: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } });

const CartSchema = mongoose.models.Carts || mongoose.model("Carts", CartSchemaDef, "Carts");
export { CartSchema, CartItemSchema };
