"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, ChevronDown, Star, X, Menu, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

// Constants
const CATEGORIES = [
  { id: "biscuit", name: "Biscuit" },
  { id: "coffee", name: "Coffee" },
  { id: "chocolate", name: "Chocolate" }
]

const FEATURED_ITEMS = [
  { title: "Premium Biscuits", image: "/placeholder.svg?height=100&width=100", href: "/biscuit/premium" },
  { title: "Arabica Coffee", image: "/placeholder.svg?height=100&width=100", href: "/coffee/arabica" },
  { title: "Dark Chocolate", image: "/placeholder.svg?height=100&width=100", href: "/chocolate/dark" }
]

const POPULAR_SEARCHES = ["Milk Biscuits", "Coffee", "Chocolate", "Danish Cookies"]
const RECENT_SEARCHES = ["Premium Chocolate", "Organic Coffee", "Gift Box"]
const QUICK_LINKS = [
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Special Offers", href: "/special-offers" }
]

// Memoized Components
const CategoryButton = memo(({ active, onClick, children }) => (
  <button
    className={cn(
      "w-full text-left px-4 py-2 rounded-lg transition-colors font-medium",
      active ? "bg-[#0056b3] text-white" : "text-gray-700 hover:bg-gray-100 hover:text-[#0056b3]"
    )}
    onClick={onClick}
  >
    {children}
  </button>
))

