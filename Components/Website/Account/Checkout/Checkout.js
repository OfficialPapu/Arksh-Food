"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Home, Lock, MapPin, Phone, Plus, Shield, Trash2, User, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import toast, { Toaster } from 'react-hot-toast';
// Define brand colors directly in the component
const colors = {
  primary: "#0055a4",
  primaryDark: "#003d7a",
  primaryLight: "#36b7e5",
  primaryLighter: "#e6f0f9",
  secondary: "#36b7e5",
  secondaryDark: "#1a9fd0",
  secondaryLight: "#7fd0ef",
}

// Sample cart items from previous page
const cartItems = [
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
]

// Sample saved addresses
const initialAddresses = [
  {
    id: 1,
    name: "Outside Valley",
    recipient: "John Doe",
    phone: "+977 9876543212",
    address: "789 Mountain View, Dhulikhel",
    city: "Kavre",
    area: "Dhulikhel",
    isDefault: false,
    deliveryCharge: 200,
  },
]

export default function CheckoutPage() {
  const [selectedAddressId, setSelectedAddressId] = useState(1)
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [orderNotes, setOrderNotes] = useState("")
  const [saveInfo, setSaveInfo] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [addresses, setAddresses] = useState(initialAddresses)
  const [newAddress, setNewAddress] = useState({
    name: "",
    recipient: "",
    phone: "",
    address: "",
    city: "Kathmandu",
    area: "",
    isDefault: false,
  })
  const [filePreview, setFilePreview] = useState(null)

  const getDiscountedPrice = (price, discountPercentage) => {
    if (!discountPercentage) return price
    return price - (price * discountPercentage) / 100
  }

  const calculateItemTotal = (item) => {
    const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)
    return discountedPrice * item.quantity
  }

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId)
  const deliveryCharge = selectedAddress?.deliveryCharge || 100

  const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  const total = subtotal + deliveryCharge

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL for the uploaded image
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreview(event.target.result)
      }
      reader.readAsDataURL(file)

      // toast({
      //   title: "File uploaded",
      //   description: `${file.name} has been uploaded successfully.`,
      // })
    }
  }

  const openAddressModal = (addressId = null) => {
    if (addressId) {
      const addressToEdit = addresses.find((addr) => addr.id === addressId)
      setNewAddress({ ...addressToEdit })
      setEditingAddressId(addressId)
    } else {
      setNewAddress({
        name: "",
        recipient: "",
        phone: "",
        address: "",
        city: "Kathmandu",
        area: "",
        isDefault: false,
      })
      setEditingAddressId(null)
    }
    setAddressModalOpen(true)
  }

  const handleAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveAddress = () => {
    // Validate form
    if (!newAddress.name || !newAddress.recipient || !newAddress.phone || !newAddress.address) {
      // toast({
      //   title: "Missing information",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // })
      return
    }

    if (editingAddressId) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddressId ? { ...newAddress, id: editingAddressId } : addr)),
      )
      // toast({
      //   title: "Address updated",
      //   description: "Your address has been updated successfully.",
      // })
    } else {
      // Add new address
      const newId = Math.max(...addresses.map((a) => a.id), 0) + 1
      const deliveryCharge = newAddress.city === "Kathmandu" ? 100 : 200

      const addressToAdd = {
        ...newAddress,
        id: newId,
        deliveryCharge,
      }

      setAddresses((prev) => [...prev, addressToAdd])
      setSelectedAddressId(newId)
      // toast({
      //   title: "Address added",
      //   description: "Your new address has been added successfully.",
      // })
    }

    setAddressModalOpen(false)
  }

  const deleteAddress = (id) => {
    if (addresses.length <= 1) {
      // toast({
      //   title: "Cannot delete address",
      //   description: "You need at least one address for delivery.",
      //   variant: "destructive",
      // })
      return
    }

    setAddresses((prev) => prev.filter((addr) => addr.id !== id))

    // If the deleted address was selected, select another one
    if (id === selectedAddressId) {
      setSelectedAddressId(addresses.find((addr) => addr.id !== id)?.id)
    }

    toast({
      title: "Address deleted",
      description: "The address has been removed from your saved addresses.",
    })
  }

  const placeOrder = () => {

    toast.success('Order placed successfully!', {
      position: "top-right"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster

        toastOptions={{

          iconTheme: {
            primary: '#0055a4',
            secondary: 'white',
          },
        }}
      />
      <div className="px-4 py-8 md:py-12">

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main checkout content - 7 columns on desktop */}
          <div className="lg:col-span-7 space-y-8">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                <div className="flex items-center text-sm" style={{ color: colors.primary }}>
                  <Lock className="h-4 w-4 mr-1.5" />
                  <span>Secure Checkout</span>
                </div>
              </div>

              <div className="p-6">
                {/* Saved Addresses */}
                <div className="space-y-4 mb-6">
                  <RadioGroup
                    value={selectedAddressId.toString()}
                    onValueChange={(value) => {
                      setSelectedAddressId(Number.parseInt(value))
                    }}
                    className="space-y-4"
                  >
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={cn(
                          "border rounded-xl p-5 transition-all cursor-pointer hover:border-[#0055a4]/50",
                          selectedAddressId === address.id
                            ? "border-[#0055a4] bg-[#e6f0f9] shadow-sm"
                            : "border-gray-200",
                        )}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex items-start gap-4">
                          <RadioGroupItem id={`address-${address.id}`} value={address.id.toString()} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{address.name}</span>
                                {address.isDefault && (
                                  <Badge
                                    variant="outline"
                                    className="bg-[#e6f0f9] border-[#cce1f3]"
                                    style={{ color: colors.primary }}
                                  >
                                    Default
                                  </Badge>
                                )}
                                {address.city !== "Kathmandu" && (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                    Outside Valley
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-[#0055a4] hover:bg-[#e6f0f9]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openAddressModal(address.id)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-500 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteAddress(address.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-700 mt-1">{address.recipient}</p>
                            <p className="text-gray-500 text-sm mt-0.5">{address.phone}</p>
                            <p className="text-gray-500 text-sm mt-0.5">
                              {address.address}, {address.city}
                            </p>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                <span>
                                  {address.city === "Kathmandu" ? "Inside Valley Delivery" : "Outside Valley Delivery"}
                                </span>
                              </div>
                              <span className="text-sm font-medium">Rs. {address.deliveryCharge}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Add New Address Button */}
                <Button
                  variant="outline"
                  className="w-full border-dashed border-gray-300 text-gray-600 hover:text-[#0055a4] hover:border-[#0055a4] hover:bg-[#e6f0f9] rounded-xl py-3 h-auto"
                  onClick={() => openAddressModal()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Order Notes (Optional)</h2>
              </div>
              <div className="p-6">
                <Textarea
                  placeholder="Special instructions for delivery or food preparation"
                  className="min-h-[80px] rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>

              <div className="p-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                  className="space-y-4"
                >
                  <div
                    className={cn(
                      "border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50",
                      paymentMethod === "cod" ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm" : "border-gray-200",
                    )}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem id="cod" value="cod" className="mt-0" />
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#cce1f3", color: colors.primary }}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9M12 14.5V16.5M8.5 18H15.5C16.9045 18 17.6067 18 18.1111 17.6629C18.3295 17.517 18.517 17.3295 18.6629 17.1111C19 16.6067 19 15.9045 19 14.5V12.5C19 11.0955 19 10.3933 18.6629 9.88886C18.517 9.67048 18.3295 9.48298 18.1111 9.33706C17.6067 9 16.9045 9 15.5 9H8.5C7.09554 9 6.39331 9 5.88886 9.33706C5.67048 9.48298 5.48298 9.67048 5.33706 9.88886C5 10.3933 5 11.0955 5 12.5V14.5C5 15.9045 5 16.6067 5.33706 17.1111C5.48298 17.3295 5.67048 17.517 5.88886 17.6629C6.39331 18 7.09554 18 8.5 18Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="cod" className="font-medium text-gray-900 cursor-pointer">
                          Cash on Delivery
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
                      </div>
                    </div>

                    {paymentMethod === "cod" && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 font-medium">No advance payment required</p>
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            You'll pay the full amount when your order is delivered
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50",
                      paymentMethod === "bank-transfer"
                        ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm"
                        : "border-gray-200",
                    )}
                    onClick={() => setPaymentMethod("bank-transfer")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem id="bank-transfer" value="bank-transfer" className="mt-0" />
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#cce1f3", color: colors.primary }}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 21H21M3 18H21M5 18V13M9 18V13M15 18V13M19 18V13M3 10L12 3L21 10H3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="bank-transfer" className="font-medium text-gray-900 cursor-pointer">
                          Bank Transfer
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Pay directly from your bank account</p>
                      </div>
                    </div>

                    {paymentMethod === "bank-transfer" && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h3 className="font-medium text-gray-900">Bank Transfer Details</h3>
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-gray-500">Bank Name:</span> Nepal Bank Ltd.
                              </p>
                              <p>
                                <span className="text-gray-500">Account Name:</span> Arksh Food Pvt. Ltd.
                              </p>
                              <p>
                                <span className="text-gray-500">Account Number:</span> 01234567890123
                              </p>
                              <p>
                                <span className="text-gray-500">Branch:</span> Thamel, Kathmandu
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                              <Image
                                src="/placeholder.svg?height=150&width=150"
                                alt="Payment QR Code"
                                width={150}
                                height={150}
                                className="rounded"
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">Scan to pay directly</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-3">
                            Please upload your payment receipt after making the transfer.
                          </p>

                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#0055a4] transition-colors">
                            <input
                              type="file"
                              id="receipt"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="receipt" className="cursor-pointer block">
                              {filePreview ? (
                                <div className="flex flex-col items-center">
                                  <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
                                    <Image
                                      src={filePreview || "/placeholder.svg"}
                                      alt="Receipt preview"
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <p className="text-sm font-medium text-gray-700">{selectedFile?.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {selectedFile ? `${(selectedFile.size / 1024).toFixed(2)} KB` : ""}
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 text-xs border-[#0055a4] text-[#0055a4] hover:bg-[#e6f0f9]"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setSelectedFile(null)
                                      setFilePreview(null)
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center">
                                  <Upload className="h-8 w-8 text-[#3387cf] mb-2" />
                                  <p className="text-sm font-medium text-gray-700">Click to upload payment receipt</p>
                                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 5MB</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50",
                      paymentMethod === "esewa" ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm" : "border-gray-200",
                    )}
                    onClick={() => setPaymentMethod("esewa")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem id="esewa" value="esewa" className="mt-0" />
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(54, 183, 229, 0.3)", color: colors.secondary }}
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H14.8C15.9201 20 16.4802 20 16.908 19.782C17.2843 19.5903 17.5903 19.2843 17.782 18.908C18 18.4802 18 17.9201 18 16.8V16M8 8H13M18 14H20.5C20.7761 14 21 13.7761 21 13.5V10.5C21 10.2239 20.7761 10 20.5 10H18C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="esewa" className="font-medium text-gray-900 cursor-pointer">
                          eSewa
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Pay using your eSewa digital wallet</p>
                      </div>
                    </div>

                    {paymentMethod === "esewa" && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm mb-3">
                            <Image
                              src="/placeholder.svg?height=120&width=120"
                              alt="eSewa QR Code"
                              width={120}
                              height={120}
                              className="rounded"
                            />
                          </div>
                          <p className="text-sm text-gray-700 font-medium">Scan to pay with eSewa</p>
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            Open your eSewa app, scan this QR code and confirm payment
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>

                <div className="flex items-center text-sm text-gray-600 mt-6">
                  <Shield className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                  <span>Your payment information is processed securely</span>
                </div>
              </div>
            </div>

          </div>

          {/* Order summary - 5 columns on desktop */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm sticky top-6">
              <div className="p-6 border-b border-gray-100" style={{ backgroundColor: "#e6f0f9" }}>
                <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-5">
                  {cartItems.map((item) => {
                    const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)

                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          {item.quantity > 1 && (
                            <div
                              className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: colors.primary }}
                            >
                              {item.quantity}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-gray-500">
                              {item.discountPercentage > 0 ? (
                                <div className="flex items-center">
                                  <span className="text-red-500">Rs. {discountedPrice.toFixed(0)}</span>
                                  <span className="text-gray-400 line-through text-xs ml-1">Rs. {item.price}</span>
                                </div>
                              ) : (
                                <span>Rs. {item.price}</span>
                              )}
                              {item.quantity > 1 && <span className="ml-1">× {item.quantity}</span>}
                            </div>
                            <div className="font-medium text-gray-900">Rs. {calculateItemTotal(item).toFixed(0)}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>Rs. {deliveryCharge}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-xl" style={{ color: colors.primary }}>
                      Rs. {total.toFixed(0)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">Including all taxes</div>
                </div>

                {/* Delivery Information */}
                {selectedAddress && (
                  <div className="border-t border-gray-100 pt-5 mb-6">
                    <h3 className="font-medium mb-3" style={{ color: colors.primary }}>
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" style={{ color: colors.primary }} />
                        <div>
                          <p className="font-medium text-gray-900">{selectedAddress.recipient}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{selectedAddress.phone}</p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {selectedAddress.address}, {selectedAddress.city}
                          </p>
                          <div className="flex items-center mt-2">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "#e6f0f9", color: colors.primary }}
                            >
                              {selectedAddress.city === "Kathmandu"
                                ? "Inside Valley Delivery"
                                : "Outside Valley Delivery"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method Summary */}
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <h3 className="font-medium mb-3" style={{ color: colors.primary }}>
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                        style={{
                          backgroundColor: paymentMethod === "esewa" ? "rgba(54, 183, 229, 0.3)" : "#cce1f3",
                          color: paymentMethod === "esewa" ? colors.secondary : colors.primary,
                        }}
                      >
                        {paymentMethod === "cod" ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9M12 14.5V16.5M8.5 18H15.5C16.9045 18 17.6067 18 18.1111 17.6629C18.3295 17.517 18.517 17.3295 18.6629 17.1111C19 16.6067 19 15.9045 19 14.5V12.5C19 11.0955 19 10.3933 18.6629 9.88886C18.517 9.67048 18.3295 9.48298 18.1111 9.33706C17.6067 9 16.9045 9 15.5 9H8.5C7.09554 9 6.39331 9 5.88886 9.33706C5.67048 9.48298 5.48298 9.67048 5.33706 9.88886C5 10.3933 5 11.0955 5 12.5V14.5C5 15.9045 5 16.6067 5.33706 17.1111C5.48298 17.3295 5.67048 17.517 5.88886 17.6629C6.39331 18 7.09554 18 8.5 18Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : paymentMethod === "bank-transfer" ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M3 21H21M3 18H21M5 18V13M9 18V13M15 18V13M19 18V13M3 10L12 3L21 10H3Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H14.8C15.9201 20 16.4802 20 16.908 19.782C17.2843 19.5903 17.5903 19.2843 17.782 18.908C18 18.4802 18 17.9201 18 16.8V16M8 8H13M18 14H20.5C20.7761 14 21 13.7761 21 13.5V10.5C21 10.2239 20.7761 10 20.5 10H18C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : paymentMethod === "bank-transfer"
                              ? "Bank Transfer"
                              : "eSewa"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {paymentMethod === "cod"
                            ? "Pay when you receive your order"
                            : paymentMethod === "bank-transfer"
                              ? "Pay directly from your bank account"
                              : "Pay using your eSewa digital wallet"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="w-full mx-auto bg-[#0055a4] hover:bg-[#003d7a] rounded-lg py-3 cursor-pointer h-auto text-base font-medium transition-all hover:shadow-md" onClick={placeOrder}>
                    Place Order
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddressId ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="addressName" className="text-gray-700 font-medium">
                  Address Name
                </Label>
                <div className="relative mt-1.5">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="addressName"
                    placeholder="Home, Office, etc."
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    value={newAddress.name}
                    onChange={(e) => handleAddressChange("name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="recipientName" className="text-gray-700 font-medium">
                  Recipient Name
                </Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="recipientName"
                    placeholder="Full name"
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    value={newAddress.recipient}
                    onChange={(e) => handleAddressChange("recipient", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={newAddress.phone}
                  onChange={(e) => handleAddressChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700 font-medium">
                Full Address
              </Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="address"
                  placeholder="Street address, apartment, etc."
                  className="pl-10 min-h-[80px] rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={newAddress.address}
                  onChange={(e) => handleAddressChange("address", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city" className="text-gray-700 font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="mt-1.5 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={newAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="area" className="text-gray-700 font-medium">
                  Area
                </Label>
                <Input
                  id="area"
                  placeholder="Area/Neighborhood"
                  className="mt-1.5 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={newAddress.area}
                  onChange={(e) => handleAddressChange("area", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="defaultAddress"
                className="rounded-sm"
                style={{ color: colors.primary }}
                checked={newAddress.isDefault}
                onCheckedChange={(checked) => handleAddressChange("isDefault", checked)}
              />
              <Label htmlFor="defaultAddress" className="text-sm text-gray-600">
                Set as default address
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressModalOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button
              className="rounded-lg text-white"
              style={{ backgroundColor: colors.primary, ":hover": { backgroundColor: colors.primaryDark } }}
              onClick={saveAddress}
            >
              {editingAddressId ? "Update Address" : "Save Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
