"use client";
import { Save, Sparkles, DollarSign, Package, Percent, Check } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import {useProductContext} from "../Context/ProductContext";
const PricingInventory = () => {
    const { handleInputChange, productData } = useProductContext();
        const calculatedDiscountedPrice = productData.price && productData.discountPercentage
            ? (
                productData.price -
                productData.price *
                (Number.parseFloat(productData.discountPercentage) / 100)
            ).toFixed(2) : "";

    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-[#0055a4]" />
                    Pricing & Inventory
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <Label
                                htmlFor="price"
                                className="text-gray-700 font-medium"
                            >
                                Price (NPR) <span className="text-red-500">*</span>
                            </Label>
                            <div className="mt-1.5 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 text-base"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div>
                            <Label
                                htmlFor="discountPercentage"
                                className="text-gray-700 font-medium"
                            >
                                Discount Percentage
                            </Label>
                            <div className="mt-1.5 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Percent className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="number"
                                    id="discountPercentage"
                                    name="discountPercentage"
                                    placeholder="0"
                                    value={productData.discountPercentage}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 text-base"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            {productData.price && productData.discountPercentage ? (
                                <div className="mt-2 p-3 bg-[#0055a4]/5 rounded-md">
                                    <p className="text-sm font-medium text-[#0055a4]">
                                        Final price: Rs. {calculatedDiscountedPrice}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Customers save: Rs. {" "}
                                        {(
                                            productData.price - calculatedDiscountedPrice
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label
                                htmlFor="stock"
                                className="text-gray-700 font-medium"
                            >
                                Stock Quantity <span className="text-red-500">*</span>
                            </Label>
                            <div className="mt-1.5 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder="0"
                                    value={productData.stock}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 text-base"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-[#39c4ff]/10 rounded-lg border border-[#39c4ff]/20">
                            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                                <Sparkles className="h-5 w-5 mr-2 text-[#39c4ff]" />
                                Pricing Tips
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 text-[#0055a4] mt-0.5 mr-2" />
                                    <span>
                                        Research competitor pricing for similar products
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 text-[#0055a4] mt-0.5 mr-2" />
                                    <span>
                                        Consider offering bundle discounts for multiple
                                        purchases
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 text-[#0055a4] mt-0.5 mr-2" />
                                    <span>
                                        Set up low stock alerts to manage inventory
                                        efficiently
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PricingInventory
