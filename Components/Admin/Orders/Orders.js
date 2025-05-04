"use client"
import React, { useEffect, useRef } from "react"
import MobileCard from "@/Components/Admin/Orders/MobileCard"
import DesktopCard from "@/Components/Admin/Orders/DesktopCard"
import FilterAndActions from "@/Components/Admin/Orders/FiltersAndActions"
const Orders = () => {
    return (
        <div className="min-h-screen dark:bg-gray-900">
            <main>
                <FilterAndActions />
                <DesktopCard />
                <MobileCard />
            </main>
        </div>
    )
}

export default Orders
