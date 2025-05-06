"use client";

import Link from "next/link";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import MobileCard from "@/Components/Admin/Orders/MobileCard";
import DesktopCard from "@/Components/Admin/Orders/DesktopCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Package, ShoppingCart, Users, DollarSign, ChevronRight, RefreshCw, FileSpreadsheet, Download, TrendingUp, Loader2 } from "lucide-react";
import { ExportToExcel } from "@/utils/ExportToExcel";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateFilter, setDateFilter] = useState("today");
  const [loading, setLoading] = useState({ Users: false, Products: false });
  const [Stats, setStats] = useState([
    { key: "TotalRevenue", title: "Total Revenue", icon: DollarSign, value: 0, bgPattern: "radial-gradient(circle at 90% 10%, #0057b7/10%, transparent 60%)" },
    { key: "TotalOrders", title: "Orders", icon: ShoppingCart, value: 0, bgPattern: "radial-gradient(circle at 90% 10%, #0057b7/10%, transparent 60%)" },
    { key: "TotalProducts", title: "Products", icon: Package, value: 0, bgPattern: "radial-gradient(circle at 90% 10%, #0057b7/10%, transparent 60%)" },
    { key: "TotalUsers", title: "Customers", icon: Users, value: 0, bgPattern: "radial-gradient(circle at 90% 10%, #0057b7/10%, transparent 60%)" }
  ]);

  useEffect(() => {
    fetchData();
  }, [dateFilter]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `api/admin/dashboard?filter=${dateFilter}`
      );
      const updatedStats = Stats.map((stat) => ({
        ...stat,
        value: response.data[stat.key] || 0,
      }));
      setStats(updatedStats);
    } catch (error) { }
  };

  const generateExcelReport = async (reportType) => {
    try {
      let FileName = "";
      if (reportType == "users") {
        setLoading({ Users: true, Products: false });
        FileName = "ArkshFood_Users_Report";
      } else if (reportType == "products") {
        setLoading({ Users: false, Products: true });
        FileName = "ArkshFood_Products_Report";
      }
      const response = await axios.get(`api/admin/reports/${reportType}`);
      ExportToExcel(response.data, FileName);
    } catch (error) {
    } finally {
      setLoading({ Users: false, Products: false });
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0057b7] sm:text-3xl">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your admin dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="15days">Last 15 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="60days">Last 60 Days</SelectItem>
              <SelectItem value="Total">Total</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="gap-1 bg-[#0057b7] hover:bg-[#0055a4]/90"
            onClick={() => fetchData()}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-xl shadow-[0_4px_14px_rgba(0,87,183,0.1)] hover:shadow-[0_8px_30px_rgba(0,87,183,0.2)] transition-all duration-300 border border-[#0057b7]/10"
                  style={{
                    backgroundImage: stat.bgPattern,
                    backgroundSize: "cover",
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0057b7]/5 rounded-full -mt-10 -mr-10 z-0"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#0057b7]/5 rounded-full -mb-6 -ml-6 z-0"></div>

                  <div className="relative z-10 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0057b7] text-white shadow-[0_4px_10px_rgba(0,87,183,0.3)] group-hover:shadow-[0_6px_14px_rgba(0,87,183,0.4)] group-hover:scale-105 transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </h3>
                      </div>
                      <TrendingUp className="h-4 w-4 text-[#0057b7]/60" />
                    </div>

                    <div className="mt-2">
                      <div className="text-2xl font-bold text-[#0057b7]">
                        {stat.key === "TotalRevenue"
                          ? `Rs. ${Number(stat.value).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                          : Number(stat.value).toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-gray-500">
                          {dateFilter}
                        </div>
                        <div className="text-xs font-medium text-[#0057b7]">
                          View Details
                        </div>
                      </div>

                      <div className="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0057b7]"
                          style={{
                            width: `${Math.min(
                              100,
                              (stat.value / (stat.value + 20)) * 100
                            )}%`,
                            boxShadow: "0 0 8px rgba(0,87,183,0.5)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main content grid */}
          <div className="grid gap-6 lg:grid-cols-1">
            <Card className="lg:col-span-4 shadow-none border-none transition-shadow duration-200 pb-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                </div>
                <Link href={"/admin/orders"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-[#0057b7]"
                  >
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <DesktopCard />
                <MobileCard />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download reports in Excel format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-4 border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Users className="h-12 w-12 text-[#0057b7]" />
                    <div>
                      <h3 className="text-lg font-medium">Users Report</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Download a complete list of all users with their details
                      </p>
                    </div>
                    <Button
                      className="mt-2 gap-2 bg-[#0057b7] hover:bg-[#0055a4]/90"
                      onClick={() => generateExcelReport("users")}
                      disabled={loading.Users}
                    >
                      {loading.Users ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="h-4 w-4" />
                          Generate Users Report
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Package className="h-12 w-12 text-[#0057b7]" />
                    <div>
                      <h3 className="text-lg font-medium">Products Report</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Download a complete list of all products with their
                        details
                      </p>
                    </div>
                    <Button
                      className="mt-2 gap-2 bg-[#0057b7] hover:bg-[#0055a4]/90"
                      onClick={() => generateExcelReport("products")}
                      disabled={loading.Products}
                    >
                      {loading.Products ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="h-4 w-4" />
                          Generate Products Report
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Download className="h-5 w-5 text-[#0057b7]" />
                  </div>
                  <div>
                    <h4 className="font-medium">Need a custom report?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      You can also generate custom reports with specific date
                      ranges and filters.
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-[#0057b7]"
                    >
                      Create custom report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
