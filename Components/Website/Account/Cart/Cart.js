"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
import { cn } from "@/lib/utils"
import { Minus, Plus, ShoppingBag, X, CreditCard, Shield, TagIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import Link from "next/link"
import useCartActions from "../../../Hooks/Cart"

export default function Cart() {
    const { HandelUpdateQuantity, HandelRemoveFromCart, CartItems, HandelCheckout, PickupOptions, handlePickupOptionChange, selectedPickupOption, PickupCost, Subtotal, Discount, Total } = useCartActions();

    if (CartItems.length === 0) {
        return (
            <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
                <div className="sm:max-w-6xl mx-auto sm:p-6 py-6 px-3">
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:px-0 px-6">
                            <Button className="bg-[#0055a4] hover:bg-[#003d7a] rounded-full px-8 py-6 text-base font-medium">
                                Browse Our Menu
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-6 text-base font-medium border-[#0055a4] text-[#0055a4]"
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
                        <span className="font-medium">{CartItems.length} items</span>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-5 lg:p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-[#0055a4]">Your Order</h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {CartItems.map((item) => {
                                    return (
                                        <div key={item.CartItemID} className="p-5 lg:p-6 hover:bg-blue-50/30 transition-colors">
                                            <div className="flex gap-4">
                                                <div className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0">
                                                    <Image src={item.Image || "/Media/Images/Logo/placeholder.svg"} alt={item.Name} fill className="object-cover" />
                                                    {item.Discount && (
                                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-md">
                                                            {item.Discount}% OFF
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                                                        <div>
                                                            <h3 className="mb-1 !text-sm font-medium text-gray-900 sm:mb-2 !sm:text-base hover:text-[#0055a4] line-clamp-2">
                                                                {item.Name}
                                                            </h3>
                                                            <div className="flex items-center mt-1 lg:mt-2">
                                                                {item.Discount ? (
                                                                    <>
                                                                        <span className="text-red-500 font-medium">Rs. {item.PriceAfterDiscount.toFixed(2)}</span>
                                                                        <span className="text-gray-400 line-through text-sm ml-2">Rs. {item.Price.toFixed(2)}</span>
                                                                        {item.Discount > 0 && (
                                                                            <span className="ml-2 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                                                Save {item.Discount}%
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-700 font-medium">Rs. {item.Price.toFixed(2)}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center mt-3 lg:mt-0">
                                                            <button
                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                                onClick={() => HandelRemoveFromCart(item.ProductID, item.CartItemID)}
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
                                                                onClick={() => HandelUpdateQuantity(item.ProductID, item.Quantity - 1, item.CartItemID)}
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <Minus className="h-3.5 w-3.5" />
                                                            </button>
                                                            <span className="w-8 text-center font-medium text-gray-800">{item.Quantity}</span>
                                                            <button
                                                                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0055a4] hover:bg-blue-100 transition-colors"
                                                                onClick={() => HandelUpdateQuantity(item.ProductID, item.Quantity + 1, item.CartItemID)}
                                                                aria-label="Increase quantity"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                        <div className="font-semibold text-[#0055a4]">
                                                            Rs. {Total.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-6">
                            <div className="p-5 lg:p-6 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-[#0055a4]">Delivery Options</h2>
                            </div>
                            <div className="bg-white rounded-2xl px-5 lg:px-6 py-2">
                                <div className="grid gap-4">

                                    {PickupOptions.map((option) => {
                                        return (
                                            <DeliveryOptionCard
                                                key={option.ID}
                                                id={option.ID}
                                                title={option.Name}
                                                description={option.Description}
                                                price={option.Price}
                                                icon={option.Icon}
                                                selected={selectedPickupOption === option.Value}
                                                onClick={() => handlePickupOptionChange(option.Value)}
                                            />
                                        )
                                    }

                                    )}
                                </div>
                            </div>
                            <div className="p-5 lg:p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>Rs. {Subtotal.toFixed(2)}</span>
                                    </div>


                                    {Discount ? (
                                        <div className="flex justify-between py-1">
                                            <span className="flex items-center gap-1 text-green-600">
                                                <TagIcon className="h-4 w-4" />
                                                Discount
                                            </span>
                                            <span className="text-green-600 font-medium">- Rs. {Discount.toFixed(2)}</span>
                                        </div>
                                    ) : null}

                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span>{PickupCost === 0 ? "Free" : `Rs. ${PickupCost.toFixed(2)}`}</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span className="text-[#0055a4]">Rs. {Total.toFixed(2)}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 text-right">Including all taxes</div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-[#0055a4] hover:bg-[#003d7a] rounded-lg py-3 cursor-pointer h-auto text-base font-medium transition-all hover:shadow-md"
                                    onClick={HandelCheckout}
                                >
                                    Proceed to Checkout
                                </Button>

                                <div className="mt-6 space-y-3">
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

function DeliveryOptionCard({ title, description, price, icon, selected, onClick }) {
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
                        <p className="font-medium">{title}</p>
                        <span className={cn("font-medium transition-colors", selected ? "text-[#0055a4]" : "text-gray-700")}>
                            {price === 0 ? "Free" : `Rs. ${price}`}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                </div>
            </div>
        </div>
    )
}