"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  User,
  Package,
  CreditCard,
  MapPin,
  LogOut,
  Edit2,
  ShoppingBag,
  Upload,
  Plus,
  Home,
  Phone,
  Calendar,
  Check,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  Clock,
  Trash2,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { Switch } from "@/Components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Textarea } from "@/Components/ui/textarea"
import { Checkbox } from "@/Components/ui/checkbox"

// Define colors directly in the component
const colors = {
  primary: "#0055a4",
  primaryDark: "#003d7a",
  primaryLight: "#36b7e5",
  primaryLighter: "#e6f0f9",
}

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+977 9876543210",
  avatar: "/placeholder.svg?height=100&width=100",
  memberSince: "January 2023",
  loyaltyPoints: 350,
  notifications: {
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  },
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

// Sample payment methods
const paymentMethods = [
  {
    id: 1,
    type: "bank",
    name: "Nepal Bank",
    details: "•••• •••• •••• 4532",
    isDefault: true,
  },
  {
    id: 2,
    type: "cod",
    name: "Cash On Delivery",
    details: "Pay when you receive your order",
    isDefault: false,
  },
]

export default function AccountPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...userData })
  const [addressModalOpen, setAddressModalOpen] = useState(false)
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleProfileChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (key, value) => {
    setEditedUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Mobile Header */}
      <header
        className={`md:hidden sticky top-0 z-10 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="flex justify-between items-center h-16 px-4">
          <Button
            variant="ghost"
            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white rounded-full shadow-sm">
              <Image src="/images/arksh-logo.png" alt="Arksh Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="ml-2 font-semibold" style={{ color: colors.primary }}>
              Arksh
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div
            className={`fixed inset-y-0 left-0 w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-white rounded-full shadow-sm mr-2">
                    <Image
                      src="/images/arksh-logo.png"
                      alt="Arksh Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-lg font-bold" style={{ color: colors.primary }}>
                    Arksh
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col space-y-1">
                <Button
                  variant={activeSection === "dashboard" ? "default" : "ghost"}
                  className={`justify-start ${
                    activeSection === "dashboard"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection("dashboard")
                    setMobileMenuOpen(false)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeSection === "orders" ? "default" : "ghost"}
                  className={`justify-start ${
                    activeSection === "orders"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection("orders")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </Button>
                <Button
                  variant={activeSection === "addresses" ? "default" : "ghost"}
                  className={`justify-start ${
                    activeSection === "addresses"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection("addresses")
                    setMobileMenuOpen(false)
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Addresses
                </Button>
                <Button
                  variant={activeSection === "payment" ? "default" : "ghost"}
                  className={`justify-start ${
                    activeSection === "payment"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection("payment")
                    setMobileMenuOpen(false)
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment
                </Button>
                <Button
                  variant={activeSection === "settings" ? "default" : "ghost"}
                  className={`justify-start ${
                    activeSection === "settings"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection("settings")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>

              <div className="mt-auto">
                <Separator className={`my-4 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                <Button
                  variant="ghost"
                  className={`justify-start w-full ${
                    darkMode
                      ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
                      : "text-red-500 hover:text-red-600 hover:bg-red-50"
                  }`}
                  onClick={() => router.push("/")}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile */}
        <aside
          className={`hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border-r`}
        >
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-10 w-10 bg-white rounded-full shadow-sm">
                <Image
                  src="/images/arksh-logo.png"
                  alt="Arksh Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
                Arksh
              </h1>
            </div>

            <div className="flex flex-col space-y-1">
              <Button
                variant={activeSection === "dashboard" ? "default" : "ghost"}
                className={`justify-start ${
                  activeSection === "dashboard"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeSection === "orders" ? "default" : "ghost"}
                className={`justify-start ${
                  activeSection === "orders"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("orders")}
              >
                <Package className="h-4 w-4 mr-2" />
                Orders
              </Button>
              <Button
                variant={activeSection === "addresses" ? "default" : "ghost"}
                className={`justify-start ${
                  activeSection === "addresses"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("addresses")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </Button>
              <Button
                variant={activeSection === "payment" ? "default" : "ghost"}
                className={`justify-start ${
                  activeSection === "payment"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("payment")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </Button>
              <Button
                variant={activeSection === "settings" ? "default" : "ghost"}
                className={`justify-start ${
                  activeSection === "settings"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Dark Mode</span>
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              <Separator className={`my-4 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{userData.name}</p>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className={`justify-start w-full ${
                  darkMode
                    ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
                    : "text-red-500 hover:text-red-600 hover:bg-red-50"
                }`}
                onClick={() => router.push("/")}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Dashboard</h1>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    darkMode
                      ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => router.push("/")}
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Button>
              </div>

              <div
                className={`rounded-xl overflow-hidden ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-blue-500">
                      <AvatarImage src={profileImage || userData.avatar} alt={userData.name} />
                      <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {editProfile && (
                      <div className="absolute -bottom-1 -right-1">
                        <label
                          htmlFor="avatar-upload"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white cursor-pointer shadow-md"
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
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {userData.name}
                    </h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</p>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
                      >
                        Silver Member
                      </Badge>
                      <span className={`text-xs ml-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {userData.loyaltyPoints} points
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        darkMode
                          ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                          : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setEditProfile(!editProfile)}
                    >
                      {editProfile ? (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                    {editProfile && (
                      <Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white" size="sm" onClick={saveProfile}>
                        <Check className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    )}
                  </div>
                </div>

                {editProfile && (
                  <div className={`p-6 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={editedUser.name}
                          onChange={(e) => handleProfileChange("name", e.target.value)}
                          className={`mt-1 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => handleProfileChange("email", e.target.value)}
                          className={`mt-1 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={editedUser.phone}
                          onChange={(e) => handleProfileChange("phone", e.target.value)}
                          className={`mt-1 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className={`text-lg font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Order Updates</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Receive notifications about your order status
                            </p>
                          </div>
                          <Switch
                            checked={editedUser.notifications.orderUpdates}
                            onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              Promotions & Offers
                            </p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Receive notifications about discounts and special offers
                            </p>
                          </div>
                          <Switch
                            checked={editedUser.notifications.promotions}
                            onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Newsletter</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Receive our weekly newsletter with food tips and new items
                            </p>
                          </div>
                          <Switch
                            checked={editedUser.notifications.newsletter}
                            onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`rounded-xl p-6 ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  } border shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Recent Orders</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                      }`}
                      onClick={() => setActiveSection("orders")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                        } cursor-pointer transition-colors`}
                        onClick={() => setActiveSection("orders")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              darkMode ? "bg-gray-600" : "bg-white"
                            }`}
                          >
                            <Package className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{order.id}</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Rs. {order.total}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-600 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800 text-xs"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  } border shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Saved Addresses</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                      }`}
                      onClick={() => setActiveSection("addresses")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {addresses.slice(0, 2).map((address) => (
                      <div
                        key={address.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                        } cursor-pointer transition-colors`}
                        onClick={() => setActiveSection("addresses")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              darkMode ? "bg-gray-600" : "bg-white"
                            }`}
                          >
                            <MapPin className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {address.name}
                              </p>
                              {address.isDefault && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 text-xs"
                                >
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {address.address}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${
                            darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            openAddressModal(address.id)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Order History</h1>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                        : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Recent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                        : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`rounded-xl overflow-hidden ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border shadow-sm`}
                  >
                    <div
                      className={`p-6 flex flex-col md:flex-row md:items-center justify-between ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } border-b`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            darkMode ? "bg-gray-700" : "bg-blue-50"
                          }`}
                        >
                          <Package className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{order.id}</h3>
                            <Badge
                              variant="outline"
                              className="ml-2 bg-green-100 text-green-600 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <Calendar className="h-3.5 w-3.5 inline mr-1" />
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center">
                        <p className={`font-medium text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Rs. {order.total}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`ml-4 ${
                            darkMode
                              ? "border-gray-700 text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                              : "border-gray-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          }`}
                        >
                          Track Order
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              darkMode ? "bg-gray-700" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                  darkMode ? "bg-gray-600" : "bg-white"
                                } text-blue-500`}
                              >
                                {item.quantity}
                              </div>
                              <span className={darkMode ? "text-white" : "text-gray-900"}>{item.name}</span>
                            </div>
                            <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              Rs. {item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`flex justify-between items-center mt-4 pt-4 ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } border-t`}
                      >
                        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Total</span>
                        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Rs. {order.total}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Section */}
          {activeSection === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Saved Addresses</h1>
                <Button
                  onClick={() => openAddressModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`rounded-xl p-6 ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border shadow-sm ${address.isDefault ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            darkMode ? "bg-gray-700" : "bg-blue-50"
                          }`}
                        >
                          <MapPin className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {address.name}
                            </h3>
                            {address.isDefault && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${
                            darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => openAddressModal(address.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 w-8 p-0 ${
                            darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <p>{address.recipient}</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{address.phone}</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {address.address}, {address.area}
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{address.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Section */}
          {activeSection === "payment" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Payment Methods</h1>
                <Button
                  variant="outline"
                  className={`${
                    darkMode
                      ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Method
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`rounded-xl p-6 ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border shadow-sm ${method.isDefault ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            darkMode ? "bg-gray-700" : method.type === "bank" ? "bg-blue-50" : "bg-green-50"
                          }`}
                        >
                          {method.type === "bank" ? (
                            <CreditCard className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                          ) : (
                            <svg
                              className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-500"}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9M12 14.5V16.5M8.5 18H15.5C16.9045 18 17.6067 18 18.1111 17.6629C18.3295 17.517 18.517 17.3295 18.6629 17.1111C19 16.6067 19 15.9045 19 14.5V12.5C19 11.0955 19 10.3933 18.6629 9.88886C18.517 9.67048 18.3295 9.48298 18.1111 9.33706C17.6067 9 16.9045 9 15.5 9H8.5C7.09554 9 6.39331 9 5.88886 9.33706C5.67048 9.48298 5.48298 9.67048 5.33706 9.88886C5 10.3933 5 11.0955 5 12.5V14.5C5 15.9045 5 16.6067 5.33706 17.1111C5.48298 17.3295 5.67048 17.517 5.88886 17.6629C6.39331 18 7.09554 18 8.5 18Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {method.name}
                            </h3>
                            {method.isDefault && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{method.details}</p>
                        </div>
                      </div>
                      {method.type === "bank" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${
                            darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Settings</h1>
              </div>

              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Order Updates</p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Receive notifications about your order status
                      </p>
                    </div>
                    <Switch
                      checked={editedUser.notifications.orderUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Promotions & Offers</p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Receive notifications about discounts and special offers
                      </p>
                    </div>
                    <Switch
                      checked={editedUser.notifications.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Newsletter</p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Receive our weekly newsletter with food tips and new items
                      </p>
                    </div>
                    <Switch
                      checked={editedUser.notifications.newsletter}
                      onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Appearance</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Dark Mode</p>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                        : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setEditProfile(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                        : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${
                      darkMode
                        ? "border-gray-700 text-red-400 hover:text-red-300 hover:bg-gray-700"
                        : "border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50"
                    }`}
                    onClick={() => router.push("/")}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Profile Picture
                </h2>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-blue-500">
                      <AvatarImage src={profileImage || userData.avatar} alt={userData.name} />
                      <AvatarFallback style={{ backgroundColor: colors.primary, color: "white" }}>
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2">
                      <label
                        htmlFor="profile-upload"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer shadow-md hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Upload a new profile picture
                    </p>
                    <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mt-1`}>
                      JPG, PNG or GIF, max 5MB
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        darkMode
                          ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                          : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setProfileImage(userData.avatar)
                        setImageFile(null)
                      }}
                    >
                      Remove Photo
                    </Button>

                    {imageFile && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // In a real app, you would upload the image to your server here
                          // For now, we'll just keep the preview
                          // setProfileImage(URL.createObjectURL(imageFile));
                        }}
                      >
                        Save Photo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Address Modal */}
      <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
        <DialogContent
          className={`sm:max-w-[500px] ${
            darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"
          }`}
        >
          <DialogHeader>
            <DialogTitle className={darkMode ? "text-white" : ""}>
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="addressName" className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                  Address Name
                </Label>
                <div className="relative mt-1.5">
                  <Home
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="addressName"
                    placeholder="Home, Office, etc."
                    className={`pl-10 h-11 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    value={newAddress.name}
                    onChange={(e) => handleAddressChange("name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="recipientName"
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}
                >
                  Recipient Name
                </Label>
                <div className="relative mt-1.5">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="recipientName"
                    placeholder="Full name"
                    className={`pl-10 h-11 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    value={newAddress.recipient}
                    onChange={(e) => handleAddressChange("recipient", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                Phone Number
              </Label>
              <div className="relative mt-1.5">
                <Phone
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className={`pl-10 h-11 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={newAddress.phone}
                  onChange={(e) => handleAddressChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                Full Address
              </Label>
              <div className="relative mt-1.5">
                <MapPin className={`absolute left-3 top-3 h-4 w-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                <Textarea
                  id="address"
                  placeholder="Street address, apartment, etc."
                  className={`pl-10 min-h-[80px] rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={newAddress.address}
                  onChange={(e) => handleAddressChange("address", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city" className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className={`mt-1.5 h-11 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={newAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="area" className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                  Area
                </Label>
                <Input
                  id="area"
                  placeholder="Area/Neighborhood"
                  className={`mt-1.5 h-11 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  value={newAddress.area}
                  onChange={(e) => handleAddressChange("area", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="defaultAddress"
                className={`rounded-sm ${darkMode ? "border-gray-600" : ""}`}
                style={{ color: colors.primary }}
                checked={newAddress.isDefault}
                onCheckedChange={(checked) => handleAddressChange("isDefault", checked)}
              />
              <Label htmlFor="defaultAddress" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Set as default address
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddressModalOpen(false)}
              className={`rounded-lg ${
                darkMode
                  ? "border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                  : "border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Cancel
            </Button>
            <Button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white" onClick={saveAddress}>
              {editingAddressId ? "Update Address" : "Save Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
