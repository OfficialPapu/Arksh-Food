"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CategoryPage = () => {
  const { Slug } = useParams()



  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8 text-gray-600 bg-white p-3 rounded-lg shadow-sm">
          <Link href="/" className="hover:text-[#0055a4] transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <Link href="/menu" className="hover:text-[#0055a4] transition-colors">Menu</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="font-medium text-[#0055a4] capitalize">{Slug}</span>
        </div>

        {/* Category Description Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#0055a4]/10 flex items-center justify-center flex-shrink-0">
              {/* Replace with category icon */}
              <span className="text-3xl">🍔</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{Slug} Category</h2>
              <p className="text-gray-600">
                Our {Slug} are prepared using the finest ingredients, traditional recipes with a modern twist.
                Each dish is crafted with care to ensure an exceptional dining experience.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500 mb-2">Sort by:</div>
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055a4]">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-[#0055a4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0055a4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria.</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="px-6 py-3 bg-[#0055a4] hover:bg-[#003d7a] text-white rounded-lg font-medium transition-all"
          >
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  )
}

export default CategoryPage