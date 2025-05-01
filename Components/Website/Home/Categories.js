"use client"
import axios from "@/lib/axios";
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function Categories() {
  const [ProductCategories, setProductCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setProductCategories(response.data);
      } catch (error) { }
    };
    fetchCategories();
  }, []);

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
          {ProductCategories.slice(0, 4).map((Category) => (
            <div
              key={Category._id}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    Category.Image || "/Arksh Food.png"
                  }
                  alt={`${Category.Category || "Category"} image`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6 flex sm:items-end items-start justify-center sm:flex-row flex-col">
                <div>
                  <h3 className="mb-0.5 md:mb-1 text-base sm:text-lg md:text-xl font-bold text-white">{Category.Category}</h3>
                  <p className="mb-1 md:mb-2 text-xs md:text-sm text-white/90 line-clamp-3">{Category.Description}</p>
                  <span className="mb-2 md:mb-3 inline-block text-xs font-medium text-white/80">{"10 Products"}</span>
                </div>

                <div className="sm:w-full sm:text-end">
                  <a
                    href={`/category/${Category.Slug}`}
                    className="group/btn inline-flex items-center text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
                  >
                    Shop
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

