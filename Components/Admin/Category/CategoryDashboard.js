"use client"
import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, X, ImageIcon, StarIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon, TagIcon, FileTextIcon, CheckIcon, AlertCircleIcon, UploadIcon, Loader2 } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Textarea } from "@/Components/ui/textarea"
import { Separator } from "@/Components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import Link from "next/link"
import axios from "@/lib/axios"
import Image from "next/image"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

const CategoryDashboard = () => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("api/categories")
        setCategories(response.data)
      } catch (error) {
        toast.error("Failed to load categories. Please try again.")
      }
    }
    fetchCategories()
  }, [])

  const [categories, setCategories] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Edit Category Modal States
  const [editedCategory, setEditedCategory] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [seoExpanded, setSeoExpanded] = useState(false)

  useEffect(() => {
    if (currentCategory && isEditModalOpen) {
      setEditedCategory(currentCategory)
      setImagePreview(currentCategory.Image ? process.env.NEXT_PUBLIC_IMAGE_URL + currentCategory.Image : null)
      setFormErrors({})
      setSeoExpanded(false)
      setImageFile(null)
    }
  }, [currentCategory, isEditModalOpen])

  const FilteredCategories = categories.filter((category) =>
    category.Category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field, value) => {
    setEditedCategory({
      ...editedCategory,
      [field]: value,
    })

    // Clear error for this field if it exists
    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleImageFile = (file) => {

    // Check file type
    if (!["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
      toast.error("Only JPG, PNG, and SVG formats are allowed")
      setFormErrors({
        ...formErrors,
        Image: "Only JPG, PNG, and SVG formats are allowed",
      })
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)

    // Clear any image errors
    if (formErrors.Image) {
      const newErrors = { ...formErrors }
      delete newErrors.Image
      setFormErrors(newErrors)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files?.length) {
      handleImageFile(e.dataTransfer.files[0])
    }
  }

  const validateForm = () => {
    let isValid = true
    const errors = {}

    if (!editedCategory?.Category?.trim()) {
      toast.error("Category name is required")
      errors.Category = "Category name is required"
      isValid = false
    }

    if (!imagePreview && !editedCategory?.Image) {
      toast.error("Category image is required")
      errors.Image = "Category image is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleEditCategory = async () => {
    if (!validateForm()) return;
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append("Category", editedCategory.Category)
      imageFile && formData.append("image", imageFile);
      const fields = {
        metaTitle: editedCategory.metaTitle,
        metaDescription: editedCategory.metaDescription,
        keywords: editedCategory.keywords,
        Description: editedCategory.Description
      };
      Object.entries(fields).forEach(([key, value]) => {
        value && formData.append(key, value);
      });

      const response = await axios.put(`api/admin/categories/${editedCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        setCategories(categories.map((cat) => (cat._id === editedCategory._id ? response.data : cat)))
        toast.success("Category updated successfully")
        setIsEditModalOpen(false)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 413) {
          toast.error("Image size is too large. Please use a smaller image.")
        } else if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error(`Error: ${error.response.status} - ${error.response.statusText}`)
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.")
      } else {
        toast.error("An error occurred while updating the category.")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if (!editedCategory?.Image) {
      setFormErrors({
        ...formErrors,
        Image: "Category image is required",
      })
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(`api/admin/categories/${currentCategory._id}`)
      if (response.status === 200) {
        setCategories(categories.filter((cat) => cat._id !== currentCategory._id))
        toast.success("Category deleted successfully")
        setIsDeleteModalOpen(false)
      }
    } catch (error) {
      toast.error("Failed to delete category. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0057b7] mb-2">Categories</h1>
          <p className="text-gray-600">Manage categories and organize your food items</p>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-0 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search */}
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0057b7]/60 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 rounded-lg focus:ring-[#0057b7] focus:border-[#0057b7]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link href="/admin/categories/new">
                  <Button className="bg-[#0057b7] hover:bg-[#004a9e] text-white shadow-md cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Display */}
        {FilteredCategories.length > 0 ? (
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-100">
              {FilteredCategories.map((category) => (
                <div key={category._id} className="p-5 hover:bg-[#eef5ff] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-full flex items-center justify-center text-white shadow-md">
                        <Image
                          width={56}
                          height={56}
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + category.Image || "/Media/Images/Logo/Arksh Food.png"}
                          alt={`${category.Category || "Category"} image`}
                          className="w-10 h-10 object-contain"
                          priority
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{category.Category}</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentCategory(category)
                            setIsEditModalOpen(true)
                          }}
                          className="h-9 w-9 text-[#0057b7] hover:text-[#0057b7] hover:bg-[#eef5ff] rounded-full"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentCategory(category)
                            setIsDeleteModalOpen(true)
                          }}
                          className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="border-0 shadow-lg rounded-xl">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Image
                  width={56}
                  height={56}
                  src="/Media/Images/Logo/Arksh Food.png"
                  alt="ARKSH Logo"
                  className="w-16 h-16 object-contain !m-0"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No categories found</h3>
              <p className="text-[#0057b7] mb-8 max-w-md">
                {searchTerm ? `No results for "${searchTerm}"` : "Start by adding your first food category."}
              </p>
              {searchTerm ? (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="text-[#0057b7] border-[#cce0ff] hover:bg-[#eef5ff]"
                >
                  Clear search
                </Button>
              ) : (
                <Link href="/admin/categories/new">
                  <Button className="bg-[#0057b7] hover:bg-[#004a9e] text-white shadow-md cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Category
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen && editedCategory} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden rounded-xl border-[#0057b7]/20 bg-white">
          <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#eef5ff] flex items-center justify-center mr-3">
                    <FileTextIcon className="h-4 w-4 text-[#0057b7]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#0057b7]">Basic Information</h3>
                </div>

                <div className="space-y-4 px-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-[#0057b7] font-medium flex items-center text-sm">
                      <span>Category Name</span>
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="edit-name"
                        value={editedCategory?.Category || ""}
                        onChange={(e) => handleInputChange("Category", e.target.value)}
                        className={cn(
                          "border-[#cce0ff] focus:border-[#0057b7] focus:ring-[#0057b7]/20 rounded-lg pl-3 pr-10 py-2 transition-all",
                          formErrors.Category ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "",
                        )}
                        placeholder="Enter category name"
                      />
                      {formErrors.Category ? (
                        <AlertCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                      ) : editedCategory?.Category ? (
                        <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#30b4e9]" />
                      ) : null}
                    </div>
                    {formErrors.Category && <p className="text-red-500 text-xs mt-1">{formErrors.Category}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-[#0057b7] font-medium flex items-center justify-between text-sm"
                    >
                      <span>Description</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={editedCategory?.Description || ""}
                      onChange={(e) => handleInputChange("Description", e.target.value)}
                      className="border-[#cce0ff] focus:border-[#0057b7] focus:ring-[#0057b7]/20 rounded-lg min-h-[100px]"
                      placeholder="Brief description for search engines"
                    />
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="edit-image" className="text-[#0057b7] font-medium flex items-center text-sm">
                      <span>Category Image</span>
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 text-center transition-all",
                        isDragging ? "border-[#0057b7] bg-[#eef5ff]" : "border-[#cce0ff] hover:bg-[#f0f7ff]",
                        formErrors.Image ? "border-red-300" : "",
                        imagePreview ? "border-[#30b4e9]/30 bg-[#eef5ff]" : "",
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="edit-image"
                        className="hidden"
                        accept="image/png,image/jpeg,image/svg+xml"
                        onChange={handleImageChange}
                      />

                      {imagePreview ? (
                        <div className="relative">
                          <div className="relative mx-auto w-32 h-32 rounded-lg overflow-hidden border-2 border-[#cce0ff]">
                            <Image
                              src={imagePreview || "/Media/Images/Logo/placeholder.svg"}
                              alt="Category preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className="text-sm text-[#30b4e9] mt-2 font-medium">Image selected</p>
                        </div>
                      ) : (
                        <label htmlFor="edit-image" className="cursor-pointer block">
                          <div className="flex flex-col items-center">
                            <div className="h-16 w-16 rounded-full bg-[#eef5ff] flex items-center justify-center mb-3">
                              <UploadIcon className="h-8 w-8 text-[#0057b7]" />
                            </div>
                            <p className="text-sm text-[#0057b7] font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-[#0057b7]/60">SVG, PNG, JPG (max. 2MB)</p>
                          </div>
                        </label>
                      )}
                    </div>
                    {formErrors.Image && <p className="text-red-500 text-xs mt-1">{formErrors.Image}</p>}
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-[#cce0ff]" />

              {/* SEO Settings */}
              <Collapsible open={seoExpanded} onOpenChange={setSeoExpanded} className="space-y-4">
                <CollapsibleTrigger className="flex items-center w-full text-left">
                  <div className="h-8 w-8 rounded-full bg-[#eef5ff] flex items-center justify-center mr-3">
                    <SearchIcon className="h-4 w-4 text-[#0057b7]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#0057b7] flex-1">SEO Settings</h3>
                  <div className="h-8 w-8 rounded-full bg-[#eef5ff] flex items-center justify-center">
                    {seoExpanded ? (
                      <ChevronUpIcon className="h-4 w-4 text-[#0057b7]" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 text-[#0057b7]" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-5 px-4 pt-2">
                  <div className="p-3 bg-[#f0f7ff] border border-[#cce0ff] rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-[#30b4e9] mt-0.5">
                        <TagIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-[#0057b7]/80">
                          Optimize your category for search engines by providing relevant meta information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-meta-title"
                        className="text-[#0057b7] font-medium flex items-center justify-between text-sm"
                      >
                        <span>Meta Title</span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            (editedCategory?.metaTitle || editedCategory?.SEO?.Title || "").length > 55
                              ? "text-amber-700 bg-amber-50"
                              : "text-[#0057b7]/60 bg-[#eef5ff]",
                          )}
                        >
                          {(editedCategory?.metaTitle || editedCategory?.SEO?.Title || "").length}/60
                        </span>
                      </Label>
                      <Input
                        id="edit-meta-title"
                        value={editedCategory?.metaTitle || editedCategory?.SEO?.Title || ""}
                        onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                        className="border-[#cce0ff] focus:border-[#0057b7] focus:ring-[#0057b7]/20 rounded-lg"
                        placeholder="SEO title for this category"
                      />
                      <p className="text-xs text-[#0057b7]/60">Recommended length: 50-60 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-keywords"
                        className="text-[#0057b7] font-medium flex items-center justify-between text-sm"
                      >
                        <span>Keywords</span>
                        <span className="text-xs text-[#0057b7]/60 bg-[#eef5ff] px-2 py-0.5 rounded-full">
                          Comma separated
                        </span>
                      </Label>
                      <Input
                        id="edit-keywords"
                        value={editedCategory?.keywords || editedCategory?.SEO?.Keywords || ""}
                        onChange={(e) => handleInputChange("keywords", e.target.value)}
                        className="border-[#cce0ff] focus:border-[#0057b7] focus:ring-[#0057b7]/20 rounded-lg"
                        placeholder="food, healthy, organic"
                      />
                      <p className="text-xs text-[#0057b7]/60">Add 3-5 relevant keywords for better search results</p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-meta-description"
                        className="text-[#0057b7] font-medium flex items-center justify-between text-sm"
                      >
                        <span>Meta Description</span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            (editedCategory?.metaDescription || editedCategory?.SEO?.Description || "").length > 145
                              ? "text-amber-700 bg-amber-50"
                              : (editedCategory?.metaDescription || editedCategory?.SEO?.Description || "").length < 50 &&
                                (editedCategory?.metaDescription || editedCategory?.SEO?.Description || "").length > 0
                                ? "text-amber-700 bg-amber-50"
                                : "text-[#0057b7]/60 bg-[#eef5ff]",
                          )}
                        >
                          {(editedCategory?.metaDescription || editedCategory?.SEO?.Description || "").length}/160
                        </span>
                      </Label>
                      <Textarea
                        id="edit-meta-description"
                        value={editedCategory?.metaDescription || editedCategory?.SEO?.Description || ""}
                        onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                        className="border-[#cce0ff] focus:border-[#0057b7] focus:ring-[#0057b7]/20 rounded-lg min-h-[100px]"
                        placeholder="Brief description for search engines"
                      />
                      <p className="text-xs text-[#0057b7]/60">
                        Recommended length: 120-160 characters. Include your main keywords.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 bg-[#f5f9ff] border-t border-[#cce0ff] flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="border-[#cce0ff] text-[#0057b7] hover:bg-[#eef5ff] w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEditCategory}
              disabled={isSaving}
              className={cn(
                "bg-[#0057b7] hover:bg-[#004494] text-white w-full sm:w-auto order-1 sm:order-2 transition-all",
                isSaving ? "opacity-80" : "",
              )}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen && currentCategory} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-4">
              <Trash2 className="h-10 w-10 text-red-500" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-red-600">Delete Category</DialogTitle>
          </DialogHeader>
          {currentCategory && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
              <AlertDescription>
                Are you sure you want to delete "<span className="font-semibold">{currentCategory.Category}</span>
                "? This will remove all associated data and cannot be undone.
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter className="sm:justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeleteCategory}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CategoryDashboard
