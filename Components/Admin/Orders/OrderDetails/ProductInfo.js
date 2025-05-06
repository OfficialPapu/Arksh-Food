"use client"
import { Badge } from "@/Components/ui/badge"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

const ProductInfo = () => {
  const { OrderData, BASE_IMAGES_PATH } = useOrderDetailsActions();

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Order Items</CardTitle>
            <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium">
              {OrderData?.OrderItemsID?.length || 0} items
            </Badge>
          </div>
          <CardDescription>Items included in this order</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-scroll">
          <div className="block md:hidden">
            {OrderData?.OrderItemsID?.map((item) => {
              const firstImage = item?.ProductID?.Media?.Images[0];
              return (
                <div
                  key={item._id}
                  className="mb-4 border-y bg-white p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md borde bg-slate-50">
                      <img
                        src={firstImage ? `${BASE_IMAGES_PATH + firstImage}` : "/placeholder.svg"}
                        alt={item?.ProductID?.Name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{item?.ProductID?.Name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">SKU: {item?.ProductID?.SKU}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">Price</div>
                      <div className="font-medium text-slate-900 dark:text-white">Rs. {item?.UnitPrice}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">Quantity</div>
                      <div className="font-medium text-slate-900 dark:text-white">{item?.Quantity}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">Total</div>
                      <div className="font-medium text-slate-900 dark:text-white">Rs. {item?.Total}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OrderData?.OrderItemsID?.map((item) => {
                  const firstImage = item?.ProductID?.Media?.Images?.[0];
                  return (
                    <tr key={item._id} className="bg-white dark:bg-slate-950">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                            <img
                              src={firstImage ? `${BASE_IMAGES_PATH}/${firstImage}` : "/placeholder.svg"}
                              alt={item?.ProductID?.Name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">{item?.ProductID?.Name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">SKU: {item?.ProductID?.SKU}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                        {item?.BasePrice != item?.UnitPrice ? (
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-primary">
                              Rs. {item?.UnitPrice}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              Rs. {item?.BasePrice}
                            </span>
                          </div>
                        ) : (
                          <span>Rs. {item?.UnitPrice}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                        {item?.Quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                        Rs. {item?.Total}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-right">
            <div className="text-sm text-slate-500 dark:text-slate-400">Order Subtotal</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">Rs. {OrderData?.GrandTotal ? OrderData?.GrandTotal.toFixed(2) : "0.00"}</div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default ProductInfo