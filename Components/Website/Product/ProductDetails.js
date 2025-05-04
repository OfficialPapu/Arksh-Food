"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCarousel from "@/Components/Website/Product/ProductCarousel";
import ActionSection from "@/Components/Website/Product/ActionSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import UseProductDetails from "./UseProductDetails";
import ReviewTab from "./ReviewTab";
const ProductDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { BreadcrumbItems, Product } = UseProductDetails();
  return (
    <>
      {Product && Product.Name ? (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 sm:px-24 px-2">
          <Breadcrumb className="pt-4 pb-5">
            <BreadcrumbList>
              {BreadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.name}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < BreadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <main className="pb-8 px-4">
            <div className="relative">
              <div className="grid SliderWrapper">
                <ProductCarousel />
                <ActionSection />
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-gray-100 p-0 h-auto">
                    {["description", "ingredients", "Review"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`px-5 py-3 font-medium text-sm data-[state=active]:text-[#0055b8] data-[state=active]:border-b-2 data-[state=active]:border-b-[#0055b8] data-[state=active]:bg-blue-50/50 data-[state=active]:shadow-none rounded-none`}
                      >
                        {tab === "description"
                          ? "Description"
                          : tab === "ingredients"
                          ? "Ingredients"
                          : "Review"}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent
                    value="description"
                    className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0 ProductPage"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: Product.Description }}
                    ></div>
                  </TabsContent>

                  <TabsContent
                    value="ingredients"
                    className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0 ProductPage"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: Product.Ingredients }}
                    ></div>
                  </TabsContent>

                  <TabsContent
                    value="Review"
                    className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0 ProductPage"
                  >
                    <ReviewTab />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <>
          <div className=" bg-[#f8faff]">
            <div className="container mx-auto px-4 pt-12">
              <div className="bg-white rounded-xl border border-gray-50 p-8 mb-12">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e6f3ff] to-[#f0f7ff] rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-dashed border-[#38b6ff]/30 rounded-full animate-spin-slow"></div>
                      <div className="relative z-10">
                        <div className="relative">
                          <ShoppingBag
                            className="w-24 h-24 text-[#0056b3]"
                            strokeWidth={1.5}
                          />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#0056b3] font-bold text-5xl">
                            !
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0056b3] mb-4">
                      Product Not Found
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                      We couldn't find the product you were looking for in our
                      collection of authentic Nepali foods.
                    </p>

                    <div className="relative mb-8 md:hidden">
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="pl-10 border-[#0056b3] focus:ring-[#38b6ff] rounded-full py-6"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0056b3] h-4 w-4" />
                      <Button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#0056b3] hover:bg-[#004494] rounded-full">
                        Search
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button className="bg-[#0056b3] hover:bg-[#004494] rounded-full py-6 !px-8 text-base">
                        <ShoppingBag className="mr-1 h-5 w-5" />
                        Continue Shopping
                      </Button>
                      <Link href="/">
                        <Button
                          variant="outline"
                          className="border-2 border-[#0056b3] text-[#0056b3] hover:bg-[#e6f3ff] rounded-full py-6 !px-8 text-base"
                        >
                          <ArrowLeft className="mr-1 h-5 w-5" />
                          Return to Home
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style jsx global>{`
              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .animate-spin-slow {
                animation: spin-slow 15s linear infinite;
              }
            `}</style>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
