import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const PreLoader = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
    {/* Breadcrumb skeleton */}
    <div className="flex items-center gap-2 mb-6">
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left column - Product images */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 order-2 md:order-1">
          {[1, 2].map((item) => (
            <div key={item} className="h-16 w-16 border rounded bg-gray-100 animate-pulse"></div>
          ))}
        </div>

        {/* Main product image */}
        <div className="w-full h-80 md:h-96 bg-gray-100 rounded border order-1 md:order-2 animate-pulse flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-[#0057b8] animate-spin opacity-30" />
        </div>
      </div>

      {/* Right column - Product details */}
      <div className="flex flex-col gap-6">
        {/* Category badge */}
        <div className="h-6 w-24 bg-[#0057b8] rounded-full animate-pulse opacity-40"></div>

        {/* Product title */}
        <div className="space-y-2">
          <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Product description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Price section */}
        <div className="flex items-center gap-4 mt-2">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-green-200 rounded-full animate-pulse"></div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mt-2">
          <div className="h-10 w-10 rounded-full border bg-gray-100 animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-10 rounded-full border bg-gray-100 animate-pulse"></div>
        </div>

        {/* Key benefits */}
        <div className="mt-4">
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-2 border rounded-lg p-3 animate-pulse">
                <div className="h-6 w-6 rounded-full bg-[#0057b8] opacity-40"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-12 w-full bg-[#7aaed4] rounded-lg animate-pulse"></div>
          <div className="h-12 w-full border-2 border-[#0057b8] bg-white rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PreLoader;
