import { Star, ArrowRight } from "lucide-react";
import { ProductCard } from "@/Components/ui/ProductCard";
import Image from "next/image";

const Products = [
  {
    ID: 1,
    Name: "Nepali Masala Mix",
    Price: 350,
    DiscountedPrice: 297,
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/d3855852984beb492053962461a4e00f.png_400x400q75.png_.webp",
    Slug:"loream-ipsum-nice-hello-hi",
    isNew: false,
    isBestSeller: true,
  },
  {
    ID: 2,
    Name: "Traditional Pickle",
    Price: 280,
    DiscountedPrice: null,
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/da0079aa351e900dd15a765a37425d42.jpg_400x400q75.jpg_.webp",
    Slug:"loream-ipsum-nice-hello-hi",
    isNew: false,
    isBestSeller: false,
  },
  {
    ID: 3,
    Name: "Himalayan Tea",
    Price: 420,
    DiscountedPrice: 378,
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/e983ad3dd92378e03e4a5cbd4585b93d.png_400x400q75.png_.webp",
    Slug:"loream-ipsum-nice-hello-hi",
    isNew: true,
    isBestSeller: false,
  },
  {
    ID: 4,
    Name: "Organic Honey",
    Price: 550,
    DiscountedPrice: null,
    ImageUrl: "https://img.drz.lazcdn.com/static/np/p/49df54f7124c966bbcd4c3ae5232e498.png_400x400q75.png_.webp",
    Slug:"loream-ipsum-nice-hello-hi",
    isNew: false,
    isBestSeller: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 inline-flex items-center rounded-full bg-[#0055a4]/10 px-3 py-1">
                <Star
                  className="mr-1 h-3.5 w-3.5 text-[#0055a4]"
                  fill="currentColor"
                />
                <span className="text-xs font-medium text-[#0055a4]">
                  Top Rated Products
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-sm text-gray-600 md:text-base">
                Discover our authentic Nepali flavors
              </p>
            </div>
            <a
              href="#all-products"
              className="flex items-center rounded-full border border-[#0055a4] px-5 py-2.5 text-sm font-medium text-[#0055a4] transition-colors hover:bg-[#0055a4] hover:text-white"
            >
              View all products
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative w-full overflow-hidden mb-4 md:mb-12 lg:h-[300px]">
            <img
              src="https://static-01.daraz.com.np/other/shop/60cc575e6d94df3fa253e408be48292c.png"
              className="h-full w-full rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Products.map((Product) => (
              <ProductCard key={Product.ID} Product={Product} />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="relative w-full overflow-hidden mb-4 md:mb-12 lg:h-[300px]">
            <img
              src="https://static-01.daraz.com.np/other/shop/650a77e804af985b463805a32bfc08f2.png"
              className="h-full w-full rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Products.map((Product) => (
              <ProductCard key={Product.ID} Product={Product} />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="relative w-full overflow-hidden mb-4 md:mb-12 lg:h-[300px]">
            <img
              src="https://static-01.daraz.com.np/other/shop/c5bcdfeea8cbee38144b1f02a89cb7c2.png"
              className="h-full w-full rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Products.map((Product) => (
              <ProductCard key={Product.ID} Product={Product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
