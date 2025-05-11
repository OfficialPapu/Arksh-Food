"use client"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { ChevronDown, ChevronRight, Home, ArrowUpDown, Star, Check } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import axios from "@/lib/axios"
import { ProductCard } from "@/Components/ui/ProductCard"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const CategoryPage = () => {
  const { Slug } = useParams()
  const [Products, setProducts] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [sortOption, setSortOption] = useState("relevance")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const sortRef = useRef(null)

  useEffect(() => {
    if (Array.isArray(Products?.Products)) {
      const result = [...Products?.Products]
      if (sortOption === "price-low") {
        result.sort((a, b) => a.Price - b.Price)
      } else if (sortOption === "price-high") {
        result.sort((a, b) => b.Price - a.Price)
      }
      setFilteredProducts(result)
    }
  }, [Products, sortOption])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSortChange = (option) => {
    setSortOption(option)
    setShowSortOptions(false)
  }

  const getSortLabel = () => {
    if (sortOption === "price-low") return "Price: Low to High"
    if (sortOption === "price-high") return "Price: High to Low"
    return "Relevance"
  }

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ]

  const FetchCategoryDetails = async () => {
    try {
      const response = await axios.get(`api/categories/${Slug}`)
      setProducts(response.data)
      setFilteredProducts(response.data.Products)
    } catch (error) { }
  }

  useEffect(() => {
    FetchCategoryDetails()
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto pb-8 px-4 md:px-6">
        <Card className="mb-8 border-none shadow-lg animate-in slide-in-from-top duration-300 bg-white">
          <div className="bg-gradient-to-r from-[#0055a4] via-[#0066c2] to-[#0077e6] h-28 relative rounded-[0.25rem_0.25rem_0_0]">
            <div className="py-6 px-6">
              <Breadcrumb className="animate-in fade-in duration-300">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="flex items-center text-white/90 hover:text-white transition-colors"
                    >
                      <Home className="h-3.5 w-3.5 mr-1.5" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5 text-white/50" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/categories" className="text-white/90 hover:text-white transition-colors">
                      Category
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5 text-white/50" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-white capitalize">{Slug}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fillOpacity="0.2" fillRule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>
            <div className="absolute -bottom-14 left-6 w-28 h-28 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src={Products?.Image ? process.env.NEXT_PUBLIC_IMAGE_URL + Products?.Image : "/Arksh Food.png"}
                  alt={`${Products?.Category || "Category"} image`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
          <CardContent className="pt-18 pb-6 px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">{Slug}</h2>
                  <Badge className="bg-[#0055a4]/10 text-[#0055a4] hover:bg-[#0055a4]/20 border-none">
                    <Star className="h-3 w-3 mr-1.5 fill-[#0055a4] text-[#0055a4]" />
                    Popular
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mt-2 max-w-xl leading-relaxed line-clamp-2">
                  {Products?.Description}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <div className="relative w-full md:w-auto" ref={sortRef}>
                  <Button
                    id="sort-button"
                    onClick={() => setShowSortOptions((v) => !v)}
                    aria-expanded={showSortOptions}
                    aria-haspopup="true"
                    className="w-full md:w-auto bg-white hover:bg-gray-50 hover:border-[#0055a4]/30 text-gray-700 shadow-sm rounded-full px-4 py-2.5 h-auto transition-all"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-3.5 w-3.5 text-[#0055a4]" />
                        <span className="font-medium">{getSortLabel()}</span>
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 ml-2 text-gray-400 transition-transform duration-200 ${showSortOptions ? "rotate-180" : ""}`}
                      />
                    </div>
                  </Button>

                  <AnimatePresence>
                    {showSortOptions && (
                      <motion.div
                        id="sort-dropdown"
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-full md:w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden"
                      >
                        <div className="p-2">
                          {sortOptions.map((opt) => (
                            <button
                              key={opt.value}
                              className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-colors duration-150 ${sortOption === opt.value
                                ? "bg-[#0055a4]/10 text-[#0055a4] font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                                }`}
                              onClick={() => handleSortChange(opt.value)}
                            >
                              <span>{opt.label}</span>
                              {sortOption === opt.value && <Check className="h-4 w-4 text-[#0055a4]" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredProducts ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts?.map((Product) => (
                <ProductCard key={Product._id} Product={Product} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Card className="border-none shadow-md p-12 text-center bg-white animate-in fade-in duration-500">
              <div className="w-28 h-28 bg-gradient-to-br from-[#0055a4]/10 to-[#39a9db]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[#0055a4]/10 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-[#0055a4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                We couldn't find any products matching your criteria. Try adjusting your filters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#0055a4] hover:bg-[#003d7a] text-white rounded-full px-8 py-6 shadow-sm hover:shadow transition-all">
                  Clear Filters
                </Button>
                <Link href={"/search-results"}>
                  <Button
                    variant="outline"
                    className="border-[#0055a4] text-[#0055a4] hover:bg-[#0055a4]/10 rounded-full px-8 py-6 transition-all"
                  >
                    Search Product
                  </Button>
                </Link>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
