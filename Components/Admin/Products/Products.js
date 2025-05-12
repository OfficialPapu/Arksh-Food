"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "@/lib/axios"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Switch } from "@/Components/ui/switch"
import { Separator } from "@/Components/ui/separator"
import { MoreHorizontal, Package, Plus, Search, Edit, Eye, ArrowUpDown, ChevronDown, ChevronUp, Check, AlertCircle, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card"
import toast from "react-hot-toast"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  async function GetAllProducts() {
    setLoading(true)
    try {
      const response = await axios.get("api/admin/product")
      setProducts(response.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const UpdateProductStatus = async (productId) => {
    try {
      const response = await axios.put(`/api/admin/product/status/${productId}`)
      if (response.status === 200) {
        toast.success("Product Status Updated")
        GetAllProducts()
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    GetAllProducts()
  }, [])


  const filteredProducts = products
    .filter((product) => {
      return searchTerm === "" || product.Name?.toLowerCase().includes(searchTerm.toLowerCase())
    })


  const productStats = {
    total: products.length,
    inStock: products.filter((p) => p.Quantity > 0).length,
    outOfStock: products.filter((p) => p.Quantity <= 0).length,
    Active: products.filter((p) => p.Status == "Active").length,
  }

  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card className="bg-white border-[#E0F0FF] shadow-sm overflow-hidden">
          <CardContent className="p-3 md:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm font-medium text-[#0A4D9C]">Total</p>
                <div className="text-lg md:text-xl font-bold text-[#0A4D9C]">{productStats.total}</div>
              </div>
              <Package className="h-6 w-6 md:h-8 md:w-8 text-[#30B4E7]/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#E0F0FF] shadow-sm overflow-hidden">
          <CardContent className="p-3 md:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm font-medium text-[#30B4E7]">In Stock</p>
                <div className="text-lg md:text-xl font-bold text-[#30B4E7]">{productStats.inStock}</div>
              </div>
              <Check className="h-6 w-6 md:h-8 md:w-8 text-[#30B4E7]/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#E0F0FF] shadow-sm overflow-hidden">
          <CardContent className="p-3 md:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm font-medium text-red-600">Out of Stock</p>
                <div className="text-lg md:text-xl font-bold text-red-700">{productStats.outOfStock}</div>
              </div>
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#E0F0FF] shadow-sm overflow-hidden">
          <CardContent className="p-3 md:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs md:text-sm font-medium text-[#0A4D9C]">Active</p>
                <div className="text-lg md:text-xl font-bold text-[#0A4D9C]">{productStats.Active}</div>
              </div>
              <Eye className="h-6 w-6 md:h-8 md:w-8 text-[#30B4E7]/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-[#E0F0FF] shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#30B4E7]" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 w-full border-[#E0F0FF] focus-visible:ring-[#30B4E7]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto border-[#30B4E7] text-[#0A4D9C] hover:bg-[#E0F0FF]"
              onClick={() => setSearchTerm("")}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-[#E0F0FF] bg-white p-4 shadow-sm animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-[#E0F0FF]"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-[200px] bg-[#E0F0FF] rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-[100px] bg-[#E0F0FF] rounded"></div>
                    <div className="h-4 w-[80px] bg-[#E0F0FF] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* No Products Found */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#E0F0FF] shadow-sm p-8 text-center">
              <div className="flex flex-col items-center justify-center text-[#30B4E7]">
                <Package className="h-16 w-16 mb-4 text-[#30B4E7]/30" />
                <h3 className="text-lg font-medium text-[#0A4D9C] mb-2">No products found</h3>
                <p className="text-[#0A4D9C]/70 mb-4">Try adjusting your search criteria</p>
                <Button asChild className="bg-[#0A4D9C] hover:bg-[#0A4D9C]/90">
                  <Link href="/admin/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop List View */}
              <div className="hidden md:block bg-white rounded-lg border border-[#E0F0FF] shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-[#F5FAFF]">
                    <TableRow className="hover:bg-[#E0F0FF]/50">
                      <TableHead>
                        <div
                          className="flex items-center cursor-pointer text-[#0A4D9C]"
                        >
                          Product
                        </div>
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">Category</TableHead>
                      <TableHead>
                        <div
                          className="flex items-center cursor-pointer text-[#0A4D9C]"
                        >
                          Price
                        </div>
                      </TableHead>
                      <TableHead>
                        <div
                          className="flex items-center cursor-pointer text-[#0A4D9C]"
                        >
                          Stock
                        </div>
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">Active</TableHead>
                      <TableHead className="w-12 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product._id} className="hover:bg-[#F5FAFF]">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-[#E0F0FF]">
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  `${product.Media?.Images?.[0] || "/Media/Images/Logo/placeholder.svg"}` ||
                                  "/Media/Images/Logo/placeholder.svg?height=48&width=48"
                                }
                                alt={product.Name || "Product"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium truncate md:w-[300px]">{product.Name}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="outline" className="bg-[#F5FAFF] text-[#0A4D9C] border-[#E0F0FF]">
                            {product.Category?.Category || "Uncategorized"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-[#0A4D9C]">Rs. {product.Price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.Quantity > 10 ? "outline" : product.Quantity > 0 ? "secondary" : "destructive"
                            }
                            className={
                              product.Quantity > 10
                                ? "bg-[#F5FAFF] text-[#30B4E7] border-[#30B4E7]"
                                : product.Quantity > 0
                                  ? "bg-[#30B4E7] text-white"
                                  : ""
                            }
                          >
                            {product.Quantity > 0 ? product.Quantity : "Out of stock"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Switch checked={product.Status == "Active"} className="data-[state=checked]:bg-[#30B4E7]" onClick={() => { UpdateProductStatus(product._id) }} />
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-[#F5FAFF]">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="border-[#E0F0FF]">
                                <DropdownMenuLabel className="text-[#0A4D9C]">Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#E0F0FF]" />
                                <DropdownMenuItem className="cursor-pointer hover:bg-[#F5FAFF] hover:text-[#0A4D9C]">
                                  <Link href={`/admin/products/edit/${product._id}`} className="flex justify-center items-center gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit Product
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#E0F0FF]" />
                                <DropdownMenuItem className="cursor-pointer hover:bg-[#F5FAFF] hover:text-[#0A4D9C]">
                                  <Link href={`/product/${product.Slug}`} className="flex justify-center items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List View */}
              <div className="md:hidden space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product._id} className="bg-white border-[#E0F0FF] shadow-sm overflow-hidden !py-0 gap-[7px]">
                    <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-medium truncate min-w-[200px] max-w-[300px] text-[#0A4D9C]">
                          {product.Name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-[#E0F0FF] flex-shrink-0">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              `${product.Media?.Images?.[0] || "/Media/Images/Logo/placeholder.svg"}` ||
                              "/Media/Images/Logo/placeholder.svg?height=64&width=64"
                            }
                            alt={product.Name || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#0A4D9C]">Rs. {product.Price}</span>
                            <Badge
                              variant={
                                product.Quantity > 10 ? "outline" : product.Quantity > 0 ? "secondary" : "destructive"
                              }
                              className={
                                product.Quantity > 10
                                  ? "bg-[#F5FAFF] text-[#30B4E7] border-[#30B4E7] text-xs"
                                  : product.Quantity > 0
                                    ? "bg-[#30B4E7] text-white text-xs"
                                    : "text-xs"
                              }
                            >
                              {product.Quantity > 0 ? `Stock: ${product.Quantity}` : "Out of stock"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-[#0A4D9C]/70">Active:</span>
                              <Switch checked={product.Status == "Active"} className="data-[state=checked]:bg-[#30B4E7]" onClick={() => { UpdateProductStatus(product._id) }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="bg-[#E0F0FF]" />
                    <CardFooter className="px-4 py-3 flex justify-between">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="text-xs text-[#0A4D9C] hover:bg-[#F5FAFF] hover:text-[#0A4D9C] flex justify-center items-center gap-1"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Link>
                      <Link
                        href={`/product/${product.Slug}`}
                        className="text-xs text-[#0A4D9C] hover:bg-[#F5FAFF] hover:text-[#0A4D9C] flex justify-center items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  )
}
