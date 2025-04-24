"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Plus, ArrowLeft, Info } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import Link from "next/link";
import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, CardContent } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";

const categories = [
  { id: 1, name: "Spices & Masalas" },
  { id: 2, name: "Pickles & Chutneys" },
  { id: 3, name: "Tea & Beverages" },
  { id: 4, name: "Organic Products" },
  { id: 5, name: "Snacks" },
];

const AddNewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountPercentage: "",
    category: "",
    isNew: false,
    isBestSeller: false,
    stock: "",
    features: [""]
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Calculate discounted price based on percentage
  const calculatedDiscountedPrice = productData.price && productData.discountPercentage
    ? (productData.price - (productData.price * (parseFloat(productData.discountPercentage) / 100))).toFixed(2)
    : "";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            src: reader.result,
            file: file
          });
          if (newImages.length === files.length) {
            setImages(prevImages => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };
  
  // Handle product features
  const addFeature = () => {
    setProductData({
      ...productData,
      features: [...productData.features, ""]
    });
  };
  
  const removeFeature = (index) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures.splice(index, 1);
    setProductData({
      ...productData,
      features: updatedFeatures
    });
  };
  
  const updateFeature = (index, value) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures[index] = value;
    setProductData({
      ...productData,
      features: updatedFeatures
    });
  };
  
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert editor content to raw JSON format
    const description = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    
    // Calculate the final price based on discount percentage
    const finalPrice = calculatedDiscountedPrice || productData.price;
    
    // Here you would typically send the data to your API
    console.log("Product data submitted:", {
      ...productData,
      description,
      images,
      finalPrice
    });
    // Reset form or redirect
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-0 overflow-hidden">
      <div className="bg-gradient-to-r from-[#0055a4] to-[#39c4ff] p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-white hover:text-white/80 bg-white/20 p-2 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
        </div>
        <Image
          src="/Arksh Food.png"
          alt="Arksh Food Logo"
          width={45}
          height={45}
          className="rounded-full bg-white p-1"
        />
      </div>
      
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setActiveTab("basic")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === "basic" ? "border-b-2 border-[#0055a4] text-[#0055a4]" : "text-gray-500 hover:text-[#0055a4]"}`}
        >
          Basic Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === "description" ? "border-b-2 border-[#0055a4] text-[#0055a4]" : "text-gray-500 hover:text-[#0055a4]"}`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("images")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === "images" ? "border-b-2 border-[#0055a4] text-[#0055a4]" : "text-gray-500 hover:text-[#0055a4]"}`}
        >
          Images
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {activeTab === "basic" && (
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Product Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={productData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Price (NPR) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    required
                  />
                </div>

                {/* Discount Percentage */}
                <div className="space-y-2">
                  <label htmlFor="discountPercentage" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Discount Percentage (%)
                  </label>
                  <div className="relative">
                    <Input
                      id="discountPercentage"
                      name="discountPercentage"
                      type="number"
                      value={productData.discountPercentage}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="0.1"
                      className="border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4] pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  {productData.price && productData.discountPercentage ? (
                    <div className="text-xs text-green-600 mt-1">
                      Discounted price: NPR {calculatedDiscountedPrice}
                    </div>
                  ) : null}
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={productData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    required
                  />
                </div>

                {/* Product Flags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Product Flags
                  </label>
                  <div className="flex items-center gap-6 mt-2 bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <input
                        id="isNew"
                        name="isNew"
                        type="checkbox"
                        checked={productData.isNew}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-[#0055a4] focus:ring-[#0055a4]"
                      />
                      <label htmlFor="isNew" className="ml-2 text-sm text-gray-700">
                        Mark as New
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="isBestSeller"
                        name="isBestSeller"
                        type="checkbox"
                        checked={productData.isBestSeller}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-[#0055a4] focus:ring-[#0055a4]"
                      />
                      <label htmlFor="isBestSeller" className="ml-2 text-sm text-gray-700">
                        Best Seller
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "description" && (
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Product Description <span className="text-red-500">*</span>
                    <div className="relative group">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                        Use the rich text editor to format your product description with headings, lists, and more.
                      </div>
                    </div>
                  </label>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    {/* <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class p-4 min-h-[200px]"
                      toolbarClassName="toolbar-class border-b border-gray-300 sticky top-0 z-10 bg-white"
                      toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                        inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
                        blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                        fontSize: { options: [10, 12, 14, 16, 18, 24, 30, 36, 48] },
                        textAlign: { inDropdown: false },
                        list: { inDropdown: false, options: ['unordered', 'ordered'] },
                        link: { inDropdown: false, options: ['link', 'unlink'] },
                        image: { uploadCallback: file => {
                          return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              resolve({ data: { link: reader.result } });
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                          });
                        }, alt: { present: true, mandatory: false } },
                      }}
                    /> */}
                  </div>
                </div>
                
                {/* Product Features */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      Product Features
                    </label>
                    <Button 
                      type="button" 
                      onClick={addFeature} 
                      variant="outline" 
                      size="sm"
                      className="text-[#0055a4] border-[#0055a4] hover:bg-[#0055a4]/10"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Feature
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {productData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder={`Feature ${index + 1}`}
                          className="border-gray-300 focus:border-[#0055a4] focus:ring-[#0055a4]"
                        />
                        {productData.features.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeFeature(index)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "images" && (
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Upload high-quality images of your product. First image will be used as the main product image.</p>
                </div>
                
                {/* Image Upload Area */}
                <div className="mt-1 rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex flex-col text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-[#0055a4] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#0055a4] focus-within:ring-offset-2 hover:text-[#004a8f] mx-auto mb-1"
                      >
                        <span>Upload files</span>
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={handleImageChange}
                          required={images.length === 0}
                        />
                      </label>
                      <p>or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (Multiple images allowed)</p>
                  </div>
                </div>
                
                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images ({images.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative group rounded-md overflow-hidden border border-gray-200">
                          <div className="aspect-square">
                            <img
                              src={image.src}
                              alt="Product preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="opacity-0 group-hover:opacity-100 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 shadow-sm transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {images.indexOf(image) === 0 && (
                            <div className="absolute top-0 left-0 bg-[#0055a4] text-white text-xs px-2 py-1 rounded-br-md">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t pt-6 mt-6">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>All fields marked with <span className="text-red-500">*</span> are required</span>
          </div>
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0055a4] text-white hover:bg-[#004a8f] shadow-sm"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;