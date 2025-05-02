"use client";
import { Save, Camera, DollarSign, Tag, Layers } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import BasicInfo from "../Tabs/BasicInfo";
import Media from "../Tabs/Media";
import Details from "../Tabs/Details";
import PricingInventory from "../Tabs/PricingInventory";
import { ProductProvider, useProductContext } from "../Context/ProductContext";
import { DescTipTapProvider } from "../Context/DescTipTapContext";
import { IngredientsTipTapProvider } from "../Context/IngredientsTipTapContext";
import { Toaster } from "react-hot-toast";

export default function AddNewProduct() {
  return (
    <DescTipTapProvider>
      <IngredientsTipTapProvider>
        <ProductProvider>
          <NewProductForm />
        </ProductProvider>
      </IngredientsTipTapProvider>
    </DescTipTapProvider>
  );
}

function NewProductForm() {
  const { handleSubmit, isSubmitting, activeTab, setActiveTab } = useProductContext();
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pb-12 ProductPage">
       <Toaster toastOptions={{ duration: 2000 }} />
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
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${activeTab === "basic"
                ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeTab === "basic"
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
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${activeTab === "media"
                ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeTab === "media"
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
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${activeTab === "details"
                ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeTab === "details"
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
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${activeTab === "pricing"
                ? "border-[#0055a4] bg-[#0055a4]/5 text-[#0055a4]"
                : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeTab === "pricing"
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
            <BasicInfo />
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <Media />
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <Details />
          </TabsContent>

          <TabsContent value="pricing" className="mt-0">
            <PricingInventory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};