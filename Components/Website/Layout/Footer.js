import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Youtube, url: "#" }
  ]

  const quickLinks = [
    { name: "Home", url: "#" },
    { name: "About Us", url: "#" },
    { name: "Products", url: "#" },
    { name: "Recipes", url: "#" },
    { name: "Contact Us", url: "#" }
  ]

  const categoryLinks = [
    { name: "Spices & Masalas", url: "#" },
    { name: "Teas & Beverages", url: "#" },
    { name: "Pickles & Chutneys", url: "#" },
    { name: "Snacks & Sweets", url: "#" },
    { name: "Gift Boxes", url: "#" }
  ]

  const contactInfo = [
    { icon: MapPin, text: "123 Durbar Marg, Kathmandu, Nepal" },
    { icon: Phone, text: "+977 1234567890" },
    { icon: Mail, text: "info@arkshfood.com" }
  ]

  const policyLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Shipping Policy", url: "#" }
  ]

  return (
    <footer className="bg-gray-50 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6">
              <Image
                src="/Arksh Food.png"
                alt="Arksh Food"
                width={100}
                height={100}
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="mb-6 text-gray-600">
              Arksh Food brings authentic Nepali flavors to your kitchen with our premium selection of traditional food
              products.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0055a4] text-white transition-opacity hover:opacity-90"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-gray-600 transition-colors hover:text-[#0055a4]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-3">
              {categoryLinks.map((category, index) => (
                <li key={index}>
                  <a href={category.url} className="text-gray-600 transition-colors hover:text-[#0055a4]">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start">
                  <contact.icon className="mr-3 h-5 w-5 text-[#0055a4]" />
                  <span className="text-gray-600">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Arksh Food. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-gray-600">
              {policyLinks.map((policy, index) => (
                <a key={index} href={policy.url} className="hover:text-[#0055a4]">
                  {policy.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}