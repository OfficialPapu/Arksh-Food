"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, Eye, ArrowUpDown } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

// Sample product data - in a real app, this would come from an API or database
const sampleProducts = [
  {
    id: 1,
    name: 'Organic Vegetables Bundle',
    category: 'Organic Products',
    price: 350,
    discountedPrice: 297.50,
    stock: 45,
    status: 'In Stock',
    isNew: true,
    isBestSeller: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Fresh Fruit Basket',
    category: 'Organic Products',
    price: 450,
    discountedPrice: null,
    stock: 12,
    status: 'Low Stock',
    isNew: false,
    isBestSeller: true,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Premium Spice Collection',
    category: 'Spices & Masalas',
    price: 550,
    discountedPrice: 467.50,
    stock: 30,
    status: 'In Stock',
    isNew: false,
    isBestSeller: false,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Homemade Pickle Set',
    category: 'Pickles & Chutneys',
    price: 650,
    discountedPrice: null,
    stock: 0,
    status: 'Out of Stock',
    isNew: true,
    isBestSeller: false,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Assorted Tea Collection',
    category: 'Tea & Beverages',
    price: 750,
    discountedPrice: 637.50,
    stock: 25,
    status: 'In Stock',
    isNew: false,
    isBestSeller: false,
    imageUrl: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Traditional Snack Box',
    category: 'Snacks',
    price: 850,
    discountedPrice: 722.50,
    stock: 18,
    status: 'In Stock',
    isNew: false,
    isBestSeller: true,
    imageUrl: '/placeholder.svg'
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all-categories');
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all-categories' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all-status' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-amber-100 text-amber-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0057b7] sm:text-3xl">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings.</p>
        </div>
        <Button asChild className="gap-1 bg-[#0057b7] hover:bg-[#0055a4]/90 w-full md:w-auto">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Link>
        </Button>
      </div>

      {/* Filters and search */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="Spices & Masalas">Spices & Masalas</SelectItem>
                  <SelectItem value="Pickles & Chutneys">Pickles & Chutneys</SelectItem>
                  <SelectItem value="Tea & Beverages">Tea & Beverages</SelectItem>
                  <SelectItem value="Organic Products">Organic Products</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product table */}
          <div className="rounded-lg border">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm min-w-full table-fixed md:table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer" onClick={() => requestSort('id')}>
                      <div className="flex items-center gap-1">
                        ID
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer" onClick={() => requestSort('name')}>
                      <div className="flex items-center gap-1">
                        Product
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 hidden md:table-cell cursor-pointer" onClick={() => requestSort('category')}>
                      <div className="flex items-center gap-1">
                        Category
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer" onClick={() => requestSort('price')}>
                      <div className="flex items-center gap-1">
                        Price
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 hidden lg:table-cell cursor-pointer" onClick={() => requestSort('stock')}>
                      <div className="flex items-center gap-1">
                        Stock
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 hidden sm:table-cell cursor-pointer" onClick={() => requestSort('status')}>
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700">#{product.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              {product.isNew && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                                  New
                                </Badge>
                              )}
                              {product.isBestSeller && (
                                <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs">
                                  Best Seller
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 hidden md:table-cell">{product.category}</td>
                      <td className="px-4 py-3">
                        {product.discountedPrice ? (
                          <div>
                            <div className="font-medium text-gray-900">NPR {product.discountedPrice.toLocaleString()}</div>
                            <div className="text-xs text-gray-500 line-through">NPR {product.price.toLocaleString()}</div>
                          </div>
                        ) : (
                          <div className="font-medium text-gray-900">NPR {product.price.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 hidden lg:table-cell">{product.stock}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty state */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <Button onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all-categories');
                setStatusFilter('all-status');
              }}>

                Clear filters
              </Button>
            </div>
          )}

          {/* Pagination - simplified for demo */}
          {sortedProducts.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{sortedProducts.length}</span> of <span className="font-medium">{products.length}</span> products
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-[#0057b7] text-white hover:bg-[#0055a4]/90">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;