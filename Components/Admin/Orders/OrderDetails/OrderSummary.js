"use client"
import React from 'react'
import { Badge } from 'lucide-react';
import useOrderDetailsActions from './useOrderDetailsActions';

const OrderSummary = () => {
    const { OrderData, BASE_IMAGES_PATH } = useOrderDetailsActions();
    return (
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-950">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-3 dark:divide-slate-800">
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Customer</div>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <img
                                src={OrderData?.UserID?.ProfilePic ? `${BASE_IMAGES_PATH + OrderData?.UserID?.ProfilePic}` : "/Arksh Food.png"}
                                alt={OrderData?.UserID?.Name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white">{OrderData?.UserID?.Name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{OrderData?.UserID?.Email}</div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Payment</div>
                    <div className="mt-2">
                        <div className="font-medium text-slate-900 dark:text-white">Rs. {OrderData?.GrandTotal}</div>
                        <div className="mt-1 flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className={`${OrderData?.Payment?.Method !== "Cash on delivery"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    } px-2 py-0.5 text-xs font-medium`}
                            >
                                {OrderData?.Payment?.Method !== "Cash on delivery" ? "Paid" : "Pending (COD)"}
                            </Badge>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{OrderData?.Payment?.Method}</span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Shipping</div>
                    <div className="mt-2">
                        <div className="font-medium text-slate-900 dark:text-white">{OrderData?.Shipping?.Method}</div>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                Cost: Rs. {OrderData?.Shipping?.Cost}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary