"use client"
import { TagIcon } from "lucide-react"
import useCartActions from "@/Components/Hooks/Cart"
import { useSelector } from "react-redux";

const Ordersummary = () => {
    const { PickupCost, PickupLocation } = useCartActions();
    const { CheckoutItems, Subtotal, Discount, } = useSelector((state) => state.Checkout);
    return (
        <>
            <div className="pt-6">
                <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-5 custom-scrollbar">
                    {CheckoutItems?.map((item) => {
                        return (
                            <div key={item.ProductID} className="flex gap-4 group">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 group-hover:border-[#0055a4] transition-all">
                                    <img src={item.Image || "/placeholder.svg"} alt={item.Name} fill className="object-cover" />
                                    <div className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center bg-[#0055a4]">
                                        {item.Quantity}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="mb-1 !text-sm font-medium text-gray-900 sm:mb-2 !sm:text-base hover:text-[#0055a4] line-clamp-2">{item.Name}</h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="text-sm text-gray-500">
                                            {item.Discount > 0 ? (
                                                <div className="flex items-center">
                                                    <span className="text-red-500">Rs. {item.PriceAfterDiscount}</span>
                                                    <span className="text-gray-400 line-through text-xs ml-1">Rs. {item.Price}</span>
                                                </div>
                                            ) : (
                                                <span>Rs. {item.Price}</span>
                                            )}
                                            {item.quantity > 1 && <span className="ml-1">× {item.Quantity}</span>}
                                        </div>
                                        {item.Discount ? (
                                            <div className="font-medium text-gray-900">Rs. {item.PriceAfterDiscount * item.Quantity}</div>
                                        ) : (
                                            <div className="font-medium text-gray-900">Rs. {item.Price * item.Quantity}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Pickup</span>
                        <span>{PickupLocation}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>Rs. {Subtotal.toFixed(0)}</span>
                    </div>

                    {Discount ? (
                        <div className="flex justify-between py-1">
                            <span className="flex items-center gap-1 text-green-600">
                                <TagIcon className="h-4 w-4" />
                                Discount
                            </span>
                            <span className="text-green-600 font-medium">- Rs. {Discount.toLocaleString()}</span>
                        </div>
                    ) : null}
                    <div className="flex justify-between text-gray-600">
                        <span>Delivery</span>
                        <span>{PickupCost == 0 ? "Free" : "Rs. " + PickupCost}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ordersummary
