"use client"
import { format } from "date-fns"
import Image from "next/image"
import { Package, Calendar, ShoppingBag } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent } from "@/Components/ui/card"
import { getStatusColor } from "@/Components/ui/getStatusColor"
import { Button } from "@/Components/ui/button"
import Link from "next/link"

const OrdersSummary = ({ userDetails }) => {
    const hasOrders = Array.isArray(userDetails?.Orders) &&
    userDetails.Orders.some(order => order?.OrderID !== null || (Array.isArray(order?.Items) && order.Items.length > 0 && order.Items.some(item => item?.ProductImage)));
    return (
        <div className="p-6 lg:p-8">
            {hasOrders ? (
                <div className="space-y-6">
                    {userDetails.Orders.map((order) => (
                        <Card key={order._id} className="border-none shadow-sm overflow-hidden">
                            <div className="bg-white border-b border-gray-100 p-4 lg:p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-4">
                                            <Package className="h-5 w-5 text-[#0055a4]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center flex-wrap gap-2">
                                                <h3 className="font-medium text-gray-900 text-base">{order.OrderID}</h3>
                                                <Badge
                                                    className={`${getStatusColor(
                                                        order?.Shipping?.Status,
                                                    )} px-2.5 py-0.5 text-xs font-medium w-[80px] text-center`}
                                                >
                                                    {order.Shipping.Status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                <Calendar className="h-3.5 w-3.5 inline mr-1" />
                                                {format(new Date(order.CreatedAt), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center gap-3">
                                        <div className="flex items-center mt-1 lg:mt-2">
                                            {order?.Discount ? (
                                                <>
                                                    <span className="text-red-500 font-medium">Rs. {order?.BaseTotal.toFixed(2)}</span>
                                                    <span className="text-gray-400 line-through text-sm ml-2">
                                                        Rs. {order?.GrandTotal.toFixed(2)}
                                                    </span>
                                                    {order?.Discount > 0 && (
                                                        <span className="ml-2 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                            Save Rs. {order?.Discount}
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-gray-700 font-medium">Rs. {order?.GrandTotal.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="bg-gray-50 p-4 lg:p-6">
                                <h4 className="text-sm font-medium mb-3 text-gray-700">Order Items</h4>
                                <div className="space-y-3">
                                    {order?.Items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-100"
                                        >
                                            <div className="flex items-center">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 group-hover:border-[#0055a4] transition-all">
                                                    <img
                                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item.ProductImage || "/Media/Images/Logo/placeholder.svg"}
                                                        alt={item.ProductName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center bg-[#0055a4]">
                                                        {item.Quantity}
                                                    </div>
                                                </div>
                                                <span className="text-gray-900 text-sm ml-1 line-clamp-2">{item.ProductName}</span>
                                            </div>
                                            <span className="font-medium text-gray-900 text-sm">Rs. {item.Total.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                    <span className="font-medium text-gray-900 text-base">Total</span>
                                    <span className="font-medium text-gray-900 text-base">Rs. {order.GrandTotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-none shadow-sm overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#e6f0f9] flex items-center justify-center mb-6">
                            <ShoppingBag className="h-10 w-10 text-[#0055a4]" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-500 max-w-md mb-8">
                            You haven't placed any orders yet. Start shopping and your order history will appear here.
                        </p>
                        <Link href="/shop" passHref>
                            <Button className="bg-[#0055a4] hover:bg-[#004080]">Start Shopping</Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default OrdersSummary
