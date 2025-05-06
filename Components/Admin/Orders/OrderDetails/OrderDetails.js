"use client"
import { CreditCard, FileText, Truck } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { TabsContent } from "@/Components/ui/tabs"
import useOrderDetailsActions from "./useOrderDetailsActions"
import ProductInfo from "./ProductInfo"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Toaster } from "react-hot-toast"

const OrderDetails = () => {
    const { OrderData, getStatusColor } = useOrderDetailsActions();
    return (
        <>
            <TabsContent value="details" className="mt-6 space-y-6">
         <Toaster toastOptions={{ duration: 2000 }} />
                <ProductInfo />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Shipping Information</CardTitle>
                                <Truck className="h-5 w-5 text-slate-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="!mb-1 text-sm font-medium text-slate-900 dark:text-white">Shipping Address</h4>
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                                        <p className="text-slate-500 dark:text-white mb-1">Name: <strong>{OrderData?.Shipping?.Address?.Name}</strong></p>
                                        <p className="text-slate-500 dark:text-slate-400">Phone: <strong>{OrderData?.Shipping?.Address?.Phone}</strong></p>
                                        <p className="text-slate-500 dark:text-slate-400 mb-1">Address: <strong>{OrderData?.Shipping?.Address?.Address}, {OrderData?.Shipping?.Address?.City} {OrderData?.Shipping?.Address?.PostalCode}, {OrderData?.Shipping?.Address?.Country}</strong></p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Shipment ID:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {OrderData?.Shipping?.ShipmentID}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Pickup:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{OrderData?.Shipping?.Method}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Status:</span>
                                        <Badge
                                            variant="outline"
                                            className={`${getStatusColor(OrderData?.Shipping?.Status || "")} px-2 py-0.5 text-xs font-medium capitalize`}
                                        >
                                            {OrderData?.Shipping?.Status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Cost:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            Rs. {OrderData?.Shipping?.Cost}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Payment Information</CardTitle>
                                <CreditCard className="h-5 w-5 text-slate-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Payment Method:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{OrderData?.Payment?.Method}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
                                        <Badge
                                            variant="outline"
                                            className={`${OrderData?.Payment?.Method == "Cash on delivery"
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                } px-2 py-0.5 text-xs font-medium`}
                                        >
                                            {OrderData?.Payment?.Method === "Cash on delivery" ? "Pending (COD)" : "Paid"}
                                        </Badge>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Subtotal:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">Rs. {OrderData?.BaseTotal}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Shipping:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">Rs. {OrderData?.Shipping?.Cost}</span>
                                    </div>
                                    {OrderData?.Discount && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">Discount:</span>
                                            <span className="font-medium text-slate-900 dark:text-white">- Rs. { Math.round(OrderData?.Discount)}</span>
                                        </div>
                                    )}
                                    <Separator className="my-2" />
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-900 dark:text-white">Total:</span>
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                                            Rs. {OrderData?.GrandTotal + OrderData?.Shipping?.Cost}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-900">
                        </CardFooter>
                    </Card>

                    {/* Notes */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Notes</CardTitle>
                                <FileText className="h-5 w-5 text-slate-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {OrderData?.Notes?.Customer?.length > 0 || OrderData?.Notes?.Admin?.length > 0 ? (
                                <div className="space-y-4">
                                    {OrderData?.Notes?.Customer?.length > 0 && (
                                        <div>
                                            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Customer Notes</h4>
                                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                                                {OrderData.Notes.Customer.map((note, index) => (
                                                    <p key={index} className="text-slate-700 dark:text-slate-300">{note}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {OrderData?.Notes?.Admin?.length > 0 && (
                                        <div>
                                            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Admin Notes</h4>
                                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                                                {OrderData.Notes.Admin.map((note, index) => (
                                                    <p key={index} className="text-slate-700 dark:text-slate-300">{note}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm italic text-slate-400 dark:text-slate-500">No notes added to this order.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </>
    )
}

export default OrderDetails