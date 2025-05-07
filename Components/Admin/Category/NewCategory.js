"use client";
import { useState, useRef } from "react";
import { Upload, Save, Trash2, FolderPlus, Info, Check, AlertCircle, ImageIcon } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import axios from "@/lib/axios";
import toast from 'react-hot-toast';
export default function AddNewCategory() {
  const fileInputRef = useRef(null);

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      processImageFile(files[0]);
    } else {
      toast.error('Please drop an image file only (JPG, PNG, GIF)');
    }
  };

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        id: Date.now(),
        src: reader.result,
        file: file,
        name: file.name,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!categoryData.name.trim()) {
      toast.error('Category name is required');
      setIsSubmitting(false);
      return;
    }
    if (!image) {
      toast.error('Please upload a category image!');
      setIsSubmitting(false);
      return;
    }


    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);
    formData.append("image", image.file);

    try {
      const response = await axios.post("api/admin/categories/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        toast.success("New Category add sucessfully!")
        setCategoryData({
          name: "",
          description: "",
        });
        setImage(null);
      }

    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pb-12">
      <div className="bg-white border-b z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">New Category</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#0055a4] hover:bg-[#004a8f] text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Category
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="sm:max-w-3xl w-full mx-auto py-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FolderPlus className="h-5 w-5 mr-2 text-[#0055a4]" />
                  Category Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Category Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={categoryData.name}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                      className="mt-1.5 h-12 text-base"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-gray-700 font-medium"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the category"
                      className="mt-1.5 min-h-[100px] text-base"
                      value={categoryData.description}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      A short description helps customers understand what
                      products they can find in this category.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Image */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-[#0055a4]" />
                  Category Image
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {!image ? (
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
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="mx-auto w-20 h-20 rounded-full bg-[#0055a4]/10 flex items-center justify-center mb-4">
                        <Upload className="h-10 w-10 text-[#0055a4]" />
                      </div>
                      <h3 className="text-gray-800 font-semibold text-lg mb-2">
                        Upload Category Image
                      </h3>
                      <p className="text-gray-600 mb-4 max-w-md mx-auto">
                        Drag and drop your image here, or click to browse. We
                        recommend using a square image for best results.
                      </p>
                      <Button
                        type="button"
                        className="bg-[#0055a4] hover:bg-[#004a8f] text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Select Image
                      </Button>
                      <p className="text-xs text-gray-500 mt-4">
                        Supported formats: JPG, PNG, WEBP. Max size: 5MB.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt="Category preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            Image Uploaded
                          </h3>
                          <p className="text-sm text-gray-500">{image.name}</p>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(image.size)}
                          </p>
                        </div>
                        <div className="flex">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-500 hover:bg-red-50"
                            onClick={removeImage}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#39c4ff]/10 border border-[#39c4ff]/20 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-[#0055a4] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Image Guidelines
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                          <li>
                            Use a square image (1:1 ratio) for consistent
                            display
                          </li>
                          <li>Recommended size: 600 x 600 pixels</li>
                          <li>
                            Keep file size under 5MB for optimal performance
                          </li>
                          <li>
                            Use a simple, clear image that represents the
                            category
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 mr-2 text-[#0055a4]" />
                  Category image is required
                </div>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#0055a4] hover:bg-[#004a8f] text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Category
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
