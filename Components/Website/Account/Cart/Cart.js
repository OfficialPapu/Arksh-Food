"use client"

import React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
    Minus,
    Plus,
    ShoppingBag,
    MapPin,
    Store,
    Truck,
    Tag,
    X,
    ChevronRight,
    Clock,
    CreditCard,
    Shield,
    ArrowLeft,
    Heart,
    Check,
    Info,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import Link from "next/link"
// Sample cart items with discount feature
const initialCartItems = [
    {
        id: 1,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
        price: 350,
        discountPercentage: 10, // 10% discount
        quantity: 1,
        image: "/placeholder.svg?height=140&width=140",
        bestSeller: true,
    },
    {
        id: 2,
        name: "Vegetable Momo",
        description: "Steamed dumplings filled with mixed vegetables and herbs",
        price: 180,
        discountPercentage: 0, // no discount
        quantity: 2,
        image: "/placeholder.svg?height=140&width=140",
        bestSeller: false,
    },
    {
        id: 3,
        name: "Butter Naan",
        description: "Soft flatbread brushed with melted butter",
        price: 80,
        discountPercentage: 15, // 15% discount
        quantity: 3,
        image: "/placeholder.svg?height=140&width=140",
        bestSeller: false,
    },
]


export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [deliveryOption, setDeliveryOption] = useState("store-pickup")
    const [couponCode, setCouponCode] = useState("")
    const [couponApplied, setCouponApplied] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }

        // Set initial value
        handleResize()

        // Add event listener
        window.addEventListener("resize", handleResize)

        // Clean up
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

        if (existingItem) {
            updateQuantity(item.id, existingItem.quantity + 1)
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1, description: "", bestSeller: false }])
        }
    }

    const getDeliveryCharge = () => {
        switch (deliveryOption) {
            case "inside-valley":
                return 100
            case "outside-valley":
                return 200
            case "store-pickup":
                return 0
            default:
                return 0
        }
    }

    const getDiscountedPrice = (price, discountPercentage) => {
        if (!discountPercentage) return price
        return price - (price * discountPercentage) / 100
    }

    const calculateItemTotal = (item) => {
        const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)
        return discountedPrice * item.quantity
    }

    const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
    const deliveryCharge = getDeliveryCharge()

    // Apply additional 5% discount if coupon is applied
    const couponDiscount = couponApplied ? subtotal * 0.05 : 0
    const total = subtotal + deliveryCharge - couponDiscount

    const applyCoupon = () => {
        if (couponCode.toLowerCase() === "arksh5") {
            setCouponApplied(true)
        }
    }

    const removeCoupon = () => {
        setCouponCode("")
        setCouponApplied(false)
    }

    if (cartItems.length === 0) {
        return (
            <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
                <div className="max-w-6xl mx-auto p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-[#0055a4]">Your Cart</h1>
                    </div>

                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="bg-blue-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-14 w-14 text-[#0055a4]" />
                        </div>
                        <h2 className="text-3xl font-medium text-[#0055a4] mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                            Looks like you haven't added any delicious items to your cart yet.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-[#0055a4] hover:bg-[#003d7a] rounded-full px-8 py-6 h-auto text-base font-medium">
                                Browse Our Menu
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-6 h-auto text-base font-medium border-[#0055a4] text-[#0055a4]"
                            >
                                View Special Offers
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
            <div className="mx-auto p-4 lg:p-6">
                <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-10">
                    <Breadcrumb>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[#0055a4]">Your Cart</h1>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link href="/account">Account</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Cart</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm mt-4 lg:mt-0">
                        <ShoppingBag className="h-5 w-5 text-[#0055a4]" />
                        <span className="font-medium">{cartItems.length} items</span>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Main cart content - 8 columns on desktop */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-5 lg:p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-[#0055a4]">Your Order</h2>
                                <span className="text-sm text-gray-500">
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                                </span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {cartItems.map((item) => {
                                    const hasDiscount = item.discountPercentage > 0
                                    const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)

                                    return (
                                        <div key={item.id} className="p-5 lg:p-6 hover:bg-blue-50/30 transition-colors">
                                            <div className="flex gap-4">
                                                <div className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0">
                                                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                                    {hasDiscount && (
                                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-md">
                                                            {item.discountPercentage}% OFF
                                                        </div>
                                                    )}
                                                    {item.bestSeller && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-amber-500 text-white text-xs font-bold py-0.5 text-center">
                                                            BEST SELLER
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                                                {item.bestSeller && (
                                                                    <span className="ml-2 hidden lg:inline-flex items-center bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                                        <Check className="h-3 w-3 mr-0.5" /> Popular
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {item.description && (
                                                                <p className="text-sm text-gray-500 mt-1 hidden lg:block">{item.description}</p>
                                                            )}
                                                            <div className="flex items-center mt-1 lg:mt-2">
                                                                {hasDiscount ? (
                                                                    <>
                                                                        <span className="text-red-500 font-medium">Rs. {discountedPrice.toFixed(0)}</span>
                                                                        <span className="text-gray-400 line-through text-sm ml-2">Rs. {item.price}</span>
                                                                        <span className="ml-2 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                                            Save {item.discountPercentage}%
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-700 font-medium">Rs. {item.price}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center mt-3 lg:mt-0">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 text-gray-500 hover:text-[#0055a4] hover:bg-blue-50 p-0 mr-4"
                                                            >
                                                                <Heart className="h-4 w-4 mr-1" />
                                                                <span className="hidden lg:inline">Save</span>
                                                            </Button>
                                                            <button
                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                                onClick={() => removeItem(item.id)}
                                                                aria-label="Remove item"
                                                            >
                                                                <X className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center bg-gray-100 rounded-full">
                                                            <button
                                                                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0055a4] hover:bg-blue-100 transition-colors"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <Minus className="h-3.5 w-3.5" />
                                                            </button>
                                                            <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                                                            <button
                                                                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0055a4] hover:bg-blue-100 transition-colors"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                aria-label="Increase quantity"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                        <div className="font-semibold text-[#0055a4]">
                                                            Rs. {calculateItemTotal(item).toFixed(0)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        {/* Delivery options */}
                        <div className="bg-white rounded-2xl shadow-sm p-5 lg:p-6">
                            <h2 className="text-xl font-semibold text-[#0055a4] mb-4">Delivery Options</h2>
                            <div className="grid gap-4">
                                <DeliveryOptionCard
                                    id="inside-valley"
                                    title="Inside Valley Delivery"
                                    description="Delivery within Kathmandu Valley"
                                    price={100}
                                    icon={<MapPin className="h-5 w-5" />}
                                    selected={deliveryOption === "inside-valley"}
                                    onClick={() => setDeliveryOption("inside-valley")}
                                    estimatedTime="30-45 min"
                                    isDesktop={isDesktop}
                                />

                                <DeliveryOptionCard
                                    id="outside-valley"
                                    title="Outside Valley Delivery"
                                    description="Delivery to areas outside Kathmandu Valley"
                                    price={200}
                                    icon={<Truck className="h-5 w-5" />}
                                    selected={deliveryOption === "outside-valley"}
                                    onClick={() => setDeliveryOption("outside-valley")}
                                    estimatedTime="60-90 min"
                                    isDesktop={isDesktop}
                                />

                                <DeliveryOptionCard
                                    id="store-pickup"
                                    title="Store Pickup"
                                    description="Pick up your order from our store"
                                    price={0}
                                    icon={<Store className="h-5 w-5" />}
                                    selected={deliveryOption === "store-pickup"}
                                    onClick={() => setDeliveryOption("store-pickup")}
                                    estimatedTime="15-20 min"
                                    isDesktop={isDesktop}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order summary - 4 columns on desktop */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-6">
                            <div className="p-5 lg:p-6 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-[#0055a4]">Order Summary</h2>
                            </div>

                            <div className="p-5 lg:p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>Rs. {subtotal.toFixed(0)}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="flex items-center underline decoration-dotted underline-offset-4">
                                                    <span>Delivery</span>
                                                    <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs max-w-xs">
                                                        Delivery charges are based on your selected delivery option. Free delivery on orders above
                                                        Rs. 1000.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <span>{deliveryCharge === 0 ? "Free" : `Rs. ${deliveryCharge}`}</span>
                                    </div>

                                    {couponApplied && (
                                        <div className="flex justify-between text-green-600">
                                            <div className="flex items-center">
                                                <Tag className="h-4 w-4 mr-1.5" />
                                                <span>Coupon Discount (5%)</span>
                                            </div>
                                            <span>- Rs. {couponDiscount.toFixed(0)}</span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span className="text-[#0055a4]">Rs. {total.toFixed(0)}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 text-right">Including all taxes</div>
                                    </div>
                                </div>

                                {!couponApplied ? (
                                    <div className="mb-6">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Have a coupon code?</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter coupon code"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent"
                                            />
                                            <Button onClick={applyCoupon} className="bg-[#0055a4] hover:bg-[#003d7a]" disabled={!couponCode}>
                                                Apply
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Try "ARKSH5" for 5% off</p>
                                    </div>
                                ) : (
                                    <div className="mb-6 bg-green-50 p-3 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Tag className="h-4 w-4 text-green-600 mr-2" />
                                            <div>
                                                <p className="text-sm font-medium text-green-800">Coupon Applied!</p>
                                                <p className="text-xs text-green-600">ARKSH5 (5% discount)</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={removeCoupon}
                                            className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}

                                <Button className="w-full bg-[#0055a4] hover:bg-[#003d7a] rounded-lg py-3 cursor-pointer h-auto text-base font-medium transition-all hover:shadow-md">
                                    Proceed to Checkout
                                </Button>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>
                                            Estimated delivery:{" "}
                                            {deliveryOption === "store-pickup"
                                                ? "15-20 min for pickup"
                                                : deliveryOption === "inside-valley"
                                                    ? "30-45 min"
                                                    : "60-90 min"}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>We accept all major credit cards</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Shield className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>Secure payment processing</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function DeliveryOptionCard({
    id,
    title,
    description,
    price,
    icon,
    selected,
    onClick,
    estimatedTime,
    isDesktop,
}) {
    return (
        <div
            className={cn(
                "border rounded-xl p-4 cursor-pointer transition-all",
                selected
                    ? "border-[#0055a4] bg-blue-50 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
            )}
            onClick={onClick}
        >
            <div className="flex items-start gap-3">
                <div
                    className={cn(
                        "rounded-full p-2.5 mt-1 transition-colors",
                        selected ? "bg-[#0055a4] text-white" : "bg-gray-100 text-gray-500",
                    )}
                >
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <h3 className="font-medium">{title}</h3>
                        <span className={cn("font-medium transition-colors", selected ? "text-[#0055a4]" : "text-gray-700")}>
                            {price === 0 ? "Free" : `Rs. ${price}`}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                    {estimatedTime && (
                        <div className="mt-2 text-xs inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                            {isDesktop ? `Estimated time: ${estimatedTime}` : estimatedTime}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

