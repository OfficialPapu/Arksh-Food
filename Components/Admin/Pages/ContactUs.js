"use client"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Mail, Phone, Calendar, Eye, Loader2 } from "lucide-react"
import axios from "@/lib/axios";

export default function ContactUs() {
    const [submissions, setSubmissions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSubmission, setSelectedSubmission] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const fetchSubmissions = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("api/contact-us");
            setSubmissions(response.data)
        } catch (error) {
            console.error("Error fetching contact submissions:", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSubmissions()
    }, [])

    const viewSubmissionDetails = (submission) => {
        setSelectedSubmission(submission)
        setIsDetailOpen(true)
    }

    return (
        <div className="mx-auto p-0 sm:p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contact Form Submissions</h1>
                <p className="text-gray-500">
                    View customer inquiries from your website
                </p>
                <div className="mt-4 h-1 w-20 bg-[#0055a4]"></div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Loader2 className="h-10 w-10 animate-spin text-[#0055a4] mb-4" />
                    <p className="text-gray-500">Loading submissions...</p>
                </div>
            ) : submissions.length === 0 ? (
                <Card className="text-center py-20 border-gray-100 shadow-sm">
                    <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-[#0055a4]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        When customers submit the contact form on your website, their messages will appear here.
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-6">
                    {submissions.map((submission) => (
                        <Card
                            key={submission._id}
                            className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 shadow-sm h-full flex flex-col bg-white hover:border-[#0055a4]/20"
                            onClick={() => viewSubmissionDetails(submission)}
                        >
                            <CardHeader className="p-4 pb-2 border-b border-gray-50 flex-shrink-0 bg-gradient-to-r from-[#f8fafc] to-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#0055a4] rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">
                                                {submission?.Name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-medium text-gray-900 line-clamp-1">
                                                {submission?.Name}
                                            </CardTitle>
                                            <p className="text-xs text-gray-500 flex items-center mt-1">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {format(new Date(submission.CreatedAt), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            viewSubmissionDetails(submission);
                                        }}
                                        className="h-8 w-8 p-0 rounded-full bg-gray-50 text-[#0055a4] hover:bg-[#0055a4] hover:text-white transition-colors"
                                    >
                                        <Eye size={15} />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-3 flex-grow flex flex-col">
                                <div className="mb-3">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                                    <p className="text-sm text-gray-700 flex items-center">
                                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                                        <span className="truncate">{submission?.Email}</span>
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Subject</p>
                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{submission?.Subject}</p>
                                </div>
                                <div className="mt-auto pt-3 border-t border-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Message Preview</p>
                                    <p className="text-sm text-gray-700 line-clamp-3">{submission?.Message}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Submission Detail Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-lg max-h-[99vh] overflow-y-auto">
                    <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-[#0055a4] text-xl flex items-center">
                            <Mail className="h-5 w-5 mr-2" />
                            Message Details
                        </DialogTitle>
                        <DialogDescription>
                            Received {selectedSubmission && format(new Date(selectedSubmission.CreatedAt), "MMMM d, yyyy 'at' h:mm a")}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSubmission && (
                        <div className="space-y-6 pt-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-[#0055a4]/20 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#0055a4] rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-lg">
                                            {selectedSubmission?.Name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{selectedSubmission?.Name}</h3>
                                        <div className="flex items-center mt-2 text-sm text-gray-500">
                                            <Mail className="h-4 w-4 mr-1 text-[#0055a4]" />
                                            <a href={`mailto:${selectedSubmission?.Email}`} className="hover:text-[#0055a4] transition-colors">
                                                {selectedSubmission?.Email}
                                            </a>
                                        </div>
                                        {selectedSubmission?.Phone && (
                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                <Phone className="h-4 w-4 mr-1 text-[#0055a4]" />
                                                <a href={`tel:${selectedSubmission?.Phone}`} className="hover:text-[#0055a4] transition-colors">
                                                    {selectedSubmission?.Phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                    <span className="bg-[#0055a4]/10 text-[#0055a4] rounded-md px-2 py-1 text-xs mr-2 mb-2">Subject</span>
                                </h4>
                                <p className="text-gray-900 font-medium text-lg">{selectedSubmission?.Subject}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                                    <span className="bg-[#0055a4]/10 text-[#0055a4] rounded-md px-2 py-1 text-xs mr-2 mb-2">Message</span>
                                </h4>
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:border-[#0055a4]/20 transition-colors">
                                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedSubmission?.Message}</p>
                                </div>
                            </div>

                            <DialogFooter className="flex justify-between gap-3 pt-2 border-t mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDetailOpen(false)}
                                    className="border-gray-300 hover:bg-gray-50"
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}