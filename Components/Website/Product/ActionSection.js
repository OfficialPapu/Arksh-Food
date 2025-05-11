"use client";
import { useState } from "react";
import {
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Clock,
  Leaf,
  Award,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import UseProductDetails from "./UseProductDetails";
import useCartActions from "@/Components/Hooks/Cart";
import ShareButton from "./ShareBtn";
import Link from "next/link";
const ActionSection = () => {
  const productBenefits = [
    { icon: <Leaf className="h-5 w-5" />, text: "100% Organic" },
    { icon: <Award className="h-5 w-5" />, text: "High Protein" },
    { icon: <Clock className="h-5 w-5" />, text: "Ready in 5 mins" },
  ];

  const { incrementQuantity, decrementQuantity, quantity, Product } =
    UseProductDetails();
  const { HandleAddToCart, IsProductInCart, loading, setLoading } =
    useCartActions();
  const isInCart = IsProductInCart(Product._id);
  const isOutOfStock = Product.Quantity <= 0;
  return (
    <div>
      {/* Product Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2">
            {Product?.Category?.Category ? (
              <>
                <div className="h-3 w-3 rounded-full bg-[#0055b8]"></div>
                <Link href={`/category/${Product?.Category?.Slug}`} className="text-[#0055b8] text-sm font-medium uppercase tracking-wider">
                  {Product.Category.Category}
                </Link>
              </>
            ) : (
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
          <div className="flex gap-3">
            <ShareButton />
          </div>
        </div>

        {Product?.Name ? (
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {Product.Name}
          </h1>
        ) : (
          <div className="space-y-2 mb-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}

        {Product?.Excerpt ? (
          <p className="text-gray-600 leading-relaxed mt-1">{Product.Excerpt}</p>
        ) : (
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Price and Quantity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
        <div>
          <div className="flex items-baseline gap-2">
            {Product?.Price ? (
              <>
                {Product?.Discount?.Percentage ? (
                  <>
                    <span className="text-3xl font-bold text-[#0055b8]">
                      Rs. {Product.Price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      Rs. {Product.Price.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-white bg-green-500 px-2 py-0.5 rounded">
                      Save Rs. {Product.Discount.Percentage}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#0055b8]">
                    Rs. {Product.Price.toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <div className="flex items-baseline gap-3">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-green-100 rounded animate-pulse"></div>
              </div>
            )}
          </div>
          {isOutOfStock && <div className="mt-2 text-red-500">Out of stock</div>}
        </div>
        <div className="mb-6">
          <div className="flex items-center bg-white rounded-full border border-gray-200 p-1 w-fit">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0055b8] hover:bg-blue-50"
              onClick={() => decrementQuantity()}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-12 text-center font-medium text-gray-800">
              {quantity}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0055b8] hover:bg-blue-50"
              onClick={() => incrementQuantity()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Benefits */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="h-1 w-4 bg-[#0055b8] rounded-full mr-2"></span>
          Key Benefits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {productBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-l-2 border-[#39b9e6]"
            >
              <div className="text-[#0055b8]">{benefit.icon}</div>
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        {Product?.Name ? (
          <>
            <Button
              className="h-12 px-6 bg-[#0055b8] hover:bg-[#0055b8]/90 text-white rounded-lg font-medium text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              onClick={async () => {
                await HandleAddToCart(Product);
              }}
              disabled={loading || isInCart || isOutOfStock}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Adding to Bag...</span>
                </>
              ) : isInCart ? (
                <>
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Bag</span>
                </>
              )}
            </Button>

            <Button
              className="h-12 bg-white border-2 border-[#0055b8] text-[#0055b8] hover:bg-[#0055b8]/5 rounded-lg font-medium text-base shadow-sm"
              disabled={loading || isOutOfStock}
              onClick={async () => {
                await HandleAddToCart(Product, false, true);
              }}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Buy Now
            </Button>
          </>
        ) : (
          <>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse border-2 border-gray-200"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionSection;
