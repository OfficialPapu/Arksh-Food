"use client"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import Header from "@/Components/Admin/Orders/OrderDetails/Header"
import OrderSummary from "@/Components/Admin/Orders/OrderDetails/OrderSummary"
import OrderDetails from "@/Components/Admin/Orders/OrderDetails/OrderDetails"
import UserInfo from "@/Components/Admin/Orders/OrderDetails/UserInfo"
import UpdateStatusDialog from "@/Components/Admin/Orders/OrderDetails/UpdateStatusDialog"
import useOrderDetailsActions from "@/Components/Admin/Orders/OrderDetails/useOrderDetailsActions"
import { useEffect, useRef } from "react"
import { FileSearch, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/Components/ui/button"
import Link from "next/link"

export default function Orders() {
    const { setActiveTab, FetchOrderDetials, OrderID, isCorrectInfo } = useOrderDetailsActions()
    const hasFetched = useRef(false)
    useEffect(() => {
        const fetchData = async () => {
            if (OrderID && !hasFetched.current) {
                hasFetched.current = true
                await FetchOrderDetials(OrderID)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {isCorrectInfo ? (
                <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                    <Header />
                    <main>
                        <OrderSummary />
                        <Tabs defaultValue="details" className="mb-6" onValueChange={setActiveTab}>
                            <div className="overflow-x-auto pb-2">
                                <TabsList className="w-full min-w-max grid grid-cols-2">
                                    <TabsTrigger value="details">Order Details</TabsTrigger>
                                    <TabsTrigger value="customer">Customer</TabsTrigger>
                                </TabsList>
                            </div>
                            <OrderDetails />
                            <UserInfo />
                        </Tabs>
                    </main>
                    <UpdateStatusDialog />
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mx-auto">
                    <div className="h-2 bg-[#4a7bab] dark:bg-[#5d8fc0]"></div>

                    <div className="p-8">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-20 h-20 bg-[#edf3f8] dark:bg-slate-700 rounded-full flex items-center justify-center mb-6">
                                <FileSearch className="h-10 w-10 text-[#4a7bab] dark:text-[#7aa7d3]" />
                            </div>
                            <h1 className="text-2xl font-semibold text-[#2c4c6b] dark:text-white mb-2">Order Not Found</h1>
                            <p className="text-[#5e7a99] dark:text-slate-300 max-w-md">
                                We couldn't locate the order you're looking for in our system.
                            </p>
                        </div>

                        <div className="bg-[#f3f7fa] dark:bg-slate-700/50 rounded-lg p-5 mb-8">
                            <h3 className="font-medium text-[#2c4c6b] dark:text-white mb-2">Possible reasons:</h3>
                            <ul className="space-y-2 text-[#5e7a99] dark:text-slate-300">
                                <li className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4a7bab] dark:bg-[#7aa7d3] mt-2 mr-2"></span>
                                    The order ID may have been entered incorrectly
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4a7bab] dark:bg-[#7aa7d3] mt-2 mr-2"></span>
                                    The order might have been deleted from our system
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4a7bab] dark:bg-[#7aa7d3] mt-2 mr-2"></span>
                                    There might be a temporary issue with our database
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/admin/orders">
                                <Button
                                    variant="outline"
                                    className="border-[#d0dde9] text-[#4a7bab] hover:bg-[#f3f7fa] hover:text-[#2c4c6b] dark:border-slate-600 dark:text-[#7aa7d3] dark:hover:bg-slate-700"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Go Back
                                </Button></Link>
                            <Button
                                onClick={() => {
                                    hasFetched.current = false
                                    if (OrderID) FetchOrderDetials(OrderID)
                                }}
                                className="bg-[#4a7bab] hover:bg-[#3d6a96] text-white dark:bg-[#5d8fc0] dark:hover:bg-[#4a7bab]"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

