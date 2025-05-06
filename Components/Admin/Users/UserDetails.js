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
  Star,
  User,
  UserCog,
  Clock,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  ChevronDown,
  Download,
  Share2,
  MessageSquare,
  Bell,
  Settings,
  Shield,
  Trash2,
  RefreshCw,
  ExternalLink,
  Bookmark,
  Heart,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";




// Sample user data
const users = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    joined: "Jan 10, 2023",
    avatar: "/placeholder.svg?height=96&width=96",
    initials: "JD",
    vip: true,
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    joined: "Feb 15, 2023",
    avatar: "/placeholder.svg?height=96&width=96",
    initials: "JS",
    vip: false,
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
  },
];

// Sample order data
const orders = [
  {
    id: "ORD-5523",
    date: "Apr 12, 2023",
    items: 3,
    total: 129.99,
    status: "Delivered",
  },
  {
    id: "ORD-4298",
    date: "Mar 5, 2023",
    items: 1,
    total: 49.99,
    status: "Delivered",
  },
  {
    id: "ORD-3167",
    date: "Feb 22, 2023",
    items: 2,
    total: 87.5,
    status: "Delivered",
  },
  {
    id: "ORD-7102",
    date: "Apr 28, 2023",
    items: 4,
    total: 210.75,
    status: "Processing",
  },
  {
    id: "ORD-8901",
    date: "May 15, 2023",
    items: 2,
    total: 75.25,
    status: "Shipped",
  },
];


export default function UserDetails({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [UserDetails, setUserDetails] = useState([]);
  const Params = useParams();
  const userId = Params.UserID;
  const user = users.find((u) => u.id === userId) || users[0];

  const fetchData = async () => {
    try {
      const response = await axios.get(`api/admin/users/${userId}`)
      const data = response.data
      setUserDetails(data)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7fa] via-[#f8fafc] to-white">
      <div className="relative">
        {/* Enhanced header with glassmorphism */}
        <header className="relative shadow-md backdrop-blur-sm">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-10 w-10 rounded-full text-gray-500 hover:bg-[#f3f7fa] hover:text-blue-600 transition-all duration-200"
                      >
                        <Link href="/admin/users">
                          <ArrowLeft className="h-5 w-5" />
                          <span className="sr-only">Back</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Back to users list</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="rounded-full p-1.5 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-[#f3f7fa]">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-xl font-medium">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {user.vip && (
                      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md">
                        <Star className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                        user.status === "Active"
                          ? "bg-green-500"
                          : user.status === "Inactive"
                          ? "bg-gray-400"
                          : "bg-blue-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.name}
                      </h1>
                      <Badge
                        className={`ml-2 ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700 flex items-center gap-1"
                            : user.status === "Inactive"
                            ? "bg-gray-100 text-gray-700 flex items-center gap-1"
                            : "bg-blue-100 text-blue-700 flex items-center gap-1"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Active"
                              ? "bg-green-500"
                              : user.status === "Inactive"
                              ? "bg-gray-500"
                              : "bg-blue-500"
                          }`}
                        />
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 border-gray-200 hover:bg-[#f3f7fa] hover:text-blue-600 transition-all duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Actions</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced tabs navigation */}
        <div className="bg-white/80 border-b border-gray-200/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs
              defaultValue="overview"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Orders
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Main content */}
              <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <TabsContent value="overview">
                  <div className="grid gap-6 md:grid-cols-3">
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
                                $1,249
                              </span>
                              <span className="ml-2 text-sm font-medium text-green-600">
                                ↑ 12%
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              From last month
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
                                8
                              </span>
                              <span className="ml-2 text-sm font-medium text-green-600">
                                ↑ 4
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              New this month
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
                                $156
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Last order 2 days ago
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
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-gray-200 hover:bg-[#f3f7fa] hover:text-blue-600 transition-all duration-200"
                            >
                              View all
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {orders.slice(0, 3).map((order) => (
                              <div
                                key={order.id}
                                className="group flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105">
                                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {order.id}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {order.date}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-gray-900">
                                    ${order.total.toFixed(2)}
                                  </div>
                                  <Badge
                                    className={`${
                                      order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Processing"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Customer lifetime value */}
                      <Card className="border border-gray-100/50 shadow-lg bg-white/90 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900">
                                Customer Lifetime Value
                              </CardTitle>
                              <CardDescription className="text-gray-500">
                                Last 12 months
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
                                  Purchases
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                $1,249.00
                              </div>
                            </div>
                            <Progress value={75} className="h-2 bg-gray-100">
                              <div className="h-full bg-gradient-to-r from-green-400 to-green-600" />
                            </Progress>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-red-100 p-1.5 text-red-600">
                                  <AlertCircle className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  Returns
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                $0.00
                              </div>
                            </div>
                            <Progress value={0} className="h-2 bg-gray-100" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-100 p-1.5 text-blue-600">
                                  <CreditCard className="h-3.5 w-3.5" />
                                </div>
                                <div className="text-sm font-medium text-gray-700">
                                  Store Credit
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                $50.00
                              </div>
                            </div>
                            <Progress value={15} className="h-2 bg-gray-100" />
                            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
                              <div className="font-medium text-gray-900">
                                Net Value
                              </div>
                              <div className="font-bold text-gray-900">
                                $1,299.00
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
                                  {user.email}
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
                                  {user.phone || "+1 (555) 123-4567"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <MapPin className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Address
                                </div>
                                <div className="font-medium text-gray-900">
                                  {user.address ||
                                    "123 Main St, Anytown, USA 12345"}
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
                                  {user.joined}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-110">
                                <Clock className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Last Active
                                </div>
                                <div className="font-medium text-gray-900">
                                  2 hours ago
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
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Customer
                                  </span>
                                  {user.vip && (
                                    <Badge className="bg-amber-100 text-amber-700">
                                      VIP
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-gray-200 hover:bg-[#f3f7fa]"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Full Profile
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-gray-200 hover:bg-[#f3f7fa]"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </CardFooter>
                      </Card>

                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-gray-200 hover:bg-gray-50"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="group flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-all duration-200 group-hover:bg-blue-200 group-hover:scale-105">
                                <ShoppingBag className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.id}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {order.date} • {order.items} items
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge
                                className={`${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Processing"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {order.status}
                              </Badge>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">
                                  ${order.total.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <CreditCard className="h-3 w-3" />
                                    <span>•••• 4242</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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


