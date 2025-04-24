import { format } from 'date-fns';
import React, { useState } from 'react'
import { Star } from "lucide-react"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Avatar } from "@/Components/ui/avatar"
import UseProductDetails from './UseProductDetails';
const ReviewTab = () => {
    const { AddReview, Rating, setRating, Comment, setComment, Reviews } = UseProductDetails();
    return (
        <div className="space-y-8">
            <Card className="border-none">
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 cursor-pointer transition-colors ${i < Rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200"
                                            }`}
                                        onClick={() => setRating(i + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Your Review</label>
                            <Textarea
                                placeholder="Share your thoughts about the product..."
                                className="min-h-[150px] resize-none"
                                value={Comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <Button className="w-full sm:w-auto bg-black hover:bg-black/90 text-white" onClick={async () => await AddReview()}>Submit Review</Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none">
                <CardContent className="p-6">

                    {Reviews.length > 0 ? (
                        <>
                            <h3 className="text-xl font-semibold !mb-4">Reviews ({Reviews.length})</h3>
                            {Reviews.map((Review, index) => (
                                <div key={index} className="flex items-start gap-4 mt-4">
                                    <Avatar className="w-12 h-12 grid place-content-center">
                                        <Avatar className="grid place-content-center"> {Review?.UserID?.Name.split(' ').map((part, i) => i === 0 || i === 1 ? part[0] : '').join('')}</Avatar>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-black">{Review?.UserID?.Name}</h4>
                                                <p className="text-sm text-gray-500">{format(new Date(Review?.CreatedAt), 'MMM dd, yyyy hh:mm a')}</p>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Review?.Rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-2">{Review?.Comment}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <h3 className="text-xl font-semibold mb-6">No Reviews Yet</h3>
                    )}

                </CardContent>
            </Card>
        </div>
    )
}

export default ReviewTab
