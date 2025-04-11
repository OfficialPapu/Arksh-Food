import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export function ProductCard({ Product }) {
  return (
    <div className="group h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md flex flex-col">
      <Link href={`/product/${Product.Slug}`}>
        <div className="relative">
          <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5 sm:left-3 sm:top-3">
            {Product.isNew && (
              <span className="inline-block rounded-full bg-[#39c4ff] px-2 py-0.5 text-[10px] font-bold uppercase text-white sm:px-2.5 sm:py-1">
                New
              </span>
            )}
            {Product.isBestSeller && (
              <span className="inline-block rounded-full bg-[#0055a4] px-2 py-0.5 text-[10px] font-bold uppercase text-white sm:px-2.5 sm:py-1">
                Best Seller
              </span>
            )}
          </div>

          {Product.DiscountedPrice && (
            <div className="absolute right-0 top-2 z-10 bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white sm:top-3 sm:px-2.5 sm:py-1">
              {Math.round((1 - Product.DiscountedPrice / Product.Price) * 100)}%
              OFF
            </div>
          )}

          <div className="aspect-square md:aspect-auto md:h-[300px] w-full overflow-hidden">
            <Image
              src={Product.ImageUrl || "/placeholder.svg"}
              alt={Product.Name}
              width={500}
              height={500}
              className="h-full w-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
              priority={Product.isBestSeller || Product.isNew}
            />
          </div>
        </div>

        <div className="p-3 flex-grow flex flex-col sm:p-4">
          <h3 className="mb-1 text-sm font-medium text-gray-900 sm:mb-2 sm:text-base hover:text-[#0055a4] line-clamp-2">
            {Product.Name}
          </h3>

          <div className="mt-auto">
            {Product.DiscountedPrice ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-[#0055a4] text-sm sm:text-base">
                  NPR {Product.DiscountedPrice.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  NPR {Product.Price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-[#0055a4] text-sm sm:text-base">
                NPR {Product.Price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-100 p-3 mt-auto sm:p-4">
        <Button className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-3 py-2.5 text-xs font-medium text-gray-800 hover:text-white transition-colors hover:bg-[#004a8f] active:bg-[#003d76] sm:text-sm cursor-pointer">
          <ShoppingBag className="mt-[1px] h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
