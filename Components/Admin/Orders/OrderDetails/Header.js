"use client"
import React from 'react'
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, ChevronDown, RefreshCw } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import useOrderDetailsActions from './useOrderDetailsActions';
import { HandelDialogChanges } from '@/Components/Redux/AdminSlices/OrderDetailsSlice'

const Header = () => {
    const { getStatusColor, OrderData, dispatch } = useOrderDetailsActions();

    return (
        <header className="border-b bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
            <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href="/admin/orders">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to orders</span>
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Order: {OrderData?.OrderID || 'N/A'}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Calendar className="h-4 w-4" />
                                <span>{OrderData?.CreatedAt ? format(new Date(OrderData.CreatedAt), "MMM dd, yyyy") : "Loading..."}</span>
                                <Badge
                                    variant="outline"
                                    className={`${getStatusColor(OrderData?.Shipping?.Status || "")} ml-2 px-2.5 py-0.5 text-xs font-medium capitalize`}
                                >
                                    {OrderData?.Shipping?.Status || 'N/A'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button
                            variant="default"
                            className="group"
                            onClick={() => dispatch(HandelDialogChanges())}
                            disabled={!OrderData}
                        >
                            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-90" />
                            Update Status
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header