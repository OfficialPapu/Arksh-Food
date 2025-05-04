"use client"
import React from "react"
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import useOrderActions from "@/Components/Hooks/Order"


export default function MobileCard() {
    const { getStatusColor, currentItems, goToPage, page, totalPages, filteredOrders, updateFilters } = useOrderActions();
    return (
        <>
            <div className="block sm:hidden">
                <div className="space-y-4">
                    {currentItems.map((Order) => (
                        <div
                            key={Order.OrderID}
                            className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{Order?.OrderID}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{Order?.CreatedAt ? format(new Date(Order.CreatedAt), "MMM dd, yyyy") : "Loading..."}
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`${getStatusColor(Order?.Shipping?.Status)} px-2.5 py-0.5 text-xs font-medium`}
                                >
                                    {Order?.Shipping?.Status}
                                </Badge>
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="font-medium text-gray-900 dark:text-white">{Order?.UserID?.Name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{Order?.UserID?.Email}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Amount</div>
                                        <div className="font-medium text-gray-900 dark:text-white"> Rs. {Order?.GrandTotal.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Items</div>
                                        <div className="text-center text-gray-900 dark:text-white">{Order.OrderCount}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <a href={`/admin/orders/${Order._id}`}><Eye className="h-4 w-4" /></a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Empty state */}
                {filteredOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No orders found</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                updateFilters({ status: null, search: null })
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between sm:hidden">
                <Button variant="outline" size="sm" onClick={() => goToPage(page - 1)} disabled={page === 1}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                </Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Page {page} of {totalPages || 1}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </>
    )
}
