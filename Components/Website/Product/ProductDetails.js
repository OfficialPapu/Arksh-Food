"use client"
import React from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCarousel from "@/Components/Website/Product/ProductCarousel"
import ActionSection from "@/Components/Website/Product/ActionSection"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb"
import UseProductDetails from "./UseProductDetails"
import ReviewTab from "./ReviewTab"
const ProductDetails = () => {
    const { descriptionContent, ingredientsContent, howToUseContent, BreadcrumbItems } = UseProductDetails();
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 sm:px-24 px-2 ProductPage">
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
                            {index < BreadcrumbItems.length - 1 && <BreadcrumbSeparator />}
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
                                        {tab === "description" ? "Description" : tab === "ingredients" ? "Ingredients" : "Review"}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="description" className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0">
                                <div dangerouslySetInnerHTML={{ __html: descriptionContent }}></div>
                            </TabsContent>

                            <TabsContent value="ingredients" className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0">
                                <div dangerouslySetInnerHTML={{ __html: ingredientsContent }}></div>
                            </TabsContent>

                            <TabsContent value="Review" className="p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-0">
                                <ReviewTab />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductDetails
