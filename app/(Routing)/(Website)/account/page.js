"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  User,
  Package,
  MapPin,
  LogOut,
  Edit2,
  ShoppingBag,
  Upload,
  Plus,
  Home,
  Phone,
  Calendar,
  Clock,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Repeat,
  Star,
  Bell,
  CreditCard,
  Menu,
  Search,
  Settings,
  Shield,
  Gift,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Textarea } from "@/Components/ui/textarea"
import { Checkbox } from "@/Components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Progress } from "@/Components/ui/progress"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Separator } from "@/Components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"

// Define Arksh brand colors
const colors = {
  primary: "#0055a4",
  primaryDark: "#003d7a",
  primaryLight: "#36b7e5",
  primaryLighter: "#e6f0f9",
  background: "#f8fafc",
  card: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
}

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+977 9876543210",
  avatar: "/placeholder.svg?height=100&width=100",
  memberSince: "January 2023",
  loyaltyPoints: 350,
  nextReward: 500,
}

// Sample orders data
const orders = [
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    total: 1250,
    status: "Delivered",
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 350 },
      { name: "Vegetable Momo", quantity: 3, price: 180 },
    ],
  },
  {
    id: "ORD-12344",
    date: "May 2, 2023",
    total: 850,
    status: "Delivered",
    items: [
      { name: "Butter Chicken", quantity: 1, price: 450 },
      { name: "Garlic Naan", quantity: 4, price: 100 },
    ],
  },
  {
    id: "ORD-12343",
    date: "April 18, 2023",
    total: 1100,
    status: "Delivered",
    items: [
      { name: "Chicken Momo", quantity: 2, price: 200 },
      { name: "Veg Fried Rice", quantity: 2, price: 350 },
    ],
  },
]

// Sample addresses
const addresses = [
  {
    id: 1,
    name: "Home",
    recipient: "John Doe",
    phone: "+977 9876543210",
    address: "123 Main Street, Thamel",
    city: "Kathmandu",
    area: "Thamel",
    isDefault: true,
    deliveryCharge: 100,
  },
  {
    id: 2,
    name: "Office",
    recipient: "John Doe",
    phone: "+977 9876543211",
    address: "456 Business Avenue, New Baneshwor",
    city: "Kathmandu",
    area: "New Baneshwor",
    isDefault: false,
    deliveryCharge: 100,
  },
]

export default function AccountPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [editProfile, setEditProfile] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...userData })
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [newAddress, setNewAddress] = useState({
    name: "",
    recipient: "",
    phone: "",
    address: "",
    city: "Kathmandu",
    area: "",
    isDefault: false,
  })
  const [profileImage, setProfileImage] = useState(userData.avatar)
  const [imageFile, setImageFile] = useState(null)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleProfileChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveProfile = () => {
    // In a real app, you would send this data to your API
    setEditProfile(false)
  }

  const handleAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
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

  const saveAddress = () => {
    // In a real app, you would save this to your backend
    setAddressModalOpen(false)
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Maximum size is 5MB.")
        return
      }

      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const openPasswordModal = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")
    setPasswordSuccess(false)
    setPasswordModalOpen(true)
  }

  const handlePasswordChange = () => {
    // Reset error state
    setPasswordError("")

    // Validate inputs
    if (!currentPassword) {
      setPasswordError("Current password is required")
      return
    }

    if (!newPassword) {
      setPasswordError("New password is required")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    // In a real app, you would send this to your API
    // For demo purposes, we'll just show success
    setPasswordSuccess(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      setPasswordModalOpen(false)
      setPasswordSuccess(false)
    }, 2000)
  }

  // Calculate loyalty progress percentage

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <User className="h-5 w-5" /> },
    { id: "orders", label: "Orders", icon: <Package className="h-5 w-5" /> },
    { id: "addresses", label: "Addresses", icon: <MapPin className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          <h1 className="ml-3 text-xl font-bold text-[#0055a4]">Account</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
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
                    <Avatar className="h-12 w-12 border-2 border-[#36b7e5]">
                      <AvatarImage src={profileImage || userData.avatar} alt={userData.name} />
                      <AvatarFallback className="bg-[#0055a4] text-white">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full flex items-center px-6 py-3 text-left ${
                        activeSection === item.id
                          ? "bg-[#e6f0f9] text-[#0055a4] font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveSection(item.id)}
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
                    onClick={() => router.push("/")}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 border-r border-gray-100 min-h-screen bg-white">
          <div className="p-6">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 border-2 border-[#36b7e5]">
                <AvatarImage src={profileImage || userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-[#0055a4] text-white">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center px-6 py-3.5 text-left ${
                  activeSection === item.id
                    ? "bg-[#e6f0f9] text-[#0055a4] font-medium border-r-4 border-[#0055a4]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveSection(item.id)}
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
              onClick={() => router.push("/")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-gray-50">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">Welcome back, {userData.name}</p>
                </div>
                <Button
                  onClick={() => router.push("/")}
                  className="mt-4 lg:mt-0 bg-[#0055a4] hover:bg-[#003d7a] text-white"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Account Overview Card */}
                <Card className="col-span-full lg:col-span-2 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-bold text-gray-900">Account Overview</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0055a4] hover:bg-[#e6f0f9] hover:text-[#0055a4]"
                        onClick={() => setEditProfile(true)}
                      >
                        <Edit2 className="h-4 w-4 mr-1.5" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Full Name</p>
                            <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email Address</p>
                            <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone Number</p>
                            <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Account Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Member Since</p>
                            <p className="text-sm font-medium text-gray-900">{userData.memberSince}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Default Address</p>
                            <p className="text-sm font-medium text-gray-900">
                              {addresses.find((addr) => addr.isDefault)?.name || "Not set"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Loyalty Status</p>
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">Silver Member</p>
                              <Badge className="ml-2 bg-[#e6f0f9] text-[#0055a4] border-[#36b7e5] text-xs">
                                {userData.loyaltyPoints} pts
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders Card */}
                <Card className="col-span-full lg:col-span-1 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-bold text-gray-900">Recent Orders</CardTitle>
                      <Button
                        variant="link"
                        className="text-[#0055a4] p-0 h-auto"
                        onClick={() => setActiveSection("orders")}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 hover:border-[#36b7e5] transition-colors cursor-pointer"
                          onClick={() => setActiveSection("orders")}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-3">
                              <Package className="h-4 w-4 text-[#0055a4]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{order.id}</p>
                              <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Rs. {order.total}</p>
                            <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Card */}
                <Card className="col-span-full border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-gray-200 hover:border-[#36b7e5] hover:bg-[#e6f0f9] text-gray-700 hover:text-[#0055a4]"
                        onClick={() => setActiveSection("orders")}
                      >
                        <Package className="h-6 w-6 mb-2 text-[#0055a4]" />
                        <span className="text-sm">My Orders</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-gray-200 hover:border-[#36b7e5] hover:bg-[#e6f0f9] text-gray-700 hover:text-[#0055a4]"
                        onClick={() => setActiveSection("addresses")}
                      >
                        <MapPin className="h-6 w-6 mb-2 text-[#0055a4]" />
                        <span className="text-sm">Addresses</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-gray-200 hover:border-[#36b7e5] hover:bg-[#e6f0f9] text-gray-700 hover:text-[#0055a4]"
                        onClick={openPasswordModal}
                      >
                        <Shield className="h-6 w-6 mb-2 text-[#0055a4]" />
                        <span className="text-sm">Security</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div className="p-6 lg:p-8">

              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="border-none shadow-sm overflow-hidden">
                    <div className="bg-white border-b border-gray-100 p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-4">
                            <Package className="h-5 w-5 text-[#0055a4]" />
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h3 className="font-medium text-gray-900 text-base">{order.id}</h3>
                              <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              <Calendar className="h-3.5 w-3.5 inline mr-1" />
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center gap-3">
                          <p className="font-medium text-lg text-gray-900">Rs. {order.total}</p>
                          <div className="flex gap-2">
                            <Button
                              className="bg-[#0055a4] hover:bg-[#003d7a] text-white text-sm h-9 px-3 rounded-full"
                              size="sm"
                            >
                              Track Order
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#36b7e5] text-[#36b7e5] hover:bg-[#e6f0f9] text-sm h-9 px-3 rounded-full"
                            >
                              <Repeat className="h-4 w-4 mr-1.5" />
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="bg-gray-50 p-4 lg:p-6">
                      <h4 className="text-sm font-medium mb-3 text-gray-700">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-100"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-3 text-[#0055a4] font-medium">
                                {item.quantity}
                              </div>
                              <span className="text-gray-900 text-sm">{item.name}</span>
                            </div>
                            <span className="font-medium text-gray-900 text-sm">Rs. {item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <span className="font-medium text-gray-900 text-base">Total</span>
                        <span className="font-medium text-gray-900 text-base">Rs. {order.total}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Section */}
          {activeSection === "addresses" && (
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage your delivery addresses</p>
                </div>
                <Button
                  onClick={() => openAddressModal()}
                  className="mt-4 lg:mt-0 bg-[#0055a4] hover:bg-[#003d7a] text-white rounded-full"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add New Address
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card
                    key={address.id}
                    className={`border-none shadow-sm hover:shadow-md transition-shadow ${
                      address.isDefault ? "ring-2 ring-[#0055a4] ring-opacity-30" : ""
                    }`}
                  >
                    <CardHeader className="pb-3 flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-3">
                          <MapPin className="h-5 w-5 text-[#0055a4]" />
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="font-medium text-gray-900 text-base">{address.name}</h3>
                            {address.isDefault && (
                              <Badge className="bg-[#e6f0f9] text-[#0055a4] border-[#36b7e5] text-xs">Default</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                          onClick={() => openAddressModal(address.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-gray-700 space-y-1">
                        <p className="text-sm font-medium">{address.recipient}</p>
                        <p className="text-sm text-gray-500">{address.phone}</p>
                        <p className="text-sm text-gray-500">
                          {address.address}, {address.area}
                        </p>
                        <p className="text-sm text-gray-500">{address.city}</p>
                      </div>
                      {!address.isDefault && (
                        <Button variant="link" className="mt-3 p-0 h-auto text-[#0055a4] text-sm font-medium">
                          Set as default
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

 
        </main>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={editProfile} onOpenChange={setEditProfile}>
        <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0055a4]">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-[#e6f0f9]">
                  <AvatarImage src={profileImage || userData.avatar} alt={userData.name} />
                  <AvatarFallback className="bg-[#0055a4] text-white text-xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#36b7e5] text-white cursor-pointer shadow-md hover:bg-[#0055a4] transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="fullName" className="text-sm text-gray-600 font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={editedUser.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  className="mt-1.5 border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm text-gray-600 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="mt-1.5 border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-gray-600 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={editedUser.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  className="mt-1.5 border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditProfile(false)}
              className="rounded-lg border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm"
            >
              Cancel
            </Button>
            <Button className="rounded-lg bg-[#0055a4] hover:bg-[#003d7a] text-white text-sm" onClick={saveProfile}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Address Modal */}
      <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0055a4]">
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="addressName" className="text-gray-700 font-medium text-sm">
                  Address Name
                </Label>
                <div className="relative mt-1.5">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="addressName"
                    placeholder="Home, Office, etc."
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                    value={newAddress.name}
                    onChange={(e) => handleAddressChange("name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="recipientName" className="text-gray-700 font-medium text-sm">
                  Recipient Name
                </Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="recipientName"
                    placeholder="Full name"
                    className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                    value={newAddress.recipient}
                    onChange={(e) => handleAddressChange("recipient", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">
                Phone Number
              </Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="pl-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={newAddress.phone}
                  onChange={(e) => handleAddressChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700 font-medium text-sm">
                Full Address
              </Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="address"
                  placeholder="Street address, apartment, etc."
                  className="pl-10 min-h-[80px] rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={newAddress.address}
                  onChange={(e) => handleAddressChange("address", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city" className="text-gray-700 font-medium text-sm">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="mt-1.5 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={newAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="area" className="text-gray-700 font-medium text-sm">
                  Area
                </Label>
                <Input
                  id="area"
                  placeholder="Area/Neighborhood"
                  className="mt-1.5 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={newAddress.area}
                  onChange={(e) => handleAddressChange("area", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="defaultAddress"
                className="rounded-sm data-[state=checked]:bg-[#0055a4] data-[state=checked]:border-[#0055a4] h-4 w-4"
                checked={newAddress.isDefault}
                onCheckedChange={(checked) => handleAddressChange("isDefault", checked)}
              />
              <Label htmlFor="defaultAddress" className="text-sm text-gray-600">
                Set as default address
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddressModalOpen(false)}
              className="rounded-lg border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm"
            >
              Cancel
            </Button>
            <Button className="rounded-lg bg-[#0055a4] hover:bg-[#003d7a] text-white text-sm" onClick={saveAddress}>
              {editingAddressId ? "Update Address" : "Save Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Change Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white border-gray-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0055a4]">Change Password</DialogTitle>
          </DialogHeader>

          {passwordSuccess ? (
            <Alert className="bg-green-50 border-green-200 text-green-800 mt-2">
              <AlertDescription className="text-sm">Password changed successfully!</AlertDescription>
            </Alert>
          ) : passwordError ? (
            <Alert className="bg-red-50 border-red-200 text-red-800 mt-2">
              <AlertDescription className="text-sm">{passwordError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="grid gap-5 py-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-700 font-medium text-sm">
                Current Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="pr-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-gray-700 font-medium text-sm">
                New Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pr-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                Confirm New Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="pr-10 h-11 rounded-lg border-gray-200 focus:border-[#36b7e5] focus:ring-[#36b7e5] text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPasswordModalOpen(false)}
              className="rounded-lg border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-sm"
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-[#0055a4] hover:bg-[#003d7a] text-white text-sm"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
