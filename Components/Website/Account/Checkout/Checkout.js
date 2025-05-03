"use client"

import { useEffect, useState } from "react"
import {
  Home,
  Lock,
  MapPin,
  Phone,
  Plus,
  Shield,
  User,
  Upload,
  CheckCircle,
  ReceiptText,
  Loader2,
  IdCard,
  Check,
  MessageCircleWarning,
  Wallet,
  LockKeyhole,
  Banknote,
  TagIcon,
  Package,
  Download,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup } from "@/Components/ui/radio-group"
import { Separator } from "@/Components/ui/separator"
import { Textarea } from "@/Components/ui/textarea"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import toast, { Toaster } from "react-hot-toast"
import useCheckoutActions from "@/Components/Hooks/Checkout"
import useCartActions from "@/Components/Hooks/Cart"
import { UpdatePaymentMethod } from "@/Components/Redux/Slices/CheckoutSlice"


export default function CheckoutPage() {

  const { Total, CartItems, Subtotal, Discount, PickupCost, PickupLocation } = useCartActions();
  const { AddressID, HandelCheckout, PaymentMethod, router, handleAddressSubmit, handleAddressChange, dialogOpen, setDialogOpen, NewAddress, Addresses, dispatch, UpdateAddress, isSubmitting, handleFileChange, filePreview, setFilePreview, selectedFile, setSelectedFile } = useCheckoutActions();
  useEffect(() => {
    if (!(CartItems?.length > 0)) router.push('/account/cart');
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="px-1 sm:px-4 mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">


          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#e6f0f9] to-white">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Select Address</h1>
                  <p className="text-gray-500 mt-1">Choose your preferred delivery location</p>
                </div>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-[#0055a4] text-white rounded-lg hover:bg-[#00458c] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">New Address</span>
                </button>
              </div>
              <div className="p-6 max-w-4xl mx-auto">
                {Addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Addresses.map((address) => (
                      <div
                        key={address.ID}
                        onClick={() => dispatch(UpdateAddress({ Address: address }))}
                        className={`p-5 rounded-xl border-2 transition-all cursor-pointer
            ${AddressID === address.ID
                            ? "border-[#0055a4] bg-[#f8faff] shadow-[0_4px_20px_rgba(0,85,164,0.1)]"
                            : "border-gray-200 hover:border-[#0055a4]/50 hover:shadow-sm"}
          `}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{address.AddressName}</h3>
                            </div>
                            <div className="space-y-1.5 text-gray-700">
                              <p>{address.Name}</p>
                              <p>{address.Phone}</p>
                              <p className="text-gray-600">{address.Address}, {address.City}</p>
                            </div>
                          </div>

                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
              ${AddressID === address.ID
                              ? "bg-[#0055a4] border-[#0055a4]"
                              : "border-gray-300"}
            `}>
                            {AddressID === address.ID && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-12 text-center">
                    <div className="mx-auto w-24 h-24 bg-[#0055a4]/10 rounded-full flex items-center justify-center mb-6">
                      <MapPin className="w-10 h-10 text-[#0055a4]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No addresses saved</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Add your first address to enable faster checkouts
                    </p>
                    <button
                      onClick={() => setDialogOpen(true)}
                      className="px-8 py-3 bg-[#0055a4] text-white rounded-lg hover:bg-[#00458c] transition-colors font-medium"
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </div>
            </div>


            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#e6f0f9] to-white">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <IdCard className="h-5 w-5 mr-2 text-[#0055a4]" />
                  Payment Method
                </h2>
              </div>
              <div className="p-6">
                <RadioGroup
                  value={PaymentMethod}
                  onValueChange={() => dispatch(UpdatePaymentMethod({ PaymentMethod: value }))}
                  className="space-y-4"
                >
                  {/* Cash on Delivery Option */}
                  <div
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50 ${PaymentMethod === "Cash on delivery"
                      ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm"
                      : "border-gray-200"
                      }`}
                    onClick={() => dispatch(UpdatePaymentMethod({ PaymentMethod: "Cash on delivery" }))}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${PaymentMethod === "Cash on delivery"
                        ? "bg-[#0055a4] text-white"
                        : "border-2 border-gray-200"
                        }`}>
                        {PaymentMethod === "Cash on delivery" && <Check className="p-1" />}
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#cce1f3] text-[#0055a4]">
                        <LockKeyhole className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="Cash on delivery" className="font-medium text-gray-900 cursor-pointer">
                          Cash on Delivery
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
                      </div>
                    </div>

                    {PaymentMethod === "Cash on delivery" && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2 text-[#0055a4]">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <p className="text-sm font-medium">No advance payment required</p>
                          </div>
                          <p className="text-xs text-gray-500 text-center">
                            You'll pay the full amount when your order is delivered
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bank Transfer Option */}
                  <div
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50 ${PaymentMethod === "Bank"
                      ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm"
                      : "border-gray-200"
                      }`}
                    onClick={() => dispatch(UpdatePaymentMethod({ PaymentMethod: "Bank" }))}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${PaymentMethod === "Bank"
                        ? "bg-[#0055a4] text-white"
                        : "border-2 border-gray-200"
                        }`}>
                        {PaymentMethod === "Bank" && <Check className="p-1" />}
                      </div>

                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#cce1f3] text-[#0055a4]">
                        <Banknote className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        <Label htmlFor="Bank" className="font-medium text-gray-900 cursor-pointer">
                          Bank Transfer
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Pay directly from your bank account
                        </p>
                      </div>
                    </div>

                    {PaymentMethod === "Bank" && (
                      <div className="mt-5 pt-5 border-t border-gray-100 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 flex items-center">
                              <MessageCircleWarning className="h-4 w-4 mr-2 text-[#0055a4]" />
                              Bank Transfer Details
                            </h3>

                            <div className="space-y-2 text-sm bg-[#e6f0f9]/30 p-4 rounded-lg border border-[#cce1f3]">
                              <p>
                                <span className="text-gray-500">Bank Name:</span>{" "}
                                <span className="font-medium">Prabhu Bank LTD.</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Account Name:</span>{" "}
                                <span className="font-medium">ARKSH INDUSTRIES PVT. LTD.</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Account Number:</span>{" "}
                                <span className="font-medium">1110156077300019</span>
                              </p>
                              <p>
                                <span className="text-gray-500">BankCode:</span>{" "}
                                <span className="font-medium">PRVUNPKA</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                              <img
                                src="/Prabhu Bank Qr.jpg"
                                alt="Payment QR Code"
                                width={160}
                                height={160}
                                className="rounded"
                              />
                            </div>
                            <p className="text-xs text-gray-500 text-center">Scan to pay directly</p>
                            <a
                              href="/Prabhu Bank Qr.jpg"
                              download="Arksh_Food_Prabhu_Bank_QR"
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0055a4] rounded-lg shadow hover:bg-[#004080] transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              Download QR
                            </a>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            <Upload className="h-4 w-4 mr-2 text-[#0055a4]" />
                            Please upload your payment receipt after making the transfer.
                          </p>

                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#0055a4] transition-colors">
                            <input
                              type="file"
                              id="receipt"
                              className="hidden"
                              accept="image/*,application/pdf"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="receipt" className="cursor-pointer block">
                              {filePreview ? (
                                <div className="flex flex-col items-center">
                                  <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
                                    <img
                                      src={filePreview || "/placeholder.svg"}
                                      alt="Receipt preview"
                                      className="object-contain w-full h-full"
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
                                      e.preventDefault();
                                      setSelectedFile(null);
                                      setFilePreview(null);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center">
                                  <Upload className="h-8 w-8 text-[#36b7e5] mb-2" />
                                  <p className="text-sm font-medium text-gray-700">
                                    Click to upload payment receipt
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, or PDF up to 5MB
                                  </p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* eSewa Option */}
                  <div
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:border-[#0055a4]/50 ${PaymentMethod === "eSewa"
                      ? "border-[#0055a4] bg-[#e6f0f9]/50 shadow-sm"
                      : "border-gray-200"
                      }`}
                    onClick={() => dispatch(UpdatePaymentMethod({ PaymentMethod: "eSewa" }))}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${PaymentMethod === "eSewa"
                        ? "bg-[#0055a4] text-white"
                        : "border-2 border-gray-200"
                        }`}>
                        {PaymentMethod === "eSewa" && <Check className="p-1" />}
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(54,183,229,0.3)] text-[#36b7e5]">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="eSewa" className="font-medium text-gray-900 cursor-pointer">
                          eSewa
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">Pay using your eSewa digital wallet</p>
                      </div>
                    </div>

                    {PaymentMethod === "eSewa" && (
                      <div className="mt-5 pt-5 border-t border-gray-100 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 flex items-center">
                              <MessageCircleWarning className="h-4 w-4 mr-2 text-[#0055a4]" />
                              eSewa Payment Details
                            </h3>

                            <div className="space-y-2 text-sm bg-[#e6f0f9]/30 p-4 rounded-lg border border-[#cce1f3]">
                              <p>
                                <span className="text-gray-500">eSewa ID:</span>{" "}
                                <span className="font-medium">ARKSH_INDUSTRIES</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Registered Name:</span>{" "}
                                <span className="font-medium">ARKSH INDUSTRIES PVT. LTD.</span>
                              </p>
                              <p>
                                <span className="text-gray-500">Contact:</span>{" "}
                                <span className="font-medium">+977-9841234567</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                              <img
                                src="/Prabhu Bank Qr.jpg"
                                alt="eSewa QR Code"
                                width={160}
                                height={160}
                                className="rounded"
                              />
                            </div>
                            <p className="text-xs text-gray-500 text-center">Scan to pay with eSewa</p>
                            <a
                              href="/Prabhu Bank Qr.jpg"
                              download="Arksh_Food_Prabhu_Bank_QR"
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0055a4] rounded-lg shadow hover:bg-[#004080] transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              Download QR
                            </a>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            <Upload className="h-4 w-4 mr-2 text-[#0055a4]" />
                            Please upload your payment receipt after making the payment.
                          </p>

                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#0055a4] transition-colors">
                            <input
                              type="file"
                              id="esewa-receipt"
                              className="hidden"
                              accept="image/*,application/pdf"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="esewa-receipt" className="cursor-pointer block">
                              {filePreview ? (
                                <div className="flex flex-col items-center">
                                  <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
                                    <img
                                      src={filePreview || "/placeholder.svg"}
                                      alt="Receipt preview"
                                      className="object-contain w-full h-full"
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
                                      e.preventDefault();
                                      setSelectedFile(null);
                                      setFilePreview(null);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center">
                                  <Upload className="h-8 w-8 text-[#36b7e5] mb-2" />
                                  <p className="text-sm font-medium text-gray-700">
                                    Click to upload payment receipt
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, or PDF up to 5MB
                                  </p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>

                <div className="flex items-center text-sm text-gray-600 mt-6">
                  <Shield className="h-4 w-4 mr-2 text-[#0055a4]" />
                  <span>Your payment information is processed securely</span>
                </div>
              </div>

            </div>
          </div>

          {/* Order summary - 5 columns on desktop */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm sticky top-6 border border-gray-100 transition-all hover:shadow-md">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#e6f0f9] to-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <ReceiptText className="h-5 w-5 mr-2 text-[#0055a4]" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-5 custom-scrollbar">
                  {CartItems.map((item) => {
                    return (
                      <div key={item.ProductID} className="flex gap-4 group">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 group-hover:border-[#0055a4] transition-all">
                          <img src={item.Image || "/placeholder.svg"} alt={item.Name} fill className="object-cover" />
                          <div className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center bg-[#0055a4]">
                            {item.Quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 !text-sm font-medium text-gray-900 sm:mb-2 !sm:text-base hover:text-[#0055a4] line-clamp-2">{item.Name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-gray-500">
                              {item.Discount > 0 ? (
                                <div className="flex items-center">
                                  <span className="text-red-500">Rs. {item.PriceAfterDiscount}</span>
                                  <span className="text-gray-400 line-through text-xs ml-1">Rs. {item.Price}</span>
                                </div>
                              ) : (
                                <span>Rs. {item.Price}</span>
                              )}
                              {item.quantity > 1 && <span className="ml-1">× {item.Quantity}</span>}
                            </div>
                            {item.Discount ? (
                              <div className="font-medium text-gray-900">Rs. {item.PriceAfterDiscount * item.Quantity}</div>
                            ) : (
                              <div className="font-medium text-gray-900">Rs. {item.Price * item.Quantity}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Pickup</span>
                    <span>{PickupLocation}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {Subtotal.toFixed(0)}</span>
                  </div>

                  {Discount ? (
                    <div className="flex justify-between py-1">
                      <span className="flex items-center gap-1 text-green-600">
                        <TagIcon className="h-4 w-4" />
                        Discount
                      </span>
                      <span className="text-green-600 font-medium">- Rs. {Discount.toLocaleString()}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{PickupCost == 0 ? "Free" : "Rs. " + PickupCost}</span>
                  </div>
                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-xl text-[#0055a4]">Rs. {Total.toFixed(0)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">Including all taxes</div>
                </div>


                {/* Place Order Button */}
                <div className="flex justify-end">
                  <Button
                    className="w-full mx-auto bg-[#0055a4] hover:bg-[#003d7a] rounded-lg py-3 cursor-pointer h-auto text-base font-medium transition-all hover:shadow-md flex items-center justify-center"
                    onClick={HandelCheckout}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <Lock className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#0055a4] flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Add New Address
            </DialogTitle>
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
                    Name="AddressName"
                    placeholder="Home, Office, etc."
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    value={NewAddress.AddressName}
                    onChange={handleAddressChange}
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
                    name="Name"
                    placeholder="Full name"
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                    value={NewAddress.Name}
                    onChange={handleAddressChange}
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
                  type="number"
                  name="Phone"
                  placeholder="Enter your phone number"
                  className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={NewAddress.Phone}
                  onChange={handleAddressChange}
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
                  name="Address"
                  placeholder="Street address, apartment, etc."
                  className="pl-10 min-h-[80px] rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                  value={NewAddress.Address}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city" className="text-gray-700 font-medium">
                City
              </Label>
              <Input
                id="city"
                name="City"
                placeholder="City"
                className="mt-1.5 h-11 rounded-lg border-gray-200 focus:border-[#0055a4] focus:ring-[#0055a4]"
                value={NewAddress.City}
                onChange={handleAddressChange}
              />
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button className="rounded-lg text-white bg-[#0055a4] hover:bg-[#003d7a]" onClick={handleAddressSubmit}>
              Save Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
