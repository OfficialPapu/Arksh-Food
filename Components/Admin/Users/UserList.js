"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowUpRight,
  Search,
  Star,
  UserPlus,
  Users,
  X,
  Calendar,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tabs, TabsContent } from "@/Components/ui/tabs"
import { Progress } from "@/Components/ui/progress"
import axios from "@/lib/axios"

export default function UserList() {
  const router = useRouter()
  const [usersData, setUsersData] = useState([])
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [progressValue, setProgressValue] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch user data from API
  const fetchData = async () => {
    try {
      setIsRefreshing(true)
      const response = await axios.get("api/admin/users")
      const data = await response.data
      setUsersData(data)
      console.log(data)
      setIsRefreshing(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || 1)
  const itemsPerPage = 6

  // Filter users based on search query and selected role
  const filteredUsers = usersData?.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.UID.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === null || user.Role.includes(selectedRole)

    return matchesSearch && matchesRole
  })

  // Sort users
  const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      case "oldest":
        return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
      case "name-asc":
        return a.Name.localeCompare(b.Name)
      case "name-desc":
        return b.Name.localeCompare(a.Name)
      default:
        return 0
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil((sortedUsers?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = sortedUsers?.slice(startIndex, startIndex + itemsPerPage)

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Reset to page 1 when searching
    if (currentPage !== 1) {
      router.push("/admin/users?page=1")
    }
  }

  // Handle role filter
  const handleRoleFilter = (role) => {
    setSelectedRole(role === "all" ? null : role)
    // Reset to page 1 when filtering
    if (currentPage !== 1) {
      router.push("/admin/users?page=1")
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink href={`/admin/users?page=1`} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Show current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/admin/users?page=${i}`} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink href={`/admin/users?page=${totalPages}`} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  // Get stats for dashboard
  const adminUsers = filteredUsers?.filter((user) => user.Role.includes("Admin")).length || 0

  const newUsers =
    filteredUsers?.filter((user) => {
      const createdDate = new Date(user.CreatedAt)
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return createdDate > oneWeekAgo
    }).length || 0

  const totalSpent =
    filteredUsers?.reduce((sum, user) => {
      return sum + user.Orders.reduce((orderSum, order) => orderSum + order.GrandTotal, 0)
    }, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7fa] via-[#f8fafc] to-white">
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <main>
          {/* Enhanced header with glassmorphism */}
          <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100/50 bg-white/80 p-4 sm:p-6 lg:p-8 shadow-md sm:shadow-xl backdrop-blur-sm">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-50/80 opacity-70"></div>
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-50/80 opacity-70"></div>
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white/30 to-transparent"></div>
            <div className="relative">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm">
                    <Users className="mr-1.5 h-4 w-4" />
                    User Management
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Users</h1>
                  <p className="mt-1 text-sm sm:text-base text-gray-500">Manage and monitor your customer accounts</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                {/* Search bar */}
                <div className="relative w-full max-w-md mb-6">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search users by name or email..."
                    className="pl-9 w-full border-gray-200 bg-[#f3f7fa] focus-visible:ring-blue-500 transition-all duration-200 rounded-lg"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  {searchQuery && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchQuery("")}
                      >
                        <span className="sr-only">Clear search</span>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Enhanced stats cards with glassmorphism */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="group rounded-xl bg-white/90 p-4 sm:p-5 shadow-md sm:shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Total Users</span>
                      <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition-all duration-200 group-hover:bg-blue-100 group-hover:scale-110">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{filteredUsers?.length || 0}</div>
                      <div className="text-xs font-medium text-green-600">+{newUsers}</div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{newUsers} new this week</div>
                    <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="group rounded-xl bg-white/90 p-4 sm:p-5 shadow-md sm:shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">New Users</span>
                      <div className="rounded-full bg-purple-50 p-2 text-purple-600 transition-all duration-200 group-hover:bg-purple-100 group-hover:scale-110">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{newUsers}</div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Last joined {filteredUsers?.length ? formatDate(filteredUsers[0].CreatedAt) : "N/A"}
                    </div>
                    <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="group rounded-xl bg-white/90 p-4 sm:p-5 shadow-md sm:shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Admins</span>
                      <div className="rounded-full bg-amber-50 p-2 text-amber-600 transition-all duration-200 group-hover:bg-amber-100 group-hover:scale-110">
                        <Star className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{adminUsers}</div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Rs. {totalSpent.toLocaleString()} total spent</div>
                    <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sorting and filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-full sm:w-[180px] border-gray-200 bg-white shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRole === null ? "all" : selectedRole} onValueChange={handleRoleFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[180px] border-gray-200 bg-white shadow-sm">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa] w-full sm:w-auto"
              onClick={fetchData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {/* User grid */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsContent value="all">
              {isLoading ? (
                <div className="w-full py-20">
                  <Progress value={progressValue} className="w-full max-w-md mx-auto" />
                </div>
              ) : (
                <>
                  {/* User grid or list view */}
                  <div className="mb-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedUsers?.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <Link key={user._id} href={`/admin/users/${user._id}`} className="group">
                          <Card className="h-full overflow-hidden border-none transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] bg-white/90 backdrop-blur-sm">
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 opacity-80" />
                            <CardHeader className="pb-2 pt-4 sm:pb-3 sm:pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="relative">
                                    <div className="rounded-full p-0.5 bg-gradient-to-r from-blue-100 to-blue-50">
                                      <img
                                        src={
                                          user?.ProfilePic
                                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL + user?.ProfilePic}`
                                            : "/Arksh Food.png"
                                        }
                                        alt={user?.Name}
                                        className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-md ring-2 ring-[#f3f7fa] transition-all duration-200 group-hover:ring-blue-100 object-cover rounded-full"
                                      />
                                    </div>
                                    {user.Role.includes("Admin") && (
                                      <div className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-white">
                                        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                                        <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 drop-shadow-md" />
                                      </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-white bg-blue-500 transition-colors group-hover:bg-blue-600"></div>
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {user.Name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">{user.Email}</div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2 px-3 sm:pb-3 sm:px-4">
                              <div className="grid grid-cols-2 gap-2 sm:gap-4 rounded-lg bg-[#f3f7fa] p-2 sm:p-3">
                                <div>
                                  <div className="flex items-center gap-1 sm:gap-1.5">
                                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
                                    <div className="text-xs font-medium text-gray-500">Orders</div>
                                  </div>
                                  <div className="mt-1 text-sm font-medium text-gray-900">
                                    {user.Orders.length || "0"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Last: {user.Orders.length ? formatDate(user.UpdateAt) : "N/A"}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-1 sm:gap-1.5">
                                    <CreditCard className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
                                    <div className="text-xs font-medium text-gray-500">Spent</div>
                                  </div>
                                  <div className="mt-1 text-sm font-medium text-gray-900">
                                    Rs. {user.Orders.reduce((sum, order) => sum + order.GrandTotal, 0) || "0"}
                                  </div>
                                  <div className="text-xs text-gray-500">UID: {user.UID}</div>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  {user.Role.map((role, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className={`border-gray-200 ${
                                        role === "Admin" ? "bg-blue-50 text-blue-700" : "bg-[#f3f7fa] text-gray-700"
                                      } text-xs`}
                                    >
                                      {role}
                                    </Badge>
                                  ))}
                                  <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                                  <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3 text-gray-400" />
                                    {formatDate(user.UpdateAt)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-2 pb-3 px-3 sm:pt-3 sm:px-4">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400" />
                                <span className="hidden sm:inline">Joined</span> {formatDate(user.CreatedAt)}
                              </div>
                              <div className="flex items-center gap-1 text-xs font-medium text-blue-600 transition-all duration-200 group-hover:text-blue-800 group-hover:gap-2">
                                View details
                                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/80 backdrop-blur-sm p-8 text-center">
                        <div>
                          <p className="text-gray-500">No users found matching your criteria</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setSearchQuery("")
                              setSelectedRole(null)
                              router.push("/admin/users?page=1")
                            }}
                          >
                            Reset filters
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          {/* Enhanced pagination */}
          {filteredUsers?.length > 0 && !isLoading && (
            <div className="my-6 sm:my-8 flex flex-col items-center">
              <Pagination className="mb-2">
                <PaginationContent className="flex-wrap">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/admin/users?page=${currentPage - 1}`}
                        className="border border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa]"
                      />
                    </PaginationItem>
                  )}

                  {renderPaginationItems()}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href={`/admin/users?page=${currentPage + 1}`}
                        className="border border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa]"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
              <div className="text-xs sm:text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

