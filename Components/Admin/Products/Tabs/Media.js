"use client";
import { Upload, Trash2, Camera, Info, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { useProductContext } from "../Context/ProductContext";
const Media = () => {
    const { images, isDragging, fileInputRef, handleDragOver, handleDragLeave, handleDrop, processImageFiles, handleImageChange, removeImage, formatFileSize, } = useProductContext();
    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-[#0055a4]" />
                    Product Images
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6">
                    <div
                        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${isDragging
                            ? "border-[#0055a4] bg-[#0055a4]/5"
                            : "border-[#0055a4]/20 hover:bg-[#0055a4]/5"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="mx-auto w-20 h-20 rounded-full bg-[#0055a4]/10 flex items-center justify-center mb-4">
                            <Upload className="h-10 w-10 text-[#0055a4]" />
                        </div>
                        <h3 className="text-gray-800 font-semibold text-lg mb-2">
                            Upload Product Images
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md mx-auto">
                            Drag and drop your images here, or click to browse. We
                            recommend using at least 3 high-quality images.
                        </p>
                        <Button
                            type="button"
                            className="bg-[#0055a4] hover:bg-[#004a8f] text-white"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Select Images
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">
                            Supported formats: JPG, PNG, WEBP.
                        </p>
                    </div>

                    {images.length > 0 && (
                        <div>
                            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                {images.length}{" "}
                                {images.length === 1 ? "Image" : "Images"} Uploaded
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm"
                                    >
                                        <div className="aspect-square relative">
                                            <img
                                                src={image.src || "/placeholder.svg"}
                                                alt={`Product image ${index + 1}`}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(image.id)}
                                                className="bg-red-500 text-white p-2 rounded-full"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {index === 0 && (
                                            <Badge className="absolute top-2 left-2 bg-[#0055a4]">
                                                Main
                                            </Badge>
                                        )}
                                        <div className="p-2 text-xs">
                                            <p className="truncate text-gray-700">
                                                {image.name || `Image ${index + 1}`}
                                            </p>
                                            <p className="text-gray-500">
                                                {formatFileSize(image.size || 0)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex items-center text-sm text-gray-600">
                    <Info className="h-4 w-4 mr-2 text-[#0055a4]" />
                    The first image will be used as the main product image in
                    listings.
                </div>
            </CardFooter>
        </Card>
    )
}

export default Media
