"use client"
import axios from "@/lib/axios"
import { useState, useEffect } from "react"
import { Search, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/Components/ui/ProductCard"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

export default function SearchResults() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ""; 
  const [searchQuery, setSearchQuery] = useState(query || "")
  const [sortOption, setSortOption] = useState("relevance")
  const [showSortOptions, setShowSortOptions] = useState(false)

  useEffect(() => {
    async function getResults() {
      try {
        const res = await axios.get("api/search-results", { params: { query: searchQuery } })
        setProducts(res.data)
      } catch {
        setProducts([])
      }
    }
    getResults()
  }, [searchQuery])

  useEffect(() => {
    let result = [...products]
    if (sortOption === "price-low") {
      result.sort((a, b) => a.Price - b.Price)
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.Price - a.Price)
    }
    setFilteredProducts(result)
  }, [products, sortOption])

  const handleSortChange = (option) => {
    setSortOption(option)
    setShowSortOptions(false)
  }

  const getSortLabel = () => {
    if (sortOption === "price-low") return "Price: Low to High"
    if (sortOption === "price-high") return "Price: High to Low"
    return "Relevance"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Search Banner */}
      <div className="bg-gradient-to-r from-[#0A4D9C]/5 to-[#30B4E7]/5 py-10">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-[#0A4D9C] mb-2">Search Results</h1>
          <p className="text-gray-600 mb-6">Find your perfect products from our premium collection</p>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-0 py-6 pl-6 pr-12 bg-white shadow-md focus:ring-2 focus:ring-[#0A4D9C]/20"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A4D9C] text-white p-2.5 rounded-full hover:bg-[#30B4E7]">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#0A4D9C]">
            {searchQuery ? `Results for “${searchQuery}”` : "Products"} ({filteredProducts.length})
          </h2>
          <div className="relative">
            <Button
              id="sort-button"
              variant="outline"
              className="gap-2"
              onClick={() => setShowSortOptions((v) => !v)}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">Sort: {getSortLabel()}</span>
              {showSortOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <AnimatePresence>
              {showSortOptions && (
                <motion.div
                  id="sort-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border z-10"
                >
                  {[
                    { value: "relevance", label: "Relevance" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      className={`w-full text-left px-4 py-2 text-sm${
                        sortOption === opt.value
                          ? "bg-[#0A4D9C]/10 text-[#0A4D9C] font-medium"
                          : "text-gray-700 hover:bg-gray-100 rounded-lg"
                      }`}
                      onClick={() => handleSortChange(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0A4D9C]/10 mb-6">
              <Search className="h-8 w-8 text-[#0A4D9C]" />
            </div>
            <h3 className="text-xl font-bold text-[#0A4D9C] mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching your search. Try another term or clear your search.
            </p>
            <Button onClick={() => setSearchQuery("")} className="bg-[#0A4D9C] hover:bg-[#0A4D9C]/90 text-white">
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} Product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
