"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Award,
  ChevronRight,
  Factory,
  Leaf,
  Shield,
  Users,
  Clock,
  Globe,
  Heart,
  ArrowRight
} from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Redesigned with gradient background */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f7ff] to-[#e0f0ff]"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#0055a4]/5"></div>
          <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-[#39b7e8]/10"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#0055a4]/5"></div>
        </div>

        <div className="max-w-7xl container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-0 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:min-h-[80vh]">
            <div className="w-full md:w-1/2 pt-6 md:pt-0 order-2 md:order-1">
              <div className="max-w-xl mx-auto md:mx-0">
                <div className="mb-4 sm:mb-6 inline-block">
                  <Image
                    src="/Media/Images/Logo/Arksh Food.png"
                    alt="Arksh Food Logo"
                    width={100}
                    height={100}
                    className="h-12 sm:h-16 md:h-20 w-auto"
                    priority
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                  Crafting <span className="text-[#0055a4]">Authentic</span> <span className="text-[#39b7e8]">Flavors</span> Since 2010
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-lg">
                  We bring the rich culinary heritage of Nepal to your table through innovation, quality, and passion.
                </p>
                <Link href="#our-story" className="group inline-flex items-center bg-[#0055a4] text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold hover:bg-[#39b7e8] transition-all duration-300 shadow-lg text-sm sm:text-base">
                  Our Journey
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 mb-6 sm:mb-8 md:mb-0">
              <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-none">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Media/Images/Logo/About Us Img 3.webp"
                    alt="Arksh Food Manufacturing"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-20">
                  <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-xl">
                    <p className="text-[#0055a4] font-semibold text-sm sm:text-base md:text-lg">
                      "Bringing the authentic taste of Nepal to the world with pride and passion."
                    </p>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">— Dr. Rajesh Kazi Shrestha, Founder</p>
                  </div>
                </div>

                {/* Decorative element - smaller for mobile */}
                <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-[#39b7e8]/20 rounded-full z-0"></div>
                <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-[#0055a4]/20 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Improved mobile responsiveness */}
      <section id="our-story" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-[#f8fbff] to-white"></div>

        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#0055a4]/5"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-[#39b7e8]/10"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center md:items-start gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="w-full text-center md:text-left">
                <span className="inline-block px-3 sm:px-4 py-0.5 sm:py-1 bg-[#0055a4]/10 text-[#0055a4] font-medium rounded-full mb-3 sm:mb-4 md:mb-6 leading-tight">OUR STORY</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">A Legacy of <span className="text-[#0055a4]">Excellence</span></h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto md:mx-0 mb-6 sm:mb-8 md:mb-10">
                  From our humble beginnings to becoming Nepal's leading food manufacturer, our journey has been defined by passion, innovation, and a commitment to quality.
                </p>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#0055a4] group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#0055a4]/10 flex items-center justify-center text-[#0055a4] mb-3 sm:mb-4 md:mb-6 transition-all duration-300 group-hover:bg-[#0055a4] group-hover:text-white">
                    <Clock size={24} className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">The Beginning</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Founded in 1978 by Dr. Rajesh Kazi Shrestha, Rajesh Concern started with a focus on trade and hospitality, laying the foundation for what would become the Arksh Group.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#39b7e8] group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#39b7e8]/10 flex items-center justify-center text-[#39b7e8] mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-[#39b7e8] group-hover:text-white">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Global Expansion</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Through the 1980s and 2000s, we strengthened Nepal's trade relations globally, becoming one of the country's most accomplished importers.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#39b7e8] group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#39b7e8]/10 flex items-center justify-center text-[#39b7e8] mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-[#39b7e8] group-hover:text-white">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Arksh Food Launch</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    In 2010, we established Arksh Food with a mission to create premium quality food products that bring authentic Nepali flavors to consumers worldwide.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#0055a4] group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0055a4]/10 flex items-center justify-center text-[#0055a4] mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-[#0055a4] group-hover:text-white">
                    <Factory size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Today's Success</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Today, Arksh Group has evolved into a versatile business conglomerate, with Arksh Food leading the way in food manufacturing excellence in Nepal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Vision & Mission - Made responsive */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-[#f8fbff]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0055a4]/5 rounded-l-[100px] hidden md:block"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-[#0055a4]/10 text-[#0055a4] font-medium rounded-full mb-4">OUR PURPOSE</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 !mb-6 sm:mb-8 leading-tight">Guided by Vision & Purpose</h2>

                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-l-4 border-[#0055a4]">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0055a4] text-white flex items-center justify-center mr-3">
                        <Star size={16} />
                      </span>
                      Our Mission
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      To create high-quality, delicious food products that delight consumers while maintaining the highest
                      standards of food safety and nutritional value. We are committed to innovation, sustainability, and
                      making a positive impact in our communities.
                    </p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-l-4 border-[#39b7e8]">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#39b7e8] text-white flex items-center justify-center mr-3">
                        <Leaf size={16} />
                      </span>
                      Our Vision
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      To be Nepal's most loved food brand, recognized for quality and innovation, while expanding our
                      reach to bring authentic Nepali flavors to the global market. We aspire to set benchmarks in food
                      manufacturing excellence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Media/Images/Logo/About Us Img 1.jpg"
                    alt="Arksh Food Manufacturing"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                    <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <Image
                          src="/Media/Images/Logo/Arksh Food.png"
                          alt="Arksh Food Logo"
                          width={60}
                          height={60}
                          className="h-8 sm:h-12 w-auto mr-3 sm:mr-4"
                        />
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-[#0055a4]">Arksh Food</h4>
                          <p className="text-xs sm:text-sm text-gray-600">Established 2010</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">
                        "Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 w-24 sm:w-40 h-24 sm:h-40 bg-[#0055a4] rounded-full opacity-10 z-0"></div>
                <div className="absolute -top-8 -right-8 w-16 sm:w-24 h-16 sm:h-24 bg-[#39b7e8] rounded-full opacity-20 z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Made responsive */}

      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-white via-[#f8fbff] to-white"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#0055a4]/5"></div>
          <div className="absolute top-40 left-20 w-48 h-48 rounded-full bg-[#39b7e8]/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block px-4 py-1 bg-[#0055a4]/10 text-[#0055a4] font-medium rounded-full mb-4">OUR PRINCIPLES</span>
              <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">Core <span className="text-[#39b7e8]">Values</span></h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every product we create
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: <Award size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                  title: "Quality Excellence",
                  description: "We maintain rigorous quality standards at every stage, from sourcing to production, ensuring only the best reaches our consumers.",
                  color: "#0055a4",
                  highlight: "#39b7e8"
                },
                {
                  icon: <Shield size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                  title: "Consumer Trust",
                  description: "We build lasting relationships through transparency, consistent quality, and products that deliver on their promise.",
                  color: "#39b7e8",
                  highlight: "#0055a4"
                },
                {
                  icon: <Leaf size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                  title: "Sustainable Growth",
                  description: "We're committed to environmentally responsible practices that ensure long-term sustainability for our business and community.",
                  color: "#0055a4",
                  highlight: "#39b7e8"
                },
                {
                  icon: <Users size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                  title: "Team Spirit",
                  description: "Our people are our greatest asset. We foster collaboration, respect, and continuous learning.",
                  color: "#39b7e8",
                  highlight: "#0055a4"
                }
              ].map((value, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 h-full border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-transparent group-hover:transform group-hover:-translate-y-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-opacity-100"
                      style={{ backgroundColor: `${value.color}`, color: "white" }}>
                      {value.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{value.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{value.description}</p>

                    <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ backgroundColor: value.highlight }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Manufacturing Excellence - Made responsive */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f8fbff] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8 lg:pr-16">
                <span className="inline-block px-4 py-1 bg-[#0055a4]/10 text-[#0055a4] font-medium rounded-full mb-4">OUR FACILITIES</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 !mb-6 sm:mb-8 leading-tight">Manufacturing Excellence</h2>

                <div className="space-y-6 sm:space-y-8">
                  {[
                    {
                      icon: <Shield size={20} />,
                      title: "Quality Assurance",
                      description: "Our state-of-the-art facility follows strict quality control measures and international food safety standards."
                    },
                    {
                      icon: <Factory size={20} />,
                      title: "Modern Facilities",
                      description: "Equipped with advanced machinery to ensure consistent quality and efficient production."
                    },
                    {
                      icon: <Leaf size={20} />,
                      title: "Sustainable Practices",
                      description: "We implement eco-friendly processes to minimize our environmental impact."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex group">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#0055a4] flex items-center justify-center text-white mr-4 sm:mr-6 flex-shrink-0 transition-all duration-300 group-hover:bg-[#39b7e8]">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">{item.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-10">
                  <Link href="/" className="inline-flex items-center bg-[#0055a4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#39b7e8] transition-colors shadow-lg group">
                    Explore Our Products
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 relative">
                <div className="relative z-10">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0055a4]/20 to-transparent z-10"></div>
                    <Image
                      src="/Media/Images/Logo/About Us Img 2.jpg"
                      alt="Arksh Food Manufacturing Facility"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-3 sm:p-4 rounded-xl shadow-xl z-20">
                    <Image
                      src="/Media/Images/Logo/Arksh Food.png"
                      alt="Arksh Food Logo"
                      width={80}
                      height={80}
                      className="h-12 sm:h-16 w-auto"
                    />
                  </div>
                </div>

                <div className="absolute -top-8 sm:-top-12 -left-8 sm:-left-12 w-40 sm:w-64 h-40 sm:h-64 bg-[#39b7e8]/10 rounded-full z-0"></div>
                <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-24 sm:w-40 h-24 sm:h-40 bg-[#0055a4]/10 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA - Made responsive */}


      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fbff] to-white"></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#0055a4]/5"></div>
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#39b7e8]/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#0055a4] to-[#39b7e8] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/Media/Images/Logo/Arksh Food.png')] bg-contain bg-center bg-no-repeat opacity-5"></div>

              {/* Decorative shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full bg-white/5"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full bg-white/5"></div>
              </div>

              <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">Ready to experience <span className="text-white/90 italic">Arksh Food</span> quality?</h2>
                  <p className="text-white/90 text-base sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed">
                    Whether you're a retailer, distributor, or consumer, we'd love to hear from you and explore how we can work together.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link href="/contact-us" className="inline-flex items-center justify-center bg-white text-[#0055a4] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#f0f7ff] transition-all duration-300 shadow-lg group">
                      Contact Us
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link href="/" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 group">
                      View Products
                      <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

// Star component definition
function Star({ size, fill, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}