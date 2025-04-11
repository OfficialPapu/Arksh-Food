import Image from "next/image"
import { ChevronRight, Utensils, Clock, Award } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#0055a4]/5"></div>
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#39c4ff]/5"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-12 md:pb-20">
        <div className="flex flex-col gap-8 sm:gap-16 lg:flex-row lg:items-center md:mt-0 mt-6">
          <div className="flex-1 space-y-6 md:space-y-8">
            <h1 className="text-3xl font-bold leading-tight text-[#0055a4] sm:text-4xl md:text-5xl lg:text-6xl">
              Taste the{" "}
              <span className="relative">
                Tradition
                <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-[#39c4ff]/30 md:-bottom-2 md:h-2"></span>
              </span>
            </h1>

            <p className="max-w-xl text-base text-gray-600 md:text-lg">
              Experience authentic Nepali flavors with Arksh Food's premium selection of traditional and modern culinary
              delights.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <a
                href="#products"
                className="group flex items-center gap-2 rounded-full bg-[#0055a4] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0055a4]/90 md:px-8 md:py-3 md:text-base"
              >
                Browse Products
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#bestsellers"
                className="flex items-center gap-2 rounded-full border-2 border-[#0055a4] px-6 py-2.5 text-sm font-medium text-[#0055a4] transition-all hover:bg-[#0055a4]/5 md:px-8 md:py-3 md:text-base"
              >
                Best Sellers
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3 md:gap-6 md:pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0055a4]/10 md:h-12 md:w-12">
                  <Utensils className="h-4 w-4 text-[#0055a4] md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Premium Quality</p>
                  <p className="text-xs text-gray-500 md:text-sm">Authentic Ingredients</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39c4ff]/10 md:h-12 md:w-12">
                  <Clock className="h-4 w-4 text-[#39c4ff] md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-500 md:text-sm">Across Nepal</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0055a4]/10 md:h-12 md:w-12">
                  <Award className="h-4 w-4 text-[#0055a4] md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Top Rated</p>
                  <p className="text-xs text-gray-500 md:text-sm">On Daraz</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative mx-auto h-[300px] w-full max-w-sm md:h-[400px] md:max-w-lg">
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-8 border-white shadow-xl md:h-64 md:w-64">
                <Image
                  src="https://www.arkshgroup.com/wp-content/uploads/2025/01/tafeli-choclate-copy-1-2048x768.jpg"
                  alt="Featured Product"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -right-4 top-12 h-24 w-24 overflow-hidden rounded-lg border-4 border-white shadow-lg md:h-32 md:w-32">
                <Image
                  src="https://img.drz.lazcdn.com/static/np/p/1ba614067522325e6d98b4ec7785edf1.jpg_400x400q75.jpg_.webp"
                  alt="Product 1"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -left-4 bottom-12 h-24 w-24 overflow-hidden rounded-lg border-4 border-white shadow-lg md:h-32 md:w-32">
                <Image
                  src="https://img.drz.lazcdn.com/static/np/p/1aa0db60e57f6b1bbafad693a25602c6.png_400x400q75.png_.webp"
                  alt="Product 2"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -right-4 bottom-0 rotate-12 rounded-lg bg-[#0055a4] px-3 py-1.5 text-white shadow-lg md:px-4 md:py-2">
                <p className="text-xs font-bold md:text-sm">NEW</p>
                <p className="text-[10px] md:text-xs">Collection</p>
              </div>

              <div className="absolute -left-4 top-0 -rotate-12 md:-left-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#39c4ff] text-white shadow-lg md:h-16 md:w-16">
                  <span className="text-base font-bold md:text-lg">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

