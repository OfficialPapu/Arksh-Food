import Image from "next/image"
import { Star, Quote } from "lucide-react"

const UserTestimonials = [
  {
    ID: 1,
    Name: "Aarav Sharma",
    Location: "Kathmandu",
    Avatar: "/Media/Images/Logo/placeholder.svg?height=100&width=100",
    Rating: 5,
    Text: "The spices from Arksh Food are absolutely authentic. They bring back memories of my grandmother's cooking. Highly recommended!",
  },
  {
    ID: 2,
    Name: "Priya Thapa",
    Location: "Pokhara",
    Avatar: "/Media/Images/Logo/placeholder.svg?height=100&width=100",
    Rating: 5,
    Text: "I've been ordering their pickles for months now. The quality is consistent and the taste is exactly like homemade. Love it!",
  },
  {
    ID: 3,
    Name: "Rajesh Gurung",
    Location: "Butwal",
    Avatar: "/Media/Images/Logo/placeholder.svg?height=100&width=100",
    Rating: 4,
    Text: "Fast delivery and excellent packaging. The Himalayan tea collection is my favorite. Will definitely order again.",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#0055a4]/5 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {UserTestimonials.map((Testimonial) => (
            <div key={Testimonial.ID} className="relative rounded-xl bg-white p-6 shadow-md">
              <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#39c4ff] text-white">
                <Quote className="h-5 w-5" />
              </div>

              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Testimonial.Rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill={i < Testimonial.Rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="mb-6 text-gray-600">"{Testimonial.Text}"</p>

              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={Testimonial.Avatar || "/Media/Images/Logo/placeholder.svg"}
                    alt={Testimonial.Name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{Testimonial.Name}</h4>
                  <p className="text-sm text-gray-500">{Testimonial.Location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

