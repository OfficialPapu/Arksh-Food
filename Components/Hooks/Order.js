"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getStatusColor } from "@/Components/ui/getStatusColor"
import axios from "@/lib/axios"

const useOrderActions = () => {
    const [Orders, setOrders] = useState([]);

    const fetchOrderList = async () => {
        try {
            const response = await axios.get("api/admin/orders");
            setOrders(Object.values(response.data));
        } catch (error) {
            console.error("Error fetching order list:", error);
        }
    }
    const hasFetched = useRef(false);
    useEffect(() => {
        const fetchAndLogOrderList = async () => {
            await fetchOrderList();
        }
        if (!hasFetched.current) {
            hasFetched.current = true
            fetchAndLogOrderList();
        }
    }, [])

    const router = useRouter()
    const pathname = "/admin/orders"
    const searchParams = useSearchParams()
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")) : 1
    const perPage = searchParams.get("perPage") ? Number.parseInt(searchParams.get("perPage")) : 10
    const Status = searchParams.get("status") || "all"

    const search = searchParams.get("search") || ""
    const [searchQuery, setSearchQuery] = useState(search)

    const createQueryString = useCallback(
        (params) => {
            const newSearchParams = new URLSearchParams(searchParams.toString())
            Object.entries(params).forEach(([key, value]) => {
                if (value === null) {
                    newSearchParams.delete(key)
                } else {
                    newSearchParams.set(key, value.toString())
                }
            })

            return newSearchParams.toString()
        },
        [searchParams],
    )

    const goToPage = useCallback(
        (newPage, newPerPage) => {
            const queryParams = { page: newPage }
            if (newPerPage) queryParams.perPage = newPerPage

            router.push(`${pathname}?${createQueryString(queryParams)}`)
        },
        [pathname, router, createQueryString],
    )


    const updateFilters = useCallback(
        (params) => {
            const queryParams = { ...params, page: 1 }
            router.push(`${pathname}?${createQueryString(queryParams)}`)
        },
        [pathname, router, createQueryString],
    )

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        updateFilters({ search: searchQuery || null })
    }

    const filteredOrders = Orders.filter((order) => {
        const matchesStatus = Status == "all" ? true : order?.Shipping?.Status.toLowerCase() == Status
        const normalizeText = (text) => {
            if (!text) return '';
            return text.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
        };

        const matchesSearch = search === "" ? true :
            normalizeText(order?.OrderID).includes(normalizeText(search)) ||
            normalizeText(order?.UserID?.Name).includes(normalizeText(search)) ||
            normalizeText(order?.UserID?.Email).includes(normalizeText(search)) ||
            normalizeText(order?.UserID?.Mobile).includes(normalizeText(search)) ||
            normalizeText(order?.Shipping?.Status).includes(normalizeText(search)) ||
            normalizeText(order?.Shipping?.Address?.Name).includes(normalizeText(search)) ||
            normalizeText(order?.Shipping?.Address?.Phone).includes(normalizeText(search));
        return matchesStatus && matchesSearch
    })

    const totalPages = Math.ceil(filteredOrders.length / perPage)
    const indexOfLastItem = page * perPage
    const indexOfFirstItem = indexOfLastItem - perPage
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

    const getPageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 10

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= 3; i++) {
                pageNumbers.push(i)
            }
        } else {
            if (page <= 3) {
                // Near the start
                for (let i = 1; i <= 2; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("...")
                pageNumbers.push(totalPages)
            } else if (page >= totalPages - 2) {
                // Near the end
                pageNumbers.push(1)
                pageNumbers.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                // MOrderIDdle
                pageNumbers.push(1)
                pageNumbers.push("...")
                for (let i = page - 1; i <= page + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("...")
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }


    return { getPageNumbers, getStatusColor, goToPage, page, totalPages, indexOfLastItem, indexOfFirstItem, currentItems, filteredOrders, Orders, updateFilters, handleSearchSubmit, searchQuery, setSearchQuery, perPage, fetchOrderList }
}

export default useOrderActions;