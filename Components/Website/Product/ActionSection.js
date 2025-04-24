"use client"
import { useState } from "react"
import { Minus, Plus, Share2, ShoppingBag, ShoppingCart, Clock, Leaf, Award } from "lucide-react"
import { Button } from "@/Components/ui/button"
const ActionSection = () => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Premium Organic Quinoa Bowl",
                    text: "Check out this delicious Premium Organic Quinoa Bowl!",
                    url: window.location.href,
                })
                .catch((error) => console.log("Error sharing", error))
        } else {
            // Fallback for browsers that don't support the Web Share API
            const url = window.location.href
            navigator.clipboard.writeText(url).then(
                () => {
                    alert("Link copied to clipboard!")
                },
                (err) => {
                    console.error("Could not copy text: ", err)
                },
            )
        }
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    // Product benefits
    const productBenefits = [
        { icon: <Leaf className="h-5 w-5" />, text: "100% Organic" },
        { icon: <Award className="h-5 w-5" />, text: "High Protein" },
        { icon: <Clock className="h-5 w-5" />, text: "Ready in 5 mins" },
    ]

    const [quantity, setQuantity] = useState(1)
    return (
        <div>
            {/* Product Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#0055b8]"></div>
                        <span className="text-[#0055b8] text-sm font-medium uppercase tracking-wider">
                            Healthy Meal
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="h-10 w-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-300"
                        >
                            <Share2 className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Premium Organic Quinoa Bowl</h1>

                <p className="text-gray-600 leading-relaxed">
                    A perfect blend of organic quinoa, fresh vegetables, and our signature dressing. This
                    nutrient-packed meal combines the goodness of organic quinoa with fresh vegetables for a healthy,
                    delicious experience ready in minutes!
                </p>
            </div>

            {/* Price and Quantity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#0055b8]">$12.99</span>
                    <span className="text-lg text-gray-400 line-through">$15.99</span>
                    <span className="text-sm font-medium text-white bg-green-500 px-2 py-0.5 rounded">Save 20%</span>
                </div>

                <div className="mb-6">
                    <div className="flex items-center bg-white rounded-full border border-gray-200 p-1 w-fit">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0055b8] hover:bg-blue-50"
                            onClick={decrementQuantity}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-12 text-center font-medium text-gray-800">{quantity}</div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0055b8] hover:bg-blue-50"
                            onClick={incrementQuantity}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Benefits */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="h-1 w-4 bg-[#0055b8] rounded-full mr-2"></span>
                    Key Benefits
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {productBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-l-2 border-[#39b9e6]"
                        >
                            <div className="text-[#0055b8]">{benefit.icon}</div>
                            <span className="font-medium">{benefit.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <Button className="h-12 bg-[#0055b8] hover:bg-[#0055b8]/90 text-white rounded-lg font-medium text-base shadow-sm">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                </Button>
                <Button className="h-12 bg-white border-2 border-[#0055b8] text-[#0055b8] hover:bg-[#0055b8]/5 rounded-lg font-medium text-base shadow-sm">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Buy Now
                </Button>
            </div>

        </div>
    )
}

export default ActionSection
