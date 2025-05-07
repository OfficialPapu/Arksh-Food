"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, ChevronDown, ChevronRight, Star, X, Menu, User2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux"

// Constants
const CATEGORIES = [
  { id: "biscuit", name: "Biscuits", icon: <Star className="h-5 w-5" />, color: "#f9d5a7", description: "Crunchy delights" },
  { id: "coffee", name: "Coffee", icon: <Star className="h-5 w-5" />, color: "#c8b6a6", description: "Premium brews" },
  { id: "chocolate", name: "Chocolate", icon: <Star className="h-5 w-5" />, color: "#a47551", description: "Sweet indulgence" },
  { id: "pastry", name: "Pastry", icon: <Star className="h-5 w-5" />, color: "#f5e6ca", description: "Freshly baked" },
]

const FEATURED_ITEMS = [
  {
    title: "Premium Biscuits",
    description: "Handcrafted with premium ingredients",
    price: "$12.99",
    image: "/placeholder.svg?height=200&width=200",
    href: "/biscuit/premium",
    badge: "Best Seller",
    discount: "15% OFF",
  },
  {
    title: "Arabica Coffee",
    description: "Sourced from the finest farms",
    price: "$18.99",
    image: "/placeholder.svg?height=200&width=200",
    href: "/coffee/arabica",
    badge: "New",
  },
  {
    title: "Dark Chocolate",
    description: "Rich and intense flavor",
    price: "$9.99",
    image: "/placeholder.svg?height=200&width=200",
    href: "/chocolate/dark",
    badge: "Popular",
    discount: "Buy 2 Get 1",
  },
]

const RECENT_SEARCHES = ["Premium Chocolate", "Organic Coffee", "Gift Box", "Assorted Cookies"]
const QUICK_LINKS = [
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Special Offers", href: "/special-offers" },
  { name: "Seasonal Favorites", href: "/seasonal" },
]

// Memoized Components
const CategoryButton = memo(({ active, onClick, children, icon, color, description }) => {
  const controls = useAnimation()

  useEffect(() => {
    if (active) {
      controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.5 } })
    }
  }, [active, controls])

  return (
    <motion.button
      animate={controls}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-3",
        active
          ? "bg-gradient-to-r from-[#0056b3]/90 to-[#0077cc] text-white shadow-md"
          : "text-gray-700 hover:bg-gray-50 hover:text-[#0056b3]",
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full text-lg shadow-sm transition-all duration-300",
          active ? "bg-white/20 text-white" : `text-[#0056b3]`,
        )}
        style={{
          background: active
            ? "rgba(255, 255, 255, 0.2)"
            : `linear-gradient(135deg, ${color}40, ${color}90)`,
        }}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-semibold">{children}</span>
        <span className="text-xs opacity-80 font-normal">{description}</span>
      </div>
      {active && (
        <motion.div className="ml-auto" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      )}
    </motion.button>
  )
})

const FeaturedItem = memo(({ title, image, href, badge, description, price, discount }) => (
  <motion.div whileHover={{ y: -5 }} className="group">
    <Link href={href} className="block">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 group-hover:ring-2 ring-[#39b9ef] transition-all duration-300 shadow-sm group-hover:shadow-lg">
        <Image src={image} alt={title} width={200} height={200} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {badge && <div className="absolute top-2 left-2 bg-[#0056b3] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">{badge}</div>}
        {discount && <div className="absolute top-2 right-2 bg-[#e53e3e] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">{discount}</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white font-medium text-sm">View Details</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/90 text-xs">{description}</span>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-white text-[#0056b3] rounded-full p-1.5 shadow-md">
              <ShoppingBag className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#0056b3] transition-colors">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <span className="text-sm font-semibold text-[#0056b3]">{price}</span>
      </div>
    </Link>
  </motion.div>
))

const QuickLink = memo(({ href, children }) => (
  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#0056b3] hover:bg-[#f0f7ff] rounded-xl transition-all duration-200">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#e6f4ff] to-[#cce7ff] text-[#0056b3]">
        <Star className="h-4 w-4" />
      </span>
      <span className="font-medium">{children}</span>
    </Link>
  </motion.div>
))

const NavIconButton = memo(({ Icon, onClick, badgeCount }) => (
  <motion.div className="relative">
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClick} className="p-2 rounded-full relative transition-all duration-200 bg-white hover:bg-[#f0f7ff] shadow-sm hover:shadow-md">
      <Icon className="h-5 w-5 text-[#0056b3]" />
      {badgeCount > 0 && (
        <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: 1, transition: { scale: { repeat: Infinity, repeatType: "reverse", duration: 1.5 }, opacity: { duration: 0.2 } } }} className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#e53e3e] text-white text-xs rounded-full shadow-sm">
          {badgeCount}
        </motion.span>
      )}
    </motion.button>
  </motion.div>
))

export default function Navbar() {
  const router = useRouter()
  const CartItemCount = useSelector(state => state.Cart?.CartItems?.length) || 0
  const isAuth = useSelector(state => state.Login?.isAuth)

  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchInputRef = useRef(null)

  // close menu on outside click
  const handleClickOutside = useCallback(event => {
    if (isOpen && !event.target.closest('.navbar-container')) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  // focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus()
  }, [isSearchOpen])

  // scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // handle search submit and redirect
  const onSearchSubmit = useCallback(e => {
    e.preventDefault()
    const q = searchInputRef.current.value.trim()
    setIsSearchOpen(false)
    if (q) router.push(`/search-results?q=${encodeURIComponent(q)}`)
  }, [router])

  const toggleMenu = useCallback(() => setIsOpen(v => !v), [])
  const toggleSearch = useCallback(() => setIsSearchOpen(v => !v), [])

  // framer variants
  const containerVariants = { hidden: { opacity: 0, height: 0 }, visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, staggerChildren: 0.05 } }, exit: { opacity: 0, height: 0, transition: { duration: 0.3, when: 'afterChildren' } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } }

  return (
    <div className="navbar-container mb-18">
      <header className={cn('fixed top-0 left-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-white shadow-sm py-2')}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }} className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-1">
              <Image src="/Arksh Food.png" alt="ARKSH Logo" fill className="object-contain" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-md text-[#0056b3] hidden sm:block group-hover:text-[#39b9ef] transition-colors duration-300">ARKSH FOOD</span>
              <span className="text-xs text-gray-500 hidden sm:block">Delicious Delights</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <NavIconButton Icon={Search} onClick={toggleSearch} />
            <Link href={isAuth ? "/account" : "/auth/login"} passHref>
              <NavIconButton Icon={User2} />
            </Link>
            <Link href="/account/cart" passHref>
              <NavIconButton Icon={ShoppingBag} badgeCount={CartItemCount} />
            </Link>
            <motion.button onClick={toggleMenu} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-1 py-2 px-3 rounded-full bg-gradient-to-r from-[#0056b3] to-[#0077cc] text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Menu className={`${!isOpen ? 'block' : 'hidden'} sm:hidden h-5 w-5`} />
              <X className={`${isOpen ? 'block' : 'hidden'} sm:hidden h-5 w-5`} />
              <span className="hidden sm:inline font-medium">Menu</span>
              <ChevronDown className={cn('hidden sm:block h-4 w-4 transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0')} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="pb-16 fixed top-16 left-0 w-full bg-white shadow-lg z-40 overflow-hidden border-t">
            <div className="container mx-auto px-4 py-6 grid md:grid-cols-12 gap-8">
              <motion.div variants={itemVariants} className="md:col-span-3">
                <h3 className="font-semibold text-[#0056b3] !mb-4">Categories</h3>
                <nav className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <CategoryButton key={cat.id} active={activeCategory===cat.id} onClick={()=>setActiveCategory(cat.id)} icon={cat.icon} color={cat.color} description={cat.description}>{cat.name}</CategoryButton>
                  ))}
                </nav>
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-6 border-l border-r px-6">
                <h3 className="font-semibold text-[#0056b3] !mb-4">Featured Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {FEATURED_ITEMS.map((it,i)=><FeaturedItem key={i} {...it}/>)}
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-3">
                <h3 className="font-semibold text-[#0056b3] !mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  {QUICK_LINKS.map(link=><QuickLink key={link.href} href={link.href}>{link.name}</QuickLink>)}
                </nav>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setIsOpen(false)} className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" style={{top:'64px'}} />}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20 px-4" onClick={()=>setIsSearchOpen(false)}>
            <motion.div initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-50,opacity:0}} className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-xl" onClick={e=>e.stopPropagation()}>
              <form onSubmit={onSearchSubmit} className="relative">
                <input ref={searchInputRef} type="text" placeholder="Search for products..." className="w-full px-6 py-4 pr-14 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#0056b3]/50 transition-all duration-300" />
                <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-gray-500 hover:text-[#0056b3] hover:bg-gray-100 transition-all duration-200">
                  <Search className="h-6 w-6" />
                </button>
              </form>
              <div className="pt-4">
                <h4 className="text-lg font-medium text-[#0056b3] !mb-4">Popular Searches</h4>
                <ul className="space-y-2">
                  {RECENT_SEARCHES.map((term,i)=>(
                    <li key={i} className="flex items-center justify-between bg-gray-50 hover:bg-[#f0f7ff] rounded-lg px-3 py-2 transition-colors duration-200">
                      <button onClick={()=>{searchInputRef.current.value=term;onSearchSubmit({preventDefault:()=>{}})}} className="flex items-center text-gray-700 hover:text-[#0056b3]">
                        <Search className="h-4 w-4 mr-2 text-gray-400" />{term}
                      </button>
                      <button className="p-1 hover:rotate-90 transition-transform"><X className="h-4 w-4 text-gray-400 hover:text-gray-600" /></button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
