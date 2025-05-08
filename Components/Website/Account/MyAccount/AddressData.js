"use client"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"

const AddressData = ({ Addresses }) => {
    const hasAddress = Addresses && Addresses.length > 0

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your delivery addresses</p>
                </div>
            </div>

            {hasAddress ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Addresses?.map((address) => (
                        <Card key={address?._id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3 flex justify-between items-start">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#e6f0f9] flex items-center justify-center mr-3">
                                        <MapPin className="h-5 w-5 text-[#0055a4]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h3 className="font-medium text-gray-900 text-base">{address?.AddressName}</h3>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="text-gray-700 space-y-1">
                                    <p className="text-sm font-medium">{address?.Name}</p>
                                    <p className="text-sm text-gray-500">{address?.Phone}</p>
                                    <p className="text-sm text-gray-500">
                                        {address?.Address}, {address?.City}
                                    </p>
                                    <p className="text-sm text-gray-500">{address?.City}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="w-16 h-16 rounded-full bg-[#e6f0f9] flex items-center justify-center mb-4">
                        <MapPin className="h-8 w-8 text-[#0055a4]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
                    <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
                        You haven't added any delivery addresses yet. Add an address to make checkout faster.
                    </p>
                </div>
            )}
        </div>
    )
}

export default AddressData
