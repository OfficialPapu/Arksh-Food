"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User, Package, MapPin, LogOut, Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import Dashboard from "@/Components/Website/Account/MyAccount/Dashboard";
import OrdersSummary from "@/Components/Website/Account/MyAccount/OrdersSummary";
import AddressData from "@/Components/Website/Account/MyAccount/AddressData";
import axios from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@/Components/Redux/ClientSlices/LoginSlice";
import { ClearCart } from "@/Components/Redux/ClientSlices/CartSlice";

export default function Account() {
    const [userDetails, setUserDetails] = useState(null);
    const [Addresses, setAddresses] = useState(null);
    const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
    const router = useRouter();
    const { section } = useParams();

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <User className="h-5 w-5" /> },
        { id: "orders", label: "Orders", icon: <Package className="h-5 w-5" /> },
        { id: "addresses", label: "Addresses", icon: <MapPin className="h-5 w-5" /> },
    ];

    const validTabs = new Set(navItems.map((item) => item.id));
    const activeSection = validTabs.has(section) ? section : "dashboard";

    const fetchData = async () => {
        try {
            const response = await axios.get(`api/users/${UserID}`);
            setUserDetails(response.data);
        } catch (error) { }
    };

    const GetInitialAddress = async () => {
        const response = await axios.get(`api/checkout/delivery/${UserID}`);
        if (response.status === 200) {
            const newAddresses = Object.values(response.data);
            setAddresses(newAddresses);
        }
    };

    useEffect(() => {
        fetchData();
        GetInitialAddress();
    }, []);

    const handleNavigation = (sectionId) => {
        router.push(`/account/${sectionId}`);
    };

    const dispatch = useDispatch();
    const Logoutfunction = async () => {
        const response = await axios.get("api/auth/logout");
        if (response.status === 200) {
            dispatch(Logout());
            dispatch(ClearCart());
            router.push("/");
        } else {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
                <h1 className="ml-3 text-xl font-bold text-[#0055a4]">Account</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] p-0">
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center">
                                    <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-[#f3f7fa]">
                                        {userDetails?.ProfilePic ? (
                                            <AvatarImage
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userDetails?.ProfilePic}`}
                                                alt={userDetails?.Name}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-xl font-medium">
                                                {userDetails?.Name?.split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">{userDetails?.Name}</p>
                                        <p className="text-xs text-gray-500">{userDetails?.Email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto py-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`w-full flex items-center px-6 py-3 text-left ${activeSection === item.id
                                            ? "bg-[#e6f0f9] text-[#0055a4] font-medium"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        onClick={() => handleNavigation(item.id)}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 border-t border-gray-100">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-red-200 text-red-500 hover:bg-red-50"
                                    onClick={() => Logoutfunction()}
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>

            {/* Desktop Layout */}
            <div className="flex flex-col lg:flex-row">
                <aside className="hidden lg:block w-[18rem] border-r border-gray-100 min-h-screen bg-white">
                    <div className="p-6">
                        <div className="flex items-center">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-[#f3f7fa]">
                                {userDetails?.ProfilePic ? (
                                    <AvatarImage
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userDetails?.ProfilePic}`}
                                        alt={userDetails?.Name}
                                        className="object-cover"
                                    />
                                ) : (
                                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-xl font-medium">
                                        {userDetails?.Name?.split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="ml-1">
                                <p className="font-medium text-gray-900">{userDetails?.Name}</p>
                                <p className="text-xs text-gray-500">{userDetails?.Email}</p>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`w-full flex items-center px-6 py-3.5 text-left ${activeSection === item.id
                                    ? "bg-[#e6f0f9] text-[#0055a4] font-medium border-r-4 border-[#0055a4]"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                onClick={() => handleNavigation(item.id)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <div className="absolute bottom-0 w-64 p-6 border-t border-gray-100">
                        <Button
                            variant="outline"
                            className="w-full justify-start border-red-200 text-red-500 hover:bg-red-50"
                            onClick={() => Logoutfunction()}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </aside>

                <main className="flex-1 min-h-screen bg-gray-50">
                    {activeSection === "dashboard" && (
                        <Dashboard userDetails={userDetails} fetchData={fetchData} />
                    )}
                    {activeSection === "orders" && (
                        <OrdersSummary userDetails={userDetails} />
                    )}
                    {activeSection === "addresses" && (
                        <AddressData Addresses={Addresses} />
                    )}
                </main>
            </div>
        </div>
    );
}
