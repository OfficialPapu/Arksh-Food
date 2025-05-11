"use client"
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react"
import { Check, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import Ordersummary from "@/Components/Website/Account/Checkout/OrderSummary"
import { ClearPaymentProof, ConvertCartToCheckout, HandelOrderPlace } from "@/Components/Redux/ClientSlices/CheckoutSlice"
import { ClearCart } from "@/Components/Redux/ClientSlices/CartSlice"
import { useRouter } from "next/navigation"
import useCartActions from "@/Components/Hooks/Cart"
import useCheckoutActions from "@/Components/Hooks/Checkout"
import axios from "@/lib/axios"
import { useSelector } from "react-redux"
import SuccessPreLoader from "./SuccessPreLoader";

const Success = () => {
    const router = useRouter();
  const [loading, setLoading] = useState(true);
    const OrderID = useSelector((state) => state.Checkout.OrderID);
    const TodayDate = format(new Date(), "d MMM yyyy");
    let { Total, Subtotal, Discount, CartItems, PickupCost, PickupLocation, UserID } = useCartActions();
    let PaymentProof = useSelector((state) => state.Checkout.PaymentScreenshot);
    const { AddressID, PaymentMethod, dispatch, } = useCheckoutActions();
    const hasPlacedOrder = useRef(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    useEffect(() => {
        if (!AddressID || !PaymentMethod) router.push('/account/cart');
        if (!CartItems?.length || hasPlacedOrder.current || isOrderPlaced) {
            setLoading(false);
            return;
        };
        hasPlacedOrder.current = true;
        setIsOrderPlaced(true);
        const placeOrder = async () => { await PlaceOrder() };
        placeOrder();
    }, []);


    const PlaceOrder = async () => {
        const orderData = { CartItems, PaymentMethod, PickupLocation, AddressID, PickupCost, Total, Subtotal, Discount, UserID, PaymentProof };
        try {
            const response = await axios.post("api/checkout/success", orderData);
            if (response.status == 201) {
                const OrderData = { OrderID: response.data.OrderID, Total, Subtotal, Discount };
                dispatch(HandelOrderPlace(OrderData));
                dispatch(ConvertCartToCheckout());
                dispatch(ClearCart());
                dispatch(ClearPaymentProof());
            }
        } catch (error) {
        }finally {
            setLoading(false);
        }
    }


    const [showDetails, setShowDetails] = useState(true)
    const { Address, Total: GrandTotal } = useSelector((state) => state.Checkout);

    if (loading) return <SuccessPreLoader />;
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl sm:p-8 py-8 px-4 mb-12 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 text-[#39b0e5]/10">
                        <LargeStar />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 text-[#0a4d8c]/10 transform rotate-45">
                        <LargeStar />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10">
                        <div className="mb-4 md:mb-0 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-[#0a4d8c]">Order Confirmation</h1>
                            <p className="text-[#39b0e5] mt-1">Thank you for choosing Arksh Food</p>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-[#f0f7ff] to-[#e6f7ff] rounded-2xl p-6 mb-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a4d8c] to-[#39b0e5]"></div>
                        <div className="absolute -right-4 -bottom-4 text-[#39b0e5]/10 w-24 h-24">
                            <LargeStar />
                        </div>

                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-md border-4 border-white">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0a4d8c] to-[#39b0e5] flex items-center justify-center">
                                <Check className="h-8 w-8 text-white" />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-xl font-bold text-[#0a4d8c] mb-1">Order Successfully Placed!</h2>
                            <p className="text-slate-600 mb-2">Your order has been received and is now being processed.</p>
                            <div className="inline-flex items-center bg-white rounded-full px-4 py-1.5 text-[#0a4d8c] font-medium border border-[#e6f0fa] shadow-sm">
                                <span className="text-[#39b0e5] mr-2">Order ID:</span> {OrderID}
                            </div>
                        </div>
                    </div>


                    {/* Order Details */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-[#0a4d8c] flex items-center justify-center mr-3">
                                    <SmallStar className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-[#0a4d8c]">Order Details</h2>
                            </div>
                            <button
                                className="flex items-center text-sm font-medium text-[#39b0e5] hover:text-[#0a4d8c] transition-colors"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                {showDetails ? "Hide" : "Show"} Details
                                <ChevronRight
                                    className={cn("h-4 w-4 ml-1 transition-transform", showDetails ? "transform rotate-90" : "")}
                                />
                            </button>
                        </div>

                        <div
                            className={cn("transition-all duration-300 overflow-hidden", showDetails ? "max-h-[1000px]" : "max-h-0")}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-[#f8fafd] rounded-2xl p-5 border border-[#e6f0fa]">
                                    <h3 className="text-sm font-medium text-[#0a4d8c] mb-4 flex items-center">
                                        <div className="w-5 h-5 rounded-full bg-[#39b0e5] flex items-center justify-center mr-2">
                                            <InfoIcon className="h-3 w-3 text-white" />
                                        </div>
                                        Order Information
                                    </h3>
                                    <ul className="space-y-3 mt-2">
                                        <li className="flex justify-between text-sm">
                                            <span className="text-slate-500">Order Date:</span>
                                            <span className="font-medium text-slate-700">{TodayDate}</span>
                                        </li>
                                        <li className="flex justify-between text-sm">
                                            <span className="text-slate-500">Payment Method:</span>
                                            <span className="font-medium text-slate-700">{PaymentMethod}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#f8fafd] rounded-2xl p-5 border border-[#e6f0fa]">
                                    <h3 className="text-sm font-medium text-[#0a4d8c] mb-4 flex items-center">
                                        <div className="w-5 h-5 rounded-full bg-[#39b0e5] flex items-center justify-center mr-2">
                                            <MapPin className="h-3 w-3 text-white" />
                                        </div>
                                        Delivery Information
                                    </h3>
                                    <ul className="space-y-3 mt-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <span className="text-slate-500 w-20">Address:</span>
                                            <span className="font-medium text-slate-700">{Address.Address}</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm">
                                            <span className="text-slate-500 w-20">Phone:</span>
                                            <span className="font-medium text-slate-700">{Address.Phone}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-[#f8fafd] rounded-2xl p-5 border border-[#e6f0fa] mb-6">
                                <h3 className="text-sm font-medium text-[#0a4d8c] mb-4 flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-[#39b0e5] flex items-center justify-center mr-2">
                                        <ShoppingBagIcon className="h-3 w-3 text-white" />
                                    </div>
                                    Order Items
                                </h3>
                                <Ordersummary />
                            </div>
                        </div>

                        <div className="flex justify-between items-center rounded-2xl p-5">
                            <span className="text-lg font-medium">Total Amount:</span>
                            <div>
                                <p className="text-2xl text-[#0055a4] font-bold">Rs. {GrandTotal?.toFixed(2)}</p>
                                <p className="text-xs text-gray-500 mt-1 text-right">Including all taxes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// Custom star icon that matches the logo
function SmallStar(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    )
}

// Large decorative star
function LargeStar(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    )
}

function InfoIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    )
}

function ShoppingBagIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}

export default Success
