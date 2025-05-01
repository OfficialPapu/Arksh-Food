
"use client"

import { useEffect, useState } from "react"
import { Download, FileUp, MoreHorizontal, Package, Plus, Search, Trash2 } from "lucide-react"
import Image from "next/image"

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
import Link from "next/link"
import axios from "@/lib/axios"

export default function Products() {
  const [selectedProducts, setSelectedProducts] = useState([])

  const [products, setproduct] = useState([]);
  async function GetAllProducts() {
    const response = await axios.get('api/admin/product');
    setproduct(response.data);
  }

  useEffect(() => {
    GetAllProducts();
  }, [])


  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((_id) => _id !== productId) : [...prev, productId],
    )
  }

  const toggleAllProducts = () => {
    setSelectedProducts((prev) => (prev.length === products.length ? [] : products.map((p) => p._id)))
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <div className="sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h1 className="text-lg font-semibold sm:text-xl">Products</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden sm:inline-flex" title="Export Products">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:inline-flex" title="Import Products">
              <FileUp className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              disabled={selectedProducts.length === 0}
              className="sm:hidden"
              title="Delete Selected"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={selectedProducts.length === 0}
              className="hidden sm:inline-flex"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
            <Button size="icon" className="sm:hidden" title="Add Product">
              <Plus className="h-4 w-4" />
            </Button>
            <Link href="/admin/products/new">
              <Button size="sm" className="hidden sm:inline-flex">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8 sm:max-w-[300px]" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={toggleAllProducts} />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Stock</TableHead>
                <TableHead className="hidden md:table-cell">Published</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product._id)}
                      onCheckedChange={() => toggleProduct(product._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + `${product.Media.Images[0]}` || "/placeholder.svg"}
                        alt={product.Name}
                        width={40}
                        height={40}
                        className="rounded-lg border object-cover h-[40px]"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{product.Name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.Category.Category}</TableCell>
                  <TableCell>Rs. {product.Price}</TableCell>
                  <TableCell className="hidden sm:table-cell">{product.Quantity}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Switch checked={product.published} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

