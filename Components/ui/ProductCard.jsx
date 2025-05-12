import Image from "next/image";
import { CheckCircle, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import useCartActions from "../Hooks/Cart";
export function ProductCard({ Product }) {
  const isOutOfStock = Product.Quantity <= 0;
  let PriceAfterDiscount =
    Product.Price - (Product.Price / 100) * Product.Discount.Percentage <
    Product.Price
      ? Math.round(
          Product.Price - (Product.Price / 100) * Product.Discount.Percentage
        )
      : null;
  const { HandleAddToCart, IsProductInCart, loading, setLoading } =
    useCartActions();
  const isInCart = IsProductInCart(Product._id);
  return (
    <div className="group h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md flex flex-col">
      <Link href={`/product/${Product.Slug}`} className="relative">
        <div className="relative">
          <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5 sm:left-3 sm:top-3">
            {Product.isNewArrival && (
              <span className="text-center inline-block rounded-full bg-[#39c4ff] px-2 py-0.5 text-[10px] font-bold uppercase text-white sm:px-2.5 sm:py-1">
                New
              </span>
            )}
            {Product.isBestSeller && (
              <span className="inline-block rounded-full bg-[#0055a4] px-2 py-0.5 text-[10px] font-bold uppercase text-white sm:px-2.5 sm:py-1">
                Best Seller
              </span>
            )}
          </div>

          {PriceAfterDiscount && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-md z-10">
              {Product.Discount.Percentage}% OFF
            </div>
          )}

          <div className="aspect-square md:aspect-auto md:h-[300px] w-full overflow-hidden">
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                  `${Product.Media.Images[0]}` || "/Media/Images/Logo/placeholder.svg"
              }
              alt={Product.Name}
              width={500}
              height={500}
              className="h-full w-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
              priority={Product.isBestSeller || Product.isNew}
            />
          </div>
        </div>

        <div className="p-3 flex-grow flex flex-col sm:p-4">
          <h3 className="mb-1 !text-sm font-medium text-gray-900 sm:mb-2 !sm:text-base hover:text-[#0055a4] line-clamp-2">
            {Product.Name}
          </h3>

          <div className="mt-auto">
            {PriceAfterDiscount ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-[#0055a4] text-sm sm:text-base">
                  Rs. {PriceAfterDiscount.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  Rs. {Product.Price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-[#0055a4] text-sm sm:text-base">
                Rs. {Product.Price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center z-1 top-1/2 -translate-y-1/2">
            <div className="relative sm:px-8 px-4 sm:py-2 py-1 bg-white border border-gray-100 shadow-lg rounded-lg group hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center gap-4">
                <p className="text-[#0055a4] font-bold">Out of Stock</p>
              </div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0055a4] transform -translate-x-1/2 group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
        )}
      </Link>
      <div className="border-t border-gray-100 p-3 mt-auto sm:p-4">
        <Button
          className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-3 py-2.5 text-xs font-medium text-gray-800 hover:text-white transition-colors hover:bg-[#004a8f] active:bg-[#003d76] sm:text-sm cursor-pointer"
          onClick={async () => {
            Product.Quantity = 1;
            await HandleAddToCart(Product);
          }}
          disabled={isOutOfStock}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Adding to Bag</span>
            </>
          ) : isInCart ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>In Your Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              <span>Add to cart</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
