"use client"
import { User } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/Components/ui/button"
import { TabsContent } from "@radix-ui/react-tabs"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import Link from "next/link"

const UserInfo = () => {
    const { OrderData, BASE_IMAGES_PATH } = useOrderDetailsActions();
    return (
        <TabsContent value="customer" className="mt-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Customer Information</CardTitle>
                        <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <CardDescription>Details about the customer who placed this order</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                        <div>
                            <div className="mb-4 flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={OrderData?.UserID?.ProfilePic ? `${BASE_IMAGES_PATH + OrderData?.UserID?.ProfilePic}` : "/Arksh Food.png"}
                                        alt={OrderData?.UserID?.Name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                                        {OrderData?.UserID?.Name || 'N/A'}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {OrderData?.UserID?.Email || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Customer ID:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {OrderData?.UserID?.UID || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Phone:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {OrderData?.UserID?.Mobile || OrderData?.Shipping?.Address?.Phone || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Address:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{OrderData?.UserID?.Address || "N/A"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Customer Since:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {OrderData?.UserID?.CreatedAt ? format(new Date(OrderData.UserID.CreatedAt), "MMM dd, yyyy") : "Loading..."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-900">
                    <Button variant="outline" size="sm">
                        <Link href={`/admin/users/${OrderData?.UserID?._id}`} className="flex justify-center items-center gap-1">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default UserInfo