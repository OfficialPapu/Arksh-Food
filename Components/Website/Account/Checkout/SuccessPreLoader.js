import React from "react";

const SuccessPreLoader = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 my-4 md:my-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="animate-pulse">
            <div className="h-7 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-100 rounded"></div>
          </div>

          <div className="my-6 h-px bg-gray-200"></div>

          {/* Success message */}
          <div className="bg-[#f0f7ff] rounded-lg p-4 mb-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="bg-[#0057b8] rounded-full p-2 mt-1 h-9 w-9 shrink-0"></div>
              <div className="w-full">
                <div className="h-6 w-3/4 bg-white rounded mb-2"></div>
                <div className="h-4 w-full bg-white rounded mb-3"></div>
                <div className="h-6 w-40 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="mb-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#0057b8] shrink-0"></div>
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="ml-auto">
                <div className="h-4 w-24 bg-gray-100 rounded"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Order Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#0057b8] shrink-0"></div>
                  <div className="h-5 w-36 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-100 rounded"></div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#0057b8] shrink-0"></div>
                  <div className="h-5 w-40 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  <div className="h-4 w-14 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full border-2 border-[#0057b8] shrink-0"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-4">
              {/* Product item */}
              <div className="p-4 border-b">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded shrink-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#0057b8]"></div>
                  </div>
                  <div className="w-full">
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="p-4 grid grid-cols-2 gap-y-3">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-100 rounded ml-auto"></div>

                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-100 rounded ml-auto"></div>

                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-100 rounded ml-auto"></div>

                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-100 rounded ml-auto"></div>
              </div>
            </div>

            {/* Total amount */}
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div>
                <div className="h-6 w-28 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-24 bg-gray-100 rounded ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPreLoader;
