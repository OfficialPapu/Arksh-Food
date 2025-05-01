"use client";
import { Tag, Check, AlertCircle, Star } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import {useProductContext} from "../Context/ProductContext";

const BasicInfo = () => {
    const { categories, productData, setProductData, handleInputChange, handleSelectChange } = useProductContext();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
                <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-white px-6 py-5 border-b">
                        <CardTitle className="text-lg font-semibold flex items-center">
                            <Tag className="h-5 w-5 mr-2 text-[#0055a4]" />
                            Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="text-gray-700 font-medium"
                                >
                                    Product Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    className="mt-1.5 h-12 text-base"
                                />
                            </div>

                            <div className="w-full">
                                <Label
                                    htmlFor="category"
                                    className="text-gray-700 font-medium"
                                >
                                    Category <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={productData.category}
                                    onValueChange={(value) =>
                                        handleSelectChange("category", value)
                                    }
                                >
                                    <SelectTrigger
                                        id="category"
                                        className="mt-1.5 h-12 text-base w-full"
                                    >
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.Category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label
                                    htmlFor="shortDescription"
                                    className="text-gray-700 font-medium"
                                >
                                    Short Description
                                </Label>
                                <Textarea
                                    id="shortDescription"
                                    placeholder="Brief description of the product (appears in product listings)"
                                    className="mt-1.5 min-h-[100px] text-base"
                                    value={productData.excerpt}
                                    onChange={handleInputChange}
                                    name="excerpt"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Keep it short and compelling. This appears in product
                                    listings.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-white px-6 py-5 border-b">
                        <CardTitle className="text-lg font-semibold flex items-center">
                            <Star className="h-5 w-5 mr-2 text-[#0055a4]" />
                            Product Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="isNew"
                                        className="text-gray-700 font-medium"
                                    >
                                        Mark as New
                                    </Label>
                                    <p className="text-gray-500 text-sm">
                                        Display a "New" badge
                                    </p>
                                </div>
                                <Switch
                                    id="isNew"
                                    name="isNew"
                                    checked={productData.isNew}
                                    onCheckedChange={(checked) =>
                                        setProductData({ ...productData, isNew: checked })
                                    }
                                    className="data-[state=checked]:bg-[#0055a4]"
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="isBestSeller"
                                        className="text-gray-700 font-medium"
                                    >
                                        Best Seller
                                    </Label>
                                    <p className="text-gray-500 text-sm">
                                        Mark as a best seller
                                    </p>
                                </div>
                                <Switch
                                    id="isBestSeller"
                                    name="isBestSeller"
                                    checked={productData.isBestSeller}
                                    onCheckedChange={(checked) =>
                                        setProductData({
                                            ...productData,
                                            isBestSeller: checked,
                                        })
                                    }
                                    className="data-[state=checked]:bg-[#0055a4]"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-[#0055a4]/5 to-[#39c4ff]/5">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#0055a4]/10 rounded-full p-3 text-[#0055a4]">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">
                                    Tips for Success
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Products with complete information sell up to 80%
                                    better.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-1.5" />
                                        Use high-quality images
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-1.5" />
                                        Write detailed descriptions
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-1.5" />
                                        Include all ingredients
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default BasicInfo