const FeaturedItem = memo(({ title, image, href }) => (
  <Link href={href} className="group">
    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 group-hover:ring-2 ring-[#39b9ef] transition-all">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
    </div>
    <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#0056b3] transition-colors">{title}</h4>
  </Link>
))

const QuickLink = memo(({ href, children }) => (
  <Link
    href={href}
    className="block px-4 py-2 text-gray-700 hover:text-[#0056b3] hover:bg-gray-50 rounded-lg transition-colors"
  >
    {children}
  </Link>
))

const NavIconButton = memo(({ Icon, onClick, badgeCount, className }) => (
  <button
    onClick={onClick}
    className={cn("p-2 rounded-full hover:bg-gray-100 relative", className)}
  >
    <Icon className="h-5 w-5 text-[#0056b3]" />
    {badgeCount !== undefined && (
      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#39b9ef] text-white text-xs rounded-full">
        {badgeCount}
      </span>
    )}
  </button>
))

export default function Navbar() {
  const isAuth = useSelector((state) => state.Login.isAuth);
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

  const handleClickOutside = useCallback((event) => {
    if (isOpen && !event.target.closest(".navbar-container")) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Handle search submit
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault()
    console.log("Search query:", searchInputRef.current?.value)
    setIsSearchOpen(false)
  }, [])

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])
  const toggleSearch = useCallback(() => setIsSearchOpen(prev => !prev), [])

  return (
    <div className="navbar-container mb-18">
      {/* Main Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image src="/Arksh Food.png" alt="ARKSH Logo" fill className="object-contain" />
              </div>
              <span className="font-bold sm:text-xl text-md text-[#0056b3] hidden sm:block">ARKSH FOOD</span>
            </Link>

            <div className="flex items-center space-x-2">
              <NavIconButton
                Icon={Search}
                onClick={toggleSearch}
                className="md:hidden cursor-pointer"
              />
              <NavIconButton
                Icon={Search}
                onClick={toggleSearch}
                className="hidden md:flex cursor-pointer"
              />
              <Link href={isAuth ? "/account" : "/auth/login"} passHref>
                <NavIconButton Icon={User2} className="cursor-pointer" />
              </Link>
              <Link href="/account/cart" passHref className="rounded-full hover:bg-gray-100 relative">
                <NavIconButton Icon={ShoppingBag} className="cursor-pointer" />
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#39b9ef] text-white text-xs rounded-full">
                  3
                </span>
              </Link>

              <button
                className="cursor-pointer flex items-center justify-center space-x-1 py-2 px-3 sm:px-4 rounded-full bg-[#0056b3] text-white hover:bg-[#0056b3]/90 transition-colors"
                onClick={toggleMenu}
              >
                <Menu className={`${!isOpen ? "block" : "hidden"} sm:hidden h-5 w-5 pl-1`} />
                <X className={`${isOpen ? "block" : "hidden"} sm:hidden h-5 w-5 pl-1`} />
                <span className="hidden sm:inline font-medium">Menu</span>
                <ChevronDown className={cn("hidden sm:block h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 overflow-scroll",
          isOpen ? "max-h-[80vh] border-t" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Categories */}
            <div className="md:col-span-3">
              <SectionTitle>Categories</SectionTitle>
              <nav className="space-y-1">
                {CATEGORIES.map((category) => (
                  <CategoryButton
                    key={category.id}
                    active={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </CategoryButton>
                ))}
              </nav>
            </div>

            {/* Featured Items */}
            <div className="md:col-span-6 border-l border-r px-6">
              <SectionTitle>Featured Products</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {FEATURED_ITEMS.map((item, index) => (
                  <FeaturedItem key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Search and Quick Links */}
            <div className="md:col-span-3">
              <SectionTitle>Search</SectionTitle>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 border-[#0056b3]/20 focus:border-[#39b9ef] focus:ring-[#39b9ef]"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>

              <SectionTitle>Quick Links</SectionTitle>
              <nav className="space-y-1">
                {QUICK_LINKS.map((link) => (
                  <QuickLink key={link.href} href={link.href}>
                    {link.name}
                  </QuickLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 pt-6 border-t text-center">
            <Button className="bg-[#0056b3] hover:bg-[#39b9ef] px-8">Shop All Products</Button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
          style={{ top: "64px" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchInputRef={searchInputRef}
        onSubmit={handleSearchSubmit}
      />
    </div>
  )
}

// Helper Components
const SectionTitle = ({ children }) => (
  <h3 className="font-semibold text-[#0056b3] mb-4 flex items-center">
    <Star className="h-4 w-4 mr-2 text-[#39b9ef]" />
    {children}
  </h3>
)

const SearchOverlay = memo(({ isOpen, onClose, searchInputRef, onSubmit }) => {
  const handleSearchTermClick = useCallback((term) => {
    if (searchInputRef.current) searchInputRef.current.value = term
    onSubmit({ preventDefault: () => { } })
  }, [onSubmit, searchInputRef])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={onSubmit} className="relative">
              <motion.input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 backdrop-blur-sm shadow-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3]/50 transition-all duration-300"
                initial={{ width: "80%", opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
              />
              <motion.button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0056b3] transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 10px rgba(0,86,179,0.4)`,
                  color: "#0056b3",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-6 w-6" />
              </motion.button>
            </form>

            <motion.div
              className="mt-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-[#39b9ef]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-medium text-[#0056b3] mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSearchTermClick(term)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 hover:text-[#0056b3] transition-all duration-200 border border-transparent hover:border-[#39b9ef]/30"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(0,86,179,0.1)",
                      boxShadow: "0 2px 8px rgba(0,86,179,0.2)",
                      color: "#0056b3",
                    }}
                    whileTap={{ scale: 0.95 }}
                    custom={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  >
                    {term}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#39b9ef]/20">
                <h4 className="text-sm font-medium text-[#39b9ef] mb-3">Recent Searches</h4>
                <ul className="space-y-2">
                  {RECENT_SEARCHES.map((term, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center justify-between"
                      custom={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <motion.button
                        onClick={() => handleSearchTermClick(term)}
                        className="text-gray-700 hover:text-[#0056b3] flex items-center"
                        whileHover={{ x: 5, color: "#0056b3" }}
                      >
                        <Search className="h-4 w-4 mr-2 text-gray-400" />
                        {term}
                      </motion.button>
                      <motion.button
                        className="text-gray-400 hover:text-gray-600 p-1"
                        whileHover={{ rotate: 90, color: "#0056b3" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})