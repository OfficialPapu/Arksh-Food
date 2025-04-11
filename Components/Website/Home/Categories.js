import { ArrowRight } from "lucide-react"
import Image from "next/image"

const ProductCategories = [
  {
    ID: 1,
    Name: "Biscuit",
    Description: "Traditional Nepali spice blends",
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/45b57e3285c849015cf9f270205e06f8.png_400x400q75.png_.webp",
    Slug: "biscuit-products",
    Count: "24 Products",
  },
  {
    ID: 2,
    Name: "Coffee",
    Description: "Authentic homemade flavors",
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/a3b36248209b5e0ae53b159db3017902.png_400x400q75.png_.webp",
    Slug: "biscuit-products",
    Count: "18 Products",
  },
  {
    ID: 3,
    Name: "Chocolate",
    Description: "Himalayan organic teas",
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/f21c964428adcd0b93aecf66729c9a88.png_400x400q75.png_.webp",
    Slug: "biscuit-products",
    Count: "12 Products",
  },
  {
    ID: 4,
    Name: "Skin care",
    Description: "Natural Himalayan beauty products",
    ImageUrl: "https://www.dreamskinnepal.com/Assets/Product/Media/Images/Slider%20Images/early%20bird%20discount%20new.jpg",
    Slug: "biscuit-products",
    Count: "15 Products",
  },
]

export default function Categories() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">Shop by Category</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-sm md:text-base">
            Explore our wide range of authentic Nepali food products organized by categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
          {ProductCategories.map((Category) => (
            <div
              key={Category.ID}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  src={Category.ImageUrl || "/placeholder.svg"}
                  alt={Category.Name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6 flex sm:items-end items-start justify-center sm:flex-row flex-col">
                <div>
                  <h3 className="mb-0.5 md:mb-1 text-base sm:text-lg md:text-xl font-bold text-white">{Category.Name}</h3>
                  <p className="mb-1 md:mb-2 text-xs md:text-sm text-white/90 line-clamp-2">{Category.Description}</p>
                  <span className="mb-2 md:mb-3 inline-block text-xs font-medium text-white/80">{Category.Count}</span>
                </div>

                <div className="sm:w-full sm:text-end">
                  <a
                    href={`/category/${Category.Slug}`}
                    className="group/btn inline-flex items-center text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
                  >
                    Shop Now
                    <ArrowRight className="mt-1 ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

