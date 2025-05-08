"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Edit,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  UserCog,
  Clock,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Download,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Progress } from "@/Components/ui/progress";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import { getStatusColor } from "@/Components/ui/getStatusColor";
import { format } from "date-fns";

export default function UserDetailsPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { UserID } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`api/users/${UserID}`);
      const data = response.data;
      setUserDetails(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [UserID]);

  const totalSpent =
    userDetails?.Orders.reduce((sum, order) => sum + order.GrandTotal, 0) || 0;
  const avgOrderValue = userDetails?.Orders.length
    ? Math.round(totalSpent / userDetails.Orders.length)
    : 0;

  const formatDate = (dateString) => format(new Date(dateString), "MMM d, yyyy");

  // Get the last order date
  const lastOrderDate = userDetails?.Orders.length
    ? formatDate(userDetails.Orders[0].CreatedAt)
    : "N/A";

  // Calculate time since user joined
  const getTimeSinceJoined = (dateString) => {
    const joinDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f3f7fa] via-[#f8fafc] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f3f7fa] via-[#f8fafc] to-white">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-500 mb-4">
            The requested user could not be found.
          </p>
          <Button asChild>
            <Link href="/admin/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Enhanced header with glassmorphism */}
        <header className="relative shadow-md backdrop-blur-sm">
          <div className="flex gap-4 sm:flex-row sm:items-center sm:justify-between py-4 sm:px-8 px-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="rounded-full p-1.5 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-[#f3f7fa]">
                      {userDetails.ProfilePic ? (
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userDetails.ProfilePic}`}
                          alt={userDetails.Name}
                        />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-xl font-medium">
                          {userDetails.Name.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  {userDetails.Role.includes("Admin") && (
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-white">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                      <ShieldCheck className="h-3.5 w-3.5 drop-shadow-md" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userDetails.Name}
                    </h1>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-gray-500">
                    <Mail className="h-5 mt-[3px]" />
                    <span>{userDetails.Email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </header>

        {/* Enhanced tabs navigation */}
        <div className="bg-white/80 border-b border-gray-200/50 backdrop-blur-sm">
          <div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="!shadow-none rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="!shadow-none rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Orders
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Main content */}
              <div className="py-8">
                <TabsContent value="overview">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Stats cards */}
                    <div className="grid gap-6 md:col-span-2">
                      <div className="grid gap-6 sm:grid-cols-3">
                        <Card className="group overflow-hidden border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:h-1" />
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-500">
                                Total Spent
                              </h3>
                              <div className="rounded-full bg-green-100 p-1.5 text-green-600 transition-all duration-200 group-hover:bg-green-200 group-hover:scale-110">
                                <CreditCard className="h-4 w-4" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-gray-900">
                                Rs. {totalSpent.toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Lifetime spending
                            </p>
                            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#f3f7fa]">
                              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="group overflow-hidden border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:h-1" />
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-500">
                                Orders
                              </h3>
                              <div className="rounded-full bg-blue-100 p-1.5 text-blue-600 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <ShoppingBag className="h-4 w-4" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-gray-900">
                                {userDetails.Orders.length}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Total orders placed
                            </p>
                            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#f3f7fa]">
                              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="group overflow-hidden border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 group-hover:h-1" />
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-500">
                                Avg. Order
                              </h3>
                              <div className="rounded-full bg-purple-100 p-1.5 text-purple-600 transition-all duration-200 group-hover:bg-purple-200 group-hover:scale-110">
                                <BarChart3 className="h-4 w-4" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-gray-900">
                                Rs. {avgOrderValue.toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Last order {lastOrderDate}
                            </p>
                            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#f3f7fa]">
                              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-pulse"></div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recent orders */}
                      <Card className="group border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:h-1" />
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900">
                                Recent Orders
                              </CardTitle>
                              <CardDescription className="text-gray-500">
                                Latest purchase activity
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {userDetails.Orders.slice(0, 3).map((order) => (
                              <div
                                key={order._id}
                                className="group flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105">
                                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {order.OrderID}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatDate(order.CreatedAt)} •{" "}
                                      {order.Items.length} items
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-gray-900">
                                    Rs. {order.GrandTotal.toLocaleString()}
                                  </div>
                                  <Badge
                                    className={`${getStatusColor(
                                      order?.Shipping?.Status
                                    )} px-2.5 py-0.5 text-xs font-medium w-[80px] text-center`}
                                  >
                                    {order.Shipping.Status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Order summary */}
                      <Card className="border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900">
                                Order Summary
                              </CardTitle>
                              <CardDescription className="text-gray-500">
                                Purchase breakdown
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-green-100 p-1.5 text-green-600">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  Total Orders
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {userDetails.Orders.length}
                              </div>
                            </div>
                            <Progress value={100} className="h-2 bg-gray-100" />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-100 p-1.5 text-blue-600">
                                  <CreditCard className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  Total Spent
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                Rs. {totalSpent.toLocaleString()}
                              </div>
                            </div>
                            <Progress value={100} className="h-2 bg-gray-100" />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-purple-100 p-1.5 text-purple-600">
                                  <ShoppingBag className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  Total Items
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {userDetails.Orders.reduce(
                                  (sum, order) => sum + order.Items.length,
                                  0
                                )}
                              </div>
                            </div>
                            <Progress value={100} className="h-2 bg-gray-100" />

                            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
                              <div className="font-medium text-gray-900">
                                Average Order Value
                              </div>
                              <div className="font-bold text-gray-900">
                                Rs. {avgOrderValue.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* User info card */}
                    <div className="space-y-6">
                      <Card className="group border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:h-1" />
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <Mail className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Email
                                </div>
                                <div className="font-medium text-gray-900">
                                  {userDetails.Email}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <Phone className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Phone
                                </div>
                                <div className="font-medium text-gray-900">
                                  {userDetails.Mobile}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <MapPin className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Location
                                </div>
                                <div className="font-medium text-gray-900">
                                  {userDetails.City ||
                                    userDetails.Country ||
                                    "Not specified"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <Calendar className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Joined
                                </div>
                                <div className="font-medium text-gray-900">
                                  {formatDate(userDetails.CreatedAt)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <Clock className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Account Age
                                </div>
                                <div className="font-medium text-gray-900">
                                  {getTimeSinceJoined(userDetails.CreatedAt)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <UserCog className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Account Type
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  {userDetails.Role.map((role, index) => (
                                    <Badge
                                      key={index}
                                      className={
                                        role === "Admin"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-gray-100 text-gray-700"
                                      }
                                    >
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Login Count
                                </div>
                                <div className="font-medium text-gray-900">
                                  {userDetails.LoginCount} times
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Delivery addresses if available */}
                      {userDetails.Orders.length > 0 &&
                        userDetails.Orders[0].Delivery && (
                          <Card className="border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold text-gray-900">
                                Delivery Address
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="font-medium">
                                  {userDetails.Orders[0].Delivery.Name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {userDetails.Orders[0].Delivery.Phone}
                                </div>
                                <div className="text-sm text-gray-700">
                                  {userDetails.Orders[0].Delivery.Address},{" "}
                                  {userDetails.Orders[0].Delivery.City}
                                  {userDetails.Orders[0].Delivery.PostalCode &&
                                    `, ${userDetails.Orders[0].Delivery.PostalCode}`}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                  Address Name:{" "}
                                  {userDetails.Orders[0].Delivery.AddressName}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders" id="orders">
                  <Card className="border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            Order History
                          </CardTitle>
                          <CardDescription className="text-gray-500">
                            Complete purchase history
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userDetails.Orders.length > 0 ? (
                          userDetails.Orders.map((order) => (
                            <div
                              key={order._id}
                              className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-md gap-4"
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105">
                                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {order.OrderID}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {formatDate(order.CreatedAt)} •{" "}
                                    {order.Items.length} items
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4 ml-16 sm:ml-0">
                                <Badge
                                  className={`${getStatusColor(
                                    order?.Shipping?.Status
                                  )} px-2.5 py-0.5 text-xs font-medium w-[80px] text-center`}
                                >
                                  {order.Shipping.Status}
                                </Badge>
                                <div className="text-right">
                                  <div className="font-medium text-gray-900">
                                    Rs. {order.GrandTotal.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <CreditCard className="h-3 w-3" />
                                      <span>{order.Payment.Method}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              No orders yet
                            </h3>
                            <p className="text-gray-500 max-w-sm">
                              This user hasn't placed any orders yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
