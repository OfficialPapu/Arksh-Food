"use client"

import { useState, useRef, useEffect } from "react"
import { Linkedin, Link, X, MessageCircle, Share2 } from "lucide-react"


export default function ShareButton({ url = window.location.href, title = "Check this out!" }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    // Brand colors extracted from the ARKSH logo
    const brandPrimary = "#0057A8" // Dark blue
    const brandSecondary = "#29ABE2" // Light blue

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        setIsOpen(false)
    }

    const shareToTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            "_blank",
        )
        setIsOpen(false)
    }

    const shareToWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank")
        setIsOpen(false)
    }

    const copyLink = () => {
        navigator.clipboard.writeText(url)
        setIsOpen(false)
        toast.success('Link copied to clipboard!');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="h-10 w-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-300"
            >
                <Share2 className="h-5 w-5 text-gray-400" />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white z-10"
                    style={{ borderColor: brandPrimary }}
                >
                    <div className="py-1 px-2">
                        <div className="text-gray-600 px-3 py-2 text-sm font-medium border-b border-gray-100">Share to</div>

                        <button
                            onClick={shareToLinkedIn}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                        >
                            <Linkedin size={20} style={{ color: brandPrimary }} />
                            <span>LinkedIn</span>
                        </button>

                        <button
                            onClick={shareToWhatsApp}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                        >
                            <MessageCircle size={20} style={{ color: brandPrimary }} />
                            <span>WhatsApp</span>
                        </button>

                        <button
                            onClick={shareToTwitter}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                        >
                            <X size={20} style={{ color: brandPrimary }} />
                            <span>Twitter</span>
                        </button>

                        <button
                            onClick={copyLink}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                        >
                            <Link size={20} style={{ color: brandSecondary }} />
                            <span>Copy Link</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
