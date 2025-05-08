import Link from "next/link"
import { Button } from "@/Components/ui/button"

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0057b7]">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Category Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find the category you're looking for.</p>
        <Link href="/">
          <Button className="bg-[#0057b7] hover:bg-[#004494]">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
