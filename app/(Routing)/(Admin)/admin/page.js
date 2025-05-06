'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Progress } from '@/Components/ui/progress'
import { Separator } from '@/Components/ui/separator'
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  TrendingUp,
  PieChart,
  Activity,
  Percent,
  Clock,
  ChevronRight,
  Star,
  Zap,
  AlertCircle
} from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample data - in a real app, this would come from an API or database
  const stats = [
    { title: 'Total Revenue', value: '$12,345', icon: <DollarSign className="h-5 w-5" />, change: '+12.5%', trend: 'up', color: 'bg-blue-50 text-[#0057b7]' },
    { title: 'Orders', value: '356', icon: <ShoppingCart className="h-5 w-5" />, change: '+8.2%', trend: 'up', color: 'bg-green-50 text-green-600' },
    { title: 'Products', value: '124', icon: <Package className="h-5 w-5" />, change: '+4.3%', trend: 'up', color: 'bg-purple-50 text-purple-600' },
    { title: 'Customers', value: '2,567', icon: <Users className="h-5 w-5" />, change: '-2.3%', trend: 'down', color: 'bg-amber-50 text-amber-600' },
  ]

  const recentOrders = [
    { id: '#ORD-7352', customer: 'John Doe', date: '2023-06-12', status: 'Completed', amount: '$125.00' },
    { id: '#ORD-7353', customer: 'Jane Smith', date: '2023-06-12', status: 'Processing', amount: '$255.00' },
    { id: '#ORD-7354', customer: 'Robert Johnson', date: '2023-06-11', status: 'Shipped', amount: '$350.00' },
    { id: '#ORD-7355', customer: 'Emily Davis', date: '2023-06-11', status: 'Pending', amount: '$75.00' },
    { id: '#ORD-7356', customer: 'Michael Brown', date: '2023-06-10', status: 'Completed', amount: '$210.00' },
  ]

  const topProducts = [
    { name: 'Organic Vegetables Bundle', sales: 245, revenue: '$3,675', progress: 85 },
    { name: 'Fresh Fruit Basket', sales: 187, revenue: '$2,805', progress: 70 },
    { name: 'Premium Meat Selection', sales: 156, revenue: '$4,680', progress: 60 },
    { name: 'Dairy Products Pack', sales: 134, revenue: '$1,340', progress: 45 },
    { name: 'Bakery Essentials', sales: 98, revenue: '$980', progress: 30 },
  ]

  const notifications = [
    { title: 'New order received', time: '10 minutes ago', type: 'order' },
    { title: 'Low stock alert: Fresh Fruit Basket', time: '1 hour ago', type: 'inventory' },
    { title: 'Customer review: 5 stars', time: '3 hours ago', type: 'review' },
    { title: 'Payment processed successfully', time: '5 hours ago', type: 'payment' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Pending': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4 text-[#0057b7]" />
      case 'inventory': return <Package className="h-4 w-4 text-amber-500" />
      case 'review': return <Star className="h-4 w-4 text-yellow-500" />
      case 'payment': return <DollarSign className="h-4 w-4 text-green-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0057b7] sm:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your admin dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Today</span>
          </Button>
          <Button size="sm" className="gap-1 bg-[#0057b7] hover:bg-[#0055a4]/90">
            <TrendingUp className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <div className={`rounded-full p-2 ${stat.color}`}>{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`mt-1 flex items-center text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? 
                      <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    }
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Recent orders table */}
            <Card className="lg:col-span-4 border-none shadow-sm hover:shadow transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>You have {recentOrders.length} orders this week</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-[#0057b7]">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-5 bg-gray-50 p-3 text-xs font-medium text-gray-500">
                    <div>Order</div>
                    <div>Customer</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Amount</div>
                  </div>
                  {recentOrders.map((order, index) => (
                    <div 
                      key={index} 
                      className={`grid grid-cols-5 p-3 text-sm ${index !== recentOrders.length - 1 ? 'border-b' : ''} hover:bg-gray-50 transition-colors`}
                    >
                      <div className="font-medium text-[#0057b7]">{order.id}</div>
                      <div>{order.customer}</div>
                      <div>{order.date}</div>
                      <div>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="font-medium">{order.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 px-6 py-3">
                <Button variant="outline" size="sm" asChild className="gap-1">
                  <Link href="/admin/orders">
                    View all orders
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Right column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top products */}
              <Card className="border-none shadow-sm hover:shadow transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best performing products this month</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-[#0057b7]">
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {topProducts.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.revenue}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={product.progress} className="h-2" />
                          <span className="text-xs text-gray-500">{product.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 px-6 py-3">
                  <Button variant="outline" size="sm" asChild className="gap-1">
                    <Link href="/admin/products">
                      View all products
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Notifications */}
              <Card className="border-none shadow-sm hover:shadow transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated with the latest activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics will appear here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <PieChart className="h-16 w-16 text-[#39b9ef]" />
                <div>
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-gray-500">This section is under development</p>
                </div>
                <Button className="mt-2 bg-[#0057b7] hover:bg-[#0055a4]/90">View Sample Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <Activity className="h-16 w-16 text-[#39b9ef]" />
                <div>
                  <h3 className="text-lg font-medium">Reports Dashboard</h3>
                  <p className="text-sm text-gray-500">This section is under development</p>
                </div>
                <Button className="mt-2 bg-[#0057b7] hover:bg-[#0055a4]/90">Generate Sample Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard
