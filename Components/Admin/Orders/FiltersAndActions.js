"use client"
import React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import useOrderActions from "@/Components/Hooks/Order"

export default function FilterAndActions() {
    const { goToPage, updateFilters, handleSearchSubmit, searchQuery, setSearchQuery, perPage } = useOrderActions();
    return (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                onClick={() => {
                                    setSearchQuery("")
                                    updateFilters({ search: null })
                                }}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </form>

                    <Select
                        onValueChange={(value) => updateFilters({ status: value === "all" ? null : value })}
                    >
                        <SelectTrigger className="w-full sm:w-[160px] border-gray-200 dark:border-gray-800">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={perPage.toString()} onValueChange={(value) => goToPage(1, Number.parseInt(value))}>
                        <SelectTrigger className="w-[110px] border-gray-200 dark:border-gray-800">
                            <SelectValue placeholder="Show" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 items</SelectItem>
                            <SelectItem value="20">20 items</SelectItem>
                            <SelectItem value="50">50 items</SelectItem>
                            <SelectItem value="100">100 items</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
