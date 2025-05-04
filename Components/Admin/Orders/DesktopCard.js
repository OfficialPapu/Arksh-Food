"use client"
import React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, X } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import useOrderActions from "@/Components/Hooks/Order"

export default function DesktopCard() {
    const { getPageNumbers, getStatusColor, currentItems, totalPages, indexOfLastItem, indexOfFirstItem, filteredOrders, page, updateFilters, goToPage } = useOrderActions();
    return (
        <div className="hidden rounded-lg bg-white shadow-sm dark:bg-gray-950 sm:block">
            <div className="overflow-scroll rounded-lg border border-gray-200 dark:border-gray-800">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 sm:px-6">Order ID</th>
                            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 sm:px-6">Customer</th>
                            <th className="hidden px-4 py-3 font-medium text-gray-700 dark:text-gray-300 lg:table-cell lg:px-6">
                                Items
                            </th>
                            <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300 sm:px-6">Amount</th>
                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300 sm:px-6">Status</th>
                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300 sm:px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {currentItems.map((Order) => (
                            <tr key={Order.OrderID} className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white sm:px-6">
                                    #{Order.OrderID}
                                </td>
                                <td className="px-4 py-4 sm:px-6">
                                    <div className="font-medium text-gray-900 dark:text-white">{Order?.UserID?.Name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{Order?.UserID?.Email}</div>
                                </td>
                                <td className="hidden whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 lg:table-cell lg:px-6">
                                    {Order?.OrderItemsID?.length}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-gray-900 dark:text-white sm:px-6">
                                    Rs. {Order?.GrandTotal.toLocaleString()}
                                </td>
                                <td className="text-center whitespace-nowrap px-4 py-4 sm:px-6">
                                    <Badge
                                        variant="outline"
                                        className={`${getStatusColor(Order?.Shipping?.Status)} px-2.5 py-0.5 text-xs font-medium w-[80px] text-center`}
                                    >
                                        <span className="w-[100%]">{Order?.Shipping?.Status}</span>
                                    </Badge>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-right sm:px-6">
                                    <div className="flex justify-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            <a href={`/admin/orders/${Order._id}`}><Eye className="h-4 w-4" /></a>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-medium text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                        {Math.min(indexOfLastItem, filteredOrders.length)}
                    </span>{" "}
                    of <span className="font-medium text-gray-900 dark:text-white">{filteredOrders.length}</span> orders
                </div>
                <div className="hidden sm:flex sm:items-center sm:gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => goToPage(1)}
                        disabled={page === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {getPageNumbers().map((pageNum, index) =>
                        pageNum === "..." ? (
                            <span key={`ellipsis-${index}`} className="px-1 text-gray-400">
                                ...
                            </span>
                        ) : (
                            <Button
                                key={`page-${pageNum}`}
                                variant={page === pageNum ? "default" : "outline"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => goToPage(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        ),
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages || totalPages === 0}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => goToPage(totalPages)}
                        disabled={page === totalPages || totalPages === 0}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
