"use client";
import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  Sparkles,
  Camera,
  DollarSign,
  Tag,
  Package,
  Percent,
  Info,
  Check,
  AlertCircle,
  Layers,
  Star,
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import axios from "@/lib/axios";

const AddNewProduct = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {}
    };
    fetchCategories();
  }, []);
  // const { toast } = useToast()
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountPercentage: "",
    category: "",
    isNew: false,
    isBestSeller: false,
    stock: "",
    features: [""],
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [ingredientsContent, setIngredientsContent] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Calculate discounted price based on percentage
  const calculatedDiscountedPrice =
    productData.price && productData.discountPercentage
      ? (
          productData.price -
          productData.price *
            (Number.parseFloat(productData.discountPercentage) / 100)
        ).toFixed(2)
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
      processImageFiles(files);
    } else {
      // toast({
      //   title: "Invalid files",
      //   description: "Please drop image files only (JPG, PNG, GIF)",
      //   variant: "destructive",
      // })
    }
  };

  const processImageFiles = (files) => {
    if (files.length > 10) {
      // toast({
      //   title: "Too many files",
      //   description: "You can upload a maximum of 10 images at once",
      //   variant: "destructive",
      // })
      files = files.slice(0, 10);
    }

    const newImages = [];
    let loadedCount = 0;

    files.forEach((file) => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        // toast({
        //   title: "File too large",
        //   description: `${file.name} exceeds the 5MB limit`,
        //   variant: "destructive",
        // })
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          src: reader.result,
          file: file,
          name: file.name,
          size: file.size,
        });

        loadedCount++;
        if (loadedCount === files.length) {
          if (images.length + newImages.length > 20) {
            // toast({
            //   title: "Maximum images reached",
            //   description: "You can upload a maximum of 20 images per product",
            //   variant: "destructive",
            // })
            const allowedNewImages = newImages.slice(0, 20 - images.length);
            setImages((prevImages) => [...prevImages, ...allowedNewImages]);
          } else {
            setImages((prevImages) => [...prevImages, ...newImages]);
            // toast({
            //   title: "Images uploaded",
            //   description: `Successfully added ${newImages.length} image${newImages.length > 1 ? "s" : ""}`,
            // })
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processImageFiles(files);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
    // toast({
    //   title: "Image removed",
    //   description: "The image has been removed from your product",
    // })
  };

  // Handle product features
  const addFeature = () => {
    setProductData({
      ...productData,
      features: [...productData.features, ""],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures.splice(index, 1);
    setProductData({
      ...productData,
      features: updatedFeatures,
    });
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures[index] = value;
    setProductData({
      ...productData,
      features: updatedFeatures,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Here you would typically send the data to your API
      console.log("Product data submitted:", {
        ...productData,
        description: descriptionContent,
        ingredients: ingredientsContent,
        images,
        finalPrice: calculatedDiscountedPrice || productData.price,
      });

      setIsSubmitting(false);
      // toast({
      //   title: "Product submitted",
      //   description: "Your product has been successfully added",
      // })
      // Reset form or redirect
    }, 1500);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Top Navigation Bar */}
      <div className="bg-white sm:border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">New Product</h1>
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
                  <span>Add Product</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="py-6">
        {/* Main Tabs Navigation */}
        <Tabs
          defaultValue="basic"
          onValueChange={setActiveTab}
          className="w-full mb-8 md:gap-[110px] gap-[250px] grid"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 bg-transparent p-0 w-full">
            <TabsTrigger
              value="basic"
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                activeTab === "basic"
                  ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeTab === "basic"
                    ? "bg-[#0055a4]/10 text-[#0055a4]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Tag className="h-5 w-5" />
              </div>
              <span className="font-medium">Basic Info</span>
              <span className="text-xs mt-1 text-gray-500">
                Name, category, etc.
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="media"
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                activeTab === "media"
                  ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeTab === "media"
                    ? "bg-[#0055a4]/10 text-[#0055a4]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Camera className="h-5 w-5" />
              </div>
              <span className="font-medium">Media</span>
              <span className="text-xs mt-1 text-gray-500">
                Images & gallery
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="details"
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                activeTab === "details"
                  ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeTab === "details"
                    ? "bg-[#0055a4]/10 text-[#0055a4]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-medium">Details</span>
              <span className="text-xs mt-1 text-gray-500">
                Description & ingredients
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="pricing"
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                activeTab === "pricing"
                  ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeTab === "pricing"
                    ? "bg-[#0055a4]/10 text-[#0055a4]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="font-medium">Pricing</span>
              <span className="text-xs mt-1 text-gray-500">
                Price & inventory
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="basic" className="mt-0">
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
                          value={descriptionContent}
                          onChange={(e) =>
                            setDescriptionContent(e.target.value)
                          }
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
          </TabsContent>

          <TabsContent value="media" className="mt-0">
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
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      isDragging
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
                      Supported formats: JPG, PNG, WEBP. Max size: 5MB per
                      image.
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
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="bg-white px-6 py-5 border-b">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-[#0055a4]" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                      value="description"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0055a4]"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="ingredients"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0055a4]"
                    >
                      Ingredients
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0055a4]"
                    >
                      Features
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-0">
                    <div className="space-y-3 mb-4">
                      <Label className="text-gray-700 font-medium">
                        Detailed Description
                      </Label>
                      <p className="text-sm text-gray-600">
                        Provide a comprehensive description of your product,
                        including its benefits and uses.
                      </p>
                    </div>
                    <div className="min-h-[300px] border rounded-md">
                      {/* <ReactQuill
                        theme="snow"
                        value={descriptionContent}
                        onChange={setDescriptionContent}
                        modules={modules}
                        formats={formats}
                        className="h-64"
                        placeholder="Start writing your product description..."
                      /> */}
                    </div>
                  </TabsContent>

                  <TabsContent value="ingredients" className="mt-0">
                    <div className="space-y-3 mb-4">
                      <Label className="text-gray-700 font-medium">
                        Ingredients List
                      </Label>
                      <p className="text-sm text-gray-600">
                        List all ingredients in your product. Be transparent
                        about allergens and nutritional information.
                      </p>
                    </div>
                    <div className="min-h-[300px] border rounded-md">
                      {/* <ReactQuill
                        theme="snow"
                        value={ingredientsContent}
                        onChange={setIngredientsContent}
                        modules={modules}
                        formats={formats}
                        className="h-64"
                        placeholder="List your product ingredients here..."
                      /> */}
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-0">
                    <div className="space-y-3 mb-4">
                      <Label className="text-gray-700 font-medium">
                        Product Features
                      </Label>
                      <p className="text-sm text-gray-600">
                        Add key features that make your product stand out.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {productData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#0055a4]/10 flex items-center justify-center shrink-0 text-[#0055a4] font-medium">
                            {index + 1}
                          </div>
                          <Input
                            value={feature}
                            onChange={(e) =>
                              updateFeature(index, e.target.value)
                            }
                            placeholder={`Feature ${index + 1}`}
                            className="flex-1 border-gray-300 focus:border-[#0055a4] focus:ring focus:ring-[#0055a4]/20 focus:ring-opacity-50"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFeature(index)}
                            disabled={productData.features.length === 1}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFeature}
                        className="mt-2 border-[#0055a4]/30 text-[#0055a4] hover:bg-[#0055a4]/5"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-0">
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
                            Final price: NPR {calculatedDiscountedPrice}
                          </p>
                          <p className="text-xs text-gray-500">
                            Customers save: NPR{" "}
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
              <CardFooter className="bg-gray-50 px-6 py-4 border-t flex justify-end">
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
                      Save Product
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddNewProduct;
