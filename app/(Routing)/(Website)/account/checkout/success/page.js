"use client"

import { useState } from "react"
import { ArrowLeft, Check, ChevronRight, Clock, MapPin, Phone, Printer, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Sample order details
const orderDetails = {
  orderId: "ORD-2023-48756",
  orderDate: "April 6, 2025",
  orderTime: "10:42 PM",
  estimatedDelivery: "11:15 PM",
  paymentMethod: "Credit Card",
  deliveryAddress: "123 Main Street, Kathmandu, Nepal",
  contactNumber: "+977 9876543210",
  items: [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 350,
      discountPercentage: 10,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Vegetable Momo",
      price: 180,
      discountPercentage: 0,
      quantity: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Butter Naan",
      price: 80,
      discountPercentage: 15,
      quantity: 3,
      image: "/placeholder.svg?height=60&width=60",
    },
  ],
  subtotal: 610,
  deliveryCharge: 100,
  discount: 30.5,
  total: 679.5,
  status: "confirmed", // confirmed, preparing, on-the-way, delivered
}

export default function OrderConfirmation() {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusStep = () => {
    switch (orderDetails.status) {
      case "confirmed":
        return 1
      case "preparing":
        return 2
      case "on-the-way":
        return 3
      case "delivered":
        return 4
      default:
        return 1
    }
  }

  const statusStep = getStatusStep()

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 lg:p-6">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-10">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#0055a4]">Order Confirmation</h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Button variant="link" className="p-0 h-auto text-sm text-gray-500 font-normal" href="/">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Back to Home
              </Button>
              <ChevronRight className="h-3.5 w-3.5 mx-1" />
              <span className="text-[#0055a4] font-medium">Order Confirmation</span>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-600 mb-6">Your order has been received and is now being processed.</p>
            <div className="inline-block bg-blue-50 rounded-lg px-4 py-2 text-[#0055a4] font-medium">
              Order ID: {orderDetails.orderId}
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-5 lg:p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-[#0055a4]">Order Status</h2>
          </div>

          <div className="p-5 lg:p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
              </div>
              <Button variant="outline" size="sm" className="text-[#0055a4] border-[#0055a4]">
                Track Order
              </Button>
            </div>

            <div className="relative">
              {/* Progress bar */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                <div className="h-1 bg-[#0055a4]" style={{ width: `${(statusStep - 1) * 33.33}%` }} />
              </div>

              {/* Status steps */}
              <div className="flex justify-between relative">
                <StatusStep title="Confirmed" isActive={statusStep >= 1} isCompleted={statusStep > 1} />
                <StatusStep title="Preparing" isActive={statusStep >= 2} isCompleted={statusStep > 2} />
                <StatusStep title="On the Way" isActive={statusStep >= 3} isCompleted={statusStep > 3} />
                <StatusStep title="Delivered" isActive={statusStep >= 4} isCompleted={statusStep > 4} />
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-5 lg:p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0055a4]">Order Details</h2>
            <button className="flex items-center text-sm text-gray-500" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide" : "Show"} Details
              <ChevronRight
                className={cn("h-4 w-4 ml-1 transition-transform", showDetails ? "transform rotate-90" : "")}
              />
            </button>
          </div>

          <div
            className={cn("transition-all duration-300 overflow-hidden", showDetails ? "max-h-[1000px]" : "max-h-0")}
          >
            <div className="p-5 lg:p-6 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Information</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">{orderDetails.orderId}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{orderDetails.orderDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{orderDetails.orderTime}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{orderDetails.paymentMethod}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{orderDetails.deliveryAddress}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600">{orderDetails.contactNumber}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-blue-50 flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {item.quantity > 1 && (
                        <div className="absolute -top-1 -right-1 bg-[#0055a4] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-gray-500">
                          {item.discountPercentage > 0 ? (
                            <span className="text-red-500">
                              Rs. {(item.price - (item.price * item.discountPercentage) / 100).toFixed(0)}
                            </span>
                          ) : (
                            <span>Rs. {item.price}</span>
                          )}
                          {item.quantity > 1 && <span> × {item.quantity}</span>}
                        </div>
                        <div className="text-sm font-medium">
                          Rs. {((item.price - (item.price * item.discountPercentage) / 100) * item.quantity).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 lg:p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {orderDetails.subtotal.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{orderDetails.deliveryCharge === 0 ? "Free" : `Rs. ${orderDetails.deliveryCharge}`}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- Rs. {orderDetails.discount.toFixed(1)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#0055a4]">Rs. {orderDetails.total.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-6 bg-gray-50 flex flex-wrap gap-3 justify-center">
            <Button variant="outline" size="sm" className="text-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Share className="h-4 w-4 mr-2" />
              Share Order
            </Button>
            <Button size="sm" className="bg-[#0055a4]">
              Need Help?
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


function StatusStep({ title, isActive, isCompleted }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
          isCompleted ? "bg-[#0055a4] text-white" : isActive ? "bg-[#0055a4] text-white" : "bg-gray-200 text-gray-500",
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs">{title.charAt(0)}</span>}
      </div>
      <span className={cn("text-xs mt-2", isActive || isCompleted ? "font-medium text-[#0055a4]" : "text-gray-500")}>
        {title}
      </span>
    </div>
  )
}

