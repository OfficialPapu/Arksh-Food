"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, BarChart3, Tag, CreditCard, Truck, CheckCircle, UserIcon as UserGroup, MessageSquare, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/Components/ui/scroll-area"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Package className="h-4 w-4" />,
    submenu: [
      {
        title: "All Products",
        href: "/admin/products",
        icon: <Package className="h-3.5 w-3.5" />,
      },
      {
        title: "Add New",
        href: "/admin/products/new",
        icon: <Tag className="h-3.5 w-3.5" />,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: <Tag className="h-3.5 w-3.5" />,
      },
      {
        title: "Inventory",
        href: "/admin/inventory",
        icon: <Package className="h-3.5 w-3.5" />,
      },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    submenu: [
      {
        title: "All Orders",
        href: "/admin/orders",
        icon: <ShoppingCart className="h-3.5 w-3.5" />,
      },
      {
        title: "Pending",
        href: "/admin/orders/pending",
        icon: <CreditCard className="h-3.5 w-3.5" />,
      },
      {
        title: "Shipped",
        href: "/admin/orders/shipped",
        icon: <Truck className="h-3.5 w-3.5" />,
      },
      {
        title: "Completed",
        href: "/admin/orders/completed",
        icon: <CheckCircle className="h-3.5 w-3.5" />,
      },
    ],
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: <Users className="h-4 w-4" />,
    submenu: [
      {
        title: "All Customers",
        href: "/admin/customers",
        icon: <Users className="h-3.5 w-3.5" />,
      },
      {
        title: "Customer Groups",
        href: "/admin/customers/groups",
        icon: <UserGroup className="h-3.5 w-3.5" />,
      },
      {
        title: "Support Tickets",
        href: "/admin/customers/support",
        icon: <MessageSquare className="h-3.5 w-3.5" />,
      },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function MenuList() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/Arksh Food.png"
            alt="ARKSH Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-bold text-[#0057b7]">ARKSH Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {navItems.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

function NavItem({ item }) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.submenu) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0057b7]/10 text-[#0057b7]">
              {item.icon}
            </div>
            {item.title}
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 pl-5 border-l border-slate-200">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-[#0057b7]"
              >
                {subItem.icon}
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className="mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0057b7]/10 text-[#0057b7]">
        {item.icon}
      </div>
      {item.title}
    </Link>
  )
}
