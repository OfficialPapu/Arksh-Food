'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Home, User, Phone, Search, HelpCircle, FileText, Lock, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
const pageOptions = ['Home', 'about', 'contact', 'search', 'faq', 'terms', 'privacy'];
const pageIcons = {
    home: Home,
    about: User,
    contact: Phone,
    search: Search,
    faq: HelpCircle,
    terms: FileText,
    privacy: Lock
};

export default function SEO() {
    const [page, setPage] = useState('Home');
    const [seoData, setSeoData] = useState({
        title: '',
        description: '',
        keywords: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSeo = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`api/seo/${page}`);
                if (res.data) {
                    setSeoData({
                        title: res.data.Title || '',
                        description: res.data.Description || '',
                        keywords: res.data.Keywords?.join(', ') || '',
                    });
                }
            } catch (error) {
                toast.error(error.response.data.message || 'An error occurred while fetching SEO data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSeo();
    }, [page]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('api/admin/seo', {
                page,
                ...seoData,
                keywords: seoData.keywords.split(',').map(k => k.trim()),
            });
            toast.success('SEO Updated Successfully');
        } catch (error) {
            toast.error(error.response.data.message || 'An error occurred while saving SEO data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f5ff]">
            <div className="sm:max-w-6xl mx-auto sm:px-4 px-0 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Improved Page Selector UI with Lucide Icons */}
                    <div className="bg-gradient-to-r from-[#0047AB]/5 to-white p-6 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:mb-0 mb-4">
                            <div className="flex items-center">
                                <div className="bg-white p-3 rounded-xl shadow-sm mr-4 text-[#0047AB]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="!text-2xl font-bold text-[#0047AB]">SEO Settings</h1>
                                    <p className="text-gray-500 text-sm mt-1">Optimize your website for search engines</p>

                                </div>
                            </div>

                            {/* Enhanced Modern Dropdown with Lucide Icons */}
                            <div className="w-full md:w-72">
                                <div className="relative group">
                                    <Select
                                        value={page}
                                        onValueChange={(value) => setPage(value)}
                                    >
                                        <SelectTrigger className="w-full bg-white text-gray-800 rounded-xl px-4 py-7 shadow-sm group-hover:border-[#0047AB]/30 focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 transition-all">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0047AB]/10 text-[#0047AB]">
                                                        {React.createElement(pageIcons[page] || Globe, { size: 18 })}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="capitalize font-medium text-gray-900">{page}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SelectTrigger>

                                        <SelectContent className="bg-white border-0 shadow-xl rounded-xl overflow-hidden z-50 w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                                            <div className="p-2 max-h-[300px] overflow-y-auto">
                                                <div className="px-3 py-2 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                                    Select Page
                                                </div>

                                                {pageOptions.map((p) => {
                                                    const PageIcon = pageIcons[p] || Globe;
                                                    return (
                                                        <SelectItem
                                                            key={p}
                                                            value={p}
                                                            className={`px-3 py-2.5 my-1 rounded-lg cursor-pointer transition-all flex items-center`}
                                                        >
                                                            <div className="flex items-center w-full gap-3">
                                                                <div className={`flex items-center justify-center w-9 h-9 rounded-lg`}>
                                                                    <PageIcon size={18} />
                                                                </div>
                                                                <div className="flex flex-col flex-1">
                                                                    <span className="capitalize font-medium">{p}</span>
                                                                </div>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })}
                                            </div>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="sm:p-6 px-2 py-6">
                        {isLoading ? (
                            <div className="flex justify-center py-16">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#38bdf8]/30 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#0047AB] rounded-full animate-spin"></div>
                                    </div>
                                    <p className="mt-4 text-[#0047AB] font-medium">Loading SEO data...</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    {/* Title Field */}
                                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <div className="flex items-center mb-2 md:mb-0">
                                                <div className="bg-[#0047AB]/10 p-2 rounded-lg mr-3">
                                                    <svg className="w-5 h-5 text-[#0047AB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                    </svg>
                                                </div>
                                                <h3 className="!text-lg font-semibold text-[#0047AB]">Page Title</h3>
                                            </div>
                                            <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                                                Recommended: 50-60 characters
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="title"
                                            value={seoData.title}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0047AB]/20 focus:border-[#0047AB] transition-all"
                                            placeholder="Enter page title"
                                        />
                                        <div className="mt-2 text-xs text-gray-500">
                                            Characters: {seoData.title.length}/60
                                        </div>
                                    </div>

                                    {/* Description Field */}
                                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <div className="flex items-center mb-2 md:mb-0">
                                                <div className="bg-[#0047AB]/10 p-2 rounded-lg mr-3">
                                                    <svg className="w-5 h-5 text-[#0047AB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                                    </svg>
                                                </div>
                                                <h3 className="!text-lg font-semibold text-[#0047AB]">Meta Description</h3>
                                            </div>
                                            <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                                                Recommended: 150-160 characters
                                            </div>
                                        </div>
                                        <textarea
                                            name="description"
                                            value={seoData.description}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0047AB]/20 focus:border-[#0047AB] transition-all"
                                            placeholder="Enter meta description"
                                        />
                                        <div className="mt-2 text-xs text-gray-500">
                                            Characters: {seoData.description.length}/160
                                        </div>
                                    </div>

                                    {/* Keywords Field */}
                                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <div className="flex items-center mb-2 md:mb-0">
                                                <div className="bg-[#0047AB]/10 p-2 rounded-lg mr-3">
                                                    <svg className="w-5 h-5 text-[#0047AB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                                                    </svg>
                                                </div>
                                                <h3 className="!text-lg font-semibold text-[#0047AB]">Keywords</h3>
                                            </div>
                                            <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                                                Separate with commas
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="keywords"
                                            value={seoData.keywords}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0047AB]/20 focus:border-[#0047AB] transition-all"
                                            placeholder="food, restaurant, delivery, etc."
                                        />
                                        <div className="mt-2 text-xs text-gray-500">
                                            Keywords: {seoData.keywords ? seoData.keywords.split(',').length : 0}
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Section */}
                                <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-md">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-[#0047AB]/10 p-2 rounded-lg mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#0047AB]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </div>
                                        <h3 className="!text-lg font-semibold text-[#0047AB]">Search Preview</h3>
                                    </div>

                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="text-[#1a0dab] text-xl font-medium truncate">
                                            {seoData.title || "Page Title"}
                                        </div>
                                        <div className="text-green-700 text-sm mt-1">
                                            {process.env.NEXT_PUBLIC_APP_URL}/{page}
                                        </div>
                                        <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            {seoData.description || "Your meta description will appear here. Make it compelling to increase click-through rates."}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-[#0047AB] text-white px-6 py-3 rounded-lg hover:bg-[#0047AB]/80 transition-all"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

