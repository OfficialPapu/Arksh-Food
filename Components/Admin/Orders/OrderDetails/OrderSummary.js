"use client"
import React, { useState } from 'react'
import { Badge, ExternalLink, X, Eye, Download } from 'lucide-react';
import useOrderDetailsActions from './useOrderDetailsActions';
import { Button } from "@/Components/ui/button"

const OrderSummary = () => {
    const { OrderData, BASE_IMAGES_PATH } = useOrderDetailsActions();
    const [showFullScreenImage, setShowFullScreenImage] = useState(false);
    
    // Function to handle opening the payment screenshot in a new tab
    const openPaymentScreenshot = (url) => {
        window.open(url, '_blank');
    };
    
    // Function to toggle fullscreen image preview
    const toggleFullScreenImage = (e) => {
        e?.stopPropagation();
        setShowFullScreenImage(!showFullScreenImage);
    };
    
    const downloadPaymentScreenshot = (url, filename = "payment-proof.jpg") => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="mb-8 overflow-hidden bg-white shadow-sm dark:bg-slate-950">
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
                    
                    {/* Payment Screenshot Section - Only show for Bank or eSewa payments */}
                    {(OrderData?.Payment?.Method === "Bank" || OrderData?.Payment?.Method === "eSewa") && OrderData?.Payment?.Screenshot && (
                        <div className="mt-3">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2 h-8 px-3 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 flex items-center"
                                onClick={toggleFullScreenImage}
                            >
                                <Eye className="h-3 w-3 mr-1" />
                                View Payment Receipt
                            </Button>
                        </div>
                    )}
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
            
            {/* Full Screen Image Preview Modal with Payment Details */}
            {showFullScreenImage && OrderData?.Payment?.Screenshot && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 top-10" onClick={toggleFullScreenImage}>
                    <div className="relative max-w-2xl w-full animate-fade-in">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute -top-12 right-0 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 border-0 text-white"
                            onClick={(e) => toggleFullScreenImage(e)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        
                        <div className="absolute -top-12 left-0 flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-3 text-xs bg-white/10 hover:bg-white/20 border-0 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openPaymentScreenshot(`${BASE_IMAGES_PATH}/${OrderData.Payment.Screenshot}`);
                                }}
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Open Original
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-3 text-xs bg-white/10 hover:bg-white/20 border-0 text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    downloadPaymentScreenshot(`${BASE_IMAGES_PATH}/${OrderData.Payment.Screenshot}`, `payment-${OrderData?._id || 'receipt'}.jpg`);
                                }}
                            >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                            </Button>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">Payment Verification</span>
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                                    {OrderData?.Payment?.Method}
                                </div>
                            </div>
                            <div className="p-4">
                                <img
                                    src={`${BASE_IMAGES_PATH}/${OrderData.Payment.Screenshot}`}
                                    alt="Payment Screenshot"
                                    className="w-full h-auto max-h-[50vh] object-contain"
                                />
                                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                    Receipt uploaded by customer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderSummary 