"use client"

import { useEffect, useState } from "react"
import {
  Download,
  FileUp,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  Star,
  Edit,
  Eye,
  Copy,
  ArrowUpDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import axios from "@/lib/axios"

import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Switch } from "@/Components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card"
// import { Skeleton } from "@/Components/ui/skeleton"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"

export default function Products() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: "Name", direction: "ascending" })

  async function GetAllProducts() {
    setLoading(true)
    try {
      const response = await axios.get("api/admin/product")
      setProducts(response.data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetAllProducts()
  }, [])

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((_id) => _id !== productId) : [...prev, productId],
    )
  }

  const toggleAllProducts = () => {
    setSelectedProducts((prev) => (prev.length === filteredProducts.length ? [] : filteredProducts.map((p) => p._id)))
  }

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = searchTerm === "" || product.Name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "" || (product.Category && product.Category.Category === selectedCategory)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (!a[sortConfig.key] || !b[sortConfig.key]) return 0

      if (sortConfig.key === "Price") {
        return sortConfig.direction === "ascending"
          ? Number.parseFloat(a[sortConfig.key]) - Number.parseFloat(b[sortConfig.key])
          : Number.parseFloat(b[sortConfig.key]) - Number.parseFloat(a[sortConfig.key])
      }

      if (sortConfig.key === "Quantity") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key]
      }

      return sortConfig.direction === "ascending"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key])
    })

  // Function to handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    // Implement your delete logic here
    console.log("Deleting products:", selectedProducts)

    // Reset selection after delete
    setSelectedProducts([])
  }

  // Get product stats
  const productStats = {
    total: products.length,
    inStock: products.filter((p) => p.Quantity > 0).length,
    outOfStock: products.filter((p) => p.Quantity <= 0).length,
    published: products.filter((p) => p.published).length,
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-1.5">
              <Star className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-primary-700 sm:text-xl">Products</h1>
            {selectedProducts.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-secondary text-white">
                {selectedProducts.length} selected
              </Badge>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-800 sm:inline-flex"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Products</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-800 sm:inline-flex"
                  >
                    <FileUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Import Products</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="destructive"
              size="icon"
              disabled={selectedProducts.length === 0}
              className="sm:hidden"
              title="Delete Selected"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={selectedProducts.length === 0}
              className="hidden sm:inline-flex"
              onClick={handleBulkDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
            <Button size="icon" className="bg-primary hover:bg-primary-800 sm:hidden" title="Add Product" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
            <Link href="/admin/products/new" className="hidden sm:block">
              <Button size="sm" className="bg-primary hover:bg-primary-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards - Mobile Only */}
      <div className="grid grid-cols-2 gap-3 p-4 sm:hidden">
        <Card className="bg-white shadow-sm border-primary-100">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Total</span>
              <div className="text-lg font-bold text-primary-700">{productStats.total}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-primary-100">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">In Stock</span>
              <div className="text-lg font-bold text-green-600">{productStats.inStock}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-primary-100">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Out of Stock</span>
              <div className="text-lg font-bold text-red-600">{productStats.outOfStock}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-primary-100">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Published</span>
              <div className="text-lg font-bold text-secondary">{productStats.published}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:gap-8">
        {/* Stats Cards - Desktop Only */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm border-primary-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-700">{productStats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-primary-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{productStats.inStock}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-primary-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{productStats.outOfStock}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-primary-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{productStats.published}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 sm:max-w-[300px] border-primary-200 focus-visible:ring-primary-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="sm:hidden">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[50vh]">
                <SheetHeader>
                  <SheetTitle className="text-primary-700">Filter Products</SheetTitle>
                  <SheetDescription>Apply filters to narrow down your product list</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-primary-700">Category</h3>
                    <Select
                      value={selectedCategory}
                      onValueChange={(value) => {
                        setSelectedCategory(value)
                        setIsFilterOpen(false)
                      }}
                    >
                      <SelectTrigger className="w-full border-primary-200">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-primary-700">Stock Status</h3>
                    <Select>
                      <SelectTrigger className="w-full border-primary-200">
                        <SelectValue placeholder="All Products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                          <SelectItem value="low-stock">Low Stock</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-primary-700">Published Status</h3>
                    <Select>
                      <SelectTrigger className="w-full border-primary-200">
                        <SelectValue placeholder="All Products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="unpublished">Unpublished</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] border-primary-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] border-primary-200">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Stock Status</SelectLabel>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border bg-white p-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary-100"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-[200px] bg-primary-100 rounded"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-[100px] bg-primary-100 rounded"></div>
                      <div className="h-4 w-[80px] bg-primary-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="rounded-lg border bg-white shadow-sm hidden sm:block overflow-hidden">
              <ScrollArea className="h-[calc(100vh-320px)] md:h-[calc(100vh-280px)] lg:h-[calc(100vh-260px)]">
                <Table>
                  <TableHeader className="bg-primary-50 sticky top-0">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                          onCheckedChange={toggleAllProducts}
                        />
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("Name")}>
                          Product
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("Price")}>
                          Price
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("Quantity")}>
                          Stock
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Published</TableHead>
                      <TableHead className="w-12 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Package className="h-8 w-8 mb-2 text-primary-200" />
                            <p>No products found.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product._id} className="hover:bg-primary-50/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product._id)}
                              onCheckedChange={() => toggleProduct(product._id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-md border border-primary-100">
                                <Image
                                  src={
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    `${product.Media?.Images?.[0] || "/placeholder.svg"}` ||
                                    "/placeholder.svg?height=48&width=48"
                                  }
                                  alt={product.Name || "Product"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-primary-800">{product.Name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ID: {product._id?.substring(0, 8)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                              {product.Category?.Category || "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">Rs. {product.Price}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge
                              variant={
                                product.Quantity > 10 ? "outline" : product.Quantity > 0 ? "secondary" : "destructive"
                              }
                              className={product.Quantity > 10 ? "bg-green-50 text-green-700 border-green-200" : ""}
                            >
                              {product.Quantity > 0 ? product.Quantity : "Out of stock"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Switch
                              checked={product.published}
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="hover:bg-primary-50">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-primary-100">
                                  <DropdownMenuLabel className="text-primary-700">Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Product
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive cursor-pointer">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Product
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* Mobile List View */}
            <div className="sm:hidden space-y-3 pb-16">
              {filteredProducts.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-white shadow-sm">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="h-8 w-8 mb-2 text-primary-200" />
                    <p>No products found.</p>
                  </div>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="overflow-hidden bg-white shadow-sm border-primary-100 hover:border-primary-300 transition-colors"
                  >
                    <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedProducts.includes(product._id)}
                          onCheckedChange={() => toggleProduct(product._id)}
                          className="border-primary-300"
                        />
                        <CardTitle className="text-sm font-medium truncate max-w-[200px] text-primary-800">
                          {product.Name}
                        </CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-primary-100 w-[180px]">
                          <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer hover:bg-primary-50 hover:text-primary-700">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-primary-100 flex-shrink-0">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              `${product.Media?.Images?.[0] || "/placeholder.svg"}` ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={product.Name || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary-700">Rs. {product.Price}</span>
                            <Badge
                              variant={
                                product.Quantity > 10 ? "outline" : product.Quantity > 0 ? "secondary" : "destructive"
                              }
                              className={
                                product.Quantity > 10
                                  ? "bg-green-50 text-green-700 border-green-200 text-xs"
                                  : "text-xs"
                              }
                            >
                              {product.Quantity > 0 ? `Stock: ${product.Quantity}` : "Out of stock"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs bg-primary-50 text-primary-700 border-primary-200"
                            >
                              {product.Category?.Category || "Uncategorized"}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Published:</span>
                              <Switch checked={product.published} className="h-4 w-7 data-[state=checked]:bg-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="bg-primary-100" />
                    <CardFooter className="p-2 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-destructive hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </div>
      {/* Pagination - Desktop */}
      <div className="hidden sm:flex items-center justify-between border-t border-primary-100 bg-white px-4 py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button variant="outline" size="sm" className="border-primary-200">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-primary-200">
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{filteredProducts.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Button variant="outline" size="icon" className="rounded-l-md border-primary-200">
                <span className="sr-only">Previous</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="border-primary-200 bg-primary-50 text-primary-700">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-primary-200">
                2
              </Button>
              <Button variant="outline" size="sm" className="border-primary-200">
                3
              </Button>
              <Button variant="outline" size="icon" className="rounded-r-md border-primary-200">
                <span className="sr-only">Next</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 p-3 flex justify-between items-center sm:hidden z-10">
        <div className="text-sm text-primary-700">
          {selectedProducts.length > 0 ? (
            <span className="font-medium">{selectedProducts.length} selected</span>
          ) : (
            <span>{filteredProducts.length} products</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            disabled={selectedProducts.length === 0}
            onClick={handleBulkDelete}
            className="h-9"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-800 h-9" asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Link>
          </Button>
        </div>
      </div>
      {/* Pagination - Mobile */}
      <div className="flex items-center justify-between border-t border-primary-100 bg-white px-4 py-3 sm:hidden mb-16">
        <Button variant="outline" size="sm" className="border-primary-200">
          Previous
        </Button>
        <div className="text-sm text-gray-700">
          Page <span className="font-medium">1</span> of <span className="font-medium">3</span>
        </div>
        <Button variant="outline" size="sm" className="border-primary-200">
          Next
        </Button>
      </div>
    </div>
  )
}
