"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import Link from "next/link";
import axios from "@/lib/axios";
import Image from "next/image";
const CategoryDashboard = () => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {}
    };
    fetchCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const FilteredCategories = categories.filter((category) =>
    category.Category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCategory = () => {
    // Edit category logic here
    setCategories(
      categories.map((cat) =>
        cat.id === currentCategory.id ? currentCategory : cat
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/categories/${currentCategory._id}`
      );
      if (response.status === 200) {
        setCategories(
          categories.filter((cat) => cat._id !== currentCategory._id)
        );
        setIsDeleteModalOpen(false);
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0057b7] mb-2">
            Categories
          </h1>
          <p className="text-gray-600">
            Manage categories and organize your food items
          </p>
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
                <div
                  key={category._id}
                  className="p-5 hover:bg-[#eef5ff] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-full flex items-center justify-center text-white shadow-md">
                        <Image
                          width={56}
                          height={56}
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                              category.Image || "/Arksh Food.png"
                          }
                          alt={`${category.Category || "Category"} image`}
                          className="w-10 h-10 object-contain"
                          priority
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {category.Category}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentCategory(category);
                            setIsEditModalOpen(true);
                          }}
                          className="h-9 w-9 text-[#0057b7] hover:text-[#0057b7] hover:bg-[#eef5ff] rounded-full"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentCategory(category);
                            setIsDeleteModalOpen(true);
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
                  src="/Arksh Food.png"
                  alt="ARKSH Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No categories found
              </h3>
              <p className="text-[#0057b7] mb-8 max-w-md">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "Start by adding your first food category."}
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
      <Dialog
        open={isEditModalOpen && currentCategory}
        onOpenChange={setIsEditModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-full flex items-center justify-center text-white shadow-md">
              <Image
                width={56}
                height={56}
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL + currentCategory?.Image ||
                  "/Arksh Food.png"
                }
                alt={`${currentCategory?.Category || "Category"} image`}
                className="w-10 h-10 object-contain"
                priority
              />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-[#0057b7]">
              Edit Category
            </DialogTitle>
            <DialogDescription className="text-center text-[#0057b7]/80">
              Update your food category details
            </DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-name"
                  className="text-[#0057b7] font-medium"
                >
                  Category Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentCategory.Category}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  className="border-[#cce0ff] focus:border-[#0057b7] rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="edit-slug"
                  className="text-[#0057b7] font-medium"
                >
                  URL Slug
                </Label>
                <Input
                  id="edit-slug"
                  value={currentCategory.Slug}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      slug: e.target.value,
                    })
                  }
                  className="border-[#cce0ff] focus:border-[#0057b7] rounded-lg"
                />
                <p className="text-xs text-[#0057b7]/80">
                  This will be used in the URL: /category/
                  <span className="font-medium">{currentCategory.Slug}</span>
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="edit-image"
                  className="text-[#0057b7] font-medium"
                >
                  Category Image
                </Label>
                <div className="border-2 border-dashed border-[#cce0ff] rounded-lg p-6 text-center hover:bg-[#eef5ff] transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-[#eef5ff] flex items-center justify-center mb-3">
                      <ImageIcon className="h-6 w-6 text-[#0057b7]" />
                    </div>
                    <p className="text-sm text-[#0057b7] font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#0057b7]/60">
                      SVG, PNG, JPG (max. 2MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="border-[#cce0ff] text-[#0057b7] hover:bg-[#eef5ff]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEditCategory}
              className="bg-[#0057b7] hover:bg-[#004a9e] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen && currentCategory}
        onOpenChange={setIsDeleteModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-4">
              <Trash2 className="h-10 w-10 text-red-500" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-red-600">
              Delete Category
            </DialogTitle>
          </DialogHeader>
          {currentCategory && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50 text-red-800"
            >
              <AlertDescription>
                Are you sure you want to delete "
                <span className="font-semibold">
                  {currentCategory.Category}
                </span>
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
  );
};

export default CategoryDashboard;
