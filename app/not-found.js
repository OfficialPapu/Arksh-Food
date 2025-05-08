import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8">
          <Image
            src="/Arksh Food.png"
            alt="ARKSH Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-[#0055a4] mb-4">404</h1>

        <div className="relative mb-8">
          <div className="h-1 w-24 md:w-48 bg-[#0055a4] mx-auto"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <svg className="w-8 h-8 text-[#29abe2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-[#0055a4] mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0055a4] hover:bg-[#004080] transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Homepage
        </Link>

        <div className="mt-12 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ARKSH. All rights reserved.</p>
          <p className="text-[#29abe2]">www.food.arkshgroup.com</p>
        </div>
      </div>
    </div>
  )
}
