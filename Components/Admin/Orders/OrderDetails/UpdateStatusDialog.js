"use client"
import { Check, ChevronDown, ChevronUp, LoaderCircle, RefreshCw } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { HandelDialogChanges, HandelStatusChanges } from  "@/Components/Redux/AdminSlices/OrderDetailsSlice"
const UpdateStatusDialog = () => {
    const { isUpdateStatusDialogOpen, dispatch, handleStatusUpdate, OrderData, getStatusDotColor, updateMode, NewStatus, BASE_IMAGES_PATH, selectAllItems, handleModeChange, selectedItems, isProductListExpanded, setIsProductListExpanded, setSelectedItems, isLoading } = useOrderDetailsActions();

    return (
        <Dialog open={isUpdateStatusDialogOpen} onOpenChange={() => { if (!isLoading) dispatch(HandelDialogChanges()) }}>
            <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 overflow-hidden rounded-xl border-0 shadow-xl">
                <div className="relative bg-white dark:bg-gray-950 pt-6 px-6">
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Update Status
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Change the status of order #{OrderData?.OrderID}
                    </DialogDescription>
                </div>

                <div className="px-6 pb-4 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div>
                        <Label className="text-sm font-medium text-gray-900 dark:text-white block mb-3">
                            What would you like to update?
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${updateMode === "all"
                                    ? "border-gray-900 bg-gray-50 dark:border-gray-400 dark:bg-gray-800/30"
                                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                    }`}
                                onClick={() => handleModeChange("all")}
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                                    <RefreshCw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <span className="font-medium text-sm text-gray-900 dark:text-white">Entire Order</span>
                            </button>

                            <button
                                type="button"
                                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${updateMode === "selected"
                                    ? "border-gray-900 bg-gray-50 dark:border-gray-400 dark:bg-gray-800/30"
                                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                    }`}
                                onClick={() => handleModeChange("selected")}
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                                    <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <span className="font-medium text-sm text-gray-900 dark:text-white">Select Items</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Selection Section */}
                    {updateMode === "selected" && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                    Select Products ({selectedItems.length}/{OrderData?.OrderItemsID?.length || 0})
                                </Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => selectAllItems()}
                                    className="h-8 text-xs"
                                >
                                    {selectedItems.length === OrderData?.OrderItemsID?.length ? "Deselect All" : "Select All"}
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {OrderData?.OrderItemsID?.slice(0, 2).map((item) => {
                                    const firstImage = item?.ProductID?.Media?.Images?.[0];
                                    return (
                                        <div
                                            key={item._id}
                                            className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                                        >
                                            <Checkbox
                                                id={`select-${item._id}`}
                                                checked={selectedItems.includes(item._id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedItems(prev => [...prev, item._id])
                                                    } else {
                                                        setSelectedItems(prev => prev.filter(id => id !== item._id))
                                                    }
                                                }}
                                                className="mr-3 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 dark:data-[state=checked]:bg-gray-400 dark:data-[state=checked]:border-gray-400"
                                                onClick={(e) => e.stopPropagation()}
                                            />

                                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 mr-3">
                                                <img
                                                    src={firstImage ? `${BASE_IMAGES_PATH}/${firstImage}` : "/Media/Images/Logo/placeholder.svg"}
                                                    alt={item?.ProductID?.Name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                                    {item?.ProductID?.Name}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className={`px-2 py-0.5 text-xs rounded-full capitalize ${getStatusDotColor(item?.Status).bg} ${getStatusDotColor(item?.Status).text}`}>
                                                        {item?.Status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {OrderData?.OrderItemsID?.length > 2 && (
                                    <>
                                        {isProductListExpanded && (
                                            <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                                                {OrderData?.OrderItemsID?.slice(2).map((item) => {
                                                    const firstImage = item?.ProductID?.Media?.Images?.[0];
                                                    return (
                                                        <div
                                                            key={item._id}
                                                            className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                                                        >
                                                            <Checkbox
                                                                id={`select-${item._id}`}
                                                                checked={selectedItems.includes(item._id)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setSelectedItems(prev => [...prev, item._id])
                                                                    } else {
                                                                        setSelectedItems(prev => prev.filter(id => id !== item._id))
                                                                    }
                                                                }}
                                                                className="mr-3 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 dark:data-[state=checked]:bg-gray-400 dark:data-[state=checked]:border-gray-400"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />

                                                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 mr-3">
                                                                <img
                                                                    src={firstImage ? `${BASE_IMAGES_PATH}/${firstImage}` : "/Media/Images/Logo/placeholder.svg"}
                                                                    alt={item?.ProductID?.Name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                                                    {item?.ProductID?.Name}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <div className={`px-2 py-0.5 text-xs rounded-full capitalize ${getStatusDotColor(item?.Status).bg} ${getStatusDotColor(item?.Status).text}`}>
                                                                        {item?.Status}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => setIsProductListExpanded(!isProductListExpanded)}
                                            className="w-full py-2 px-3 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30"
                                        >
                                            {isProductListExpanded ? (
                                                <>
                                                    <ChevronUp className="h-4 w-4 mr-1" />
                                                    Show Less
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="h-4 w-4 mr-1" />
                                                    Show {OrderData?.OrderItemsID?.length - 2} More Items
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <Label className="text-sm font-medium text-gray-900 dark:text-white block mb-3">
                            New Status
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            {["shipped", "delivered", "cancelled"].map((status) => {
                                const statusColors = getStatusDotColor(status)
                                return (
                                    <button
                                        key={status}
                                        type="button"
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${NewStatus.toLowerCase() == status
                                            ? "border-gray-900 dark:border-gray-400"
                                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                            }`}
                                        onClick={() => dispatch(HandelStatusChanges({ status: status }))}
                                    >
                                        <div className={`h-3 w-3 rounded-full ${statusColors.dot} mb-1`}></div>
                                        <span className="font-medium text-xs text-gray-900 dark:text-white capitalize">{status}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <DialogFooter className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <Button
                        variant="outline"
                        onClick={() => { if (!isLoading) dispatch(HandelDialogChanges()) }}
                        className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => await handleStatusUpdate(updateMode, selectedItems, NewStatus)}
                        disabled={(updateMode === "selected" && selectedItems.length === 0) || isLoading}
                        className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin" />Updating...</> : "Update Status"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateStatusDialog