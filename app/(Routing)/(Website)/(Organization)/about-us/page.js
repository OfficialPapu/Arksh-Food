"use client"

import Image from "next/image"
import { Star, Award, Users, Factory, Leaf, Shield } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f9fc] relative overflow-hidden">
      {/* Background Elements - More subtle */}
      <div className="absolute top-20 left-10 text-[#39b7e8]/5">
        <Star size={120} fill="#39b7e8" strokeWidth={0} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header with Logo - More prominent */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-[150px] h-[150px] mb-6">
            <div className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Image 
                src="/Arksh Food.png" 
                alt="Arksh Food Logo" 
                width={120} 
                height={120} 
                className="relative z-10"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-[#0055a4] text-center mb-4">About Arksh Food</h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl">
            Crafting delicious moments with premium quality food products since 2010
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Our Story Section - More visual */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src="https://www.arkshgroup.com/rajul-shrestha-ceo-arksh-group-1.jpg" // Replace with actual factory image
                    alt="Arksh Food Factory"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0055a4] to-[#39b7e8] flex items-center justify-center text-white mr-4">
                    <Factory size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0055a4]">Our Story</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Established in 2010, Arksh Food began as a small family-run bakery with a passion for creating 
                    authentic, high-quality food products. Today, we've grown into one of Nepal's most trusted food 
                    brands, known for our biscuits, puffs, chocolates, and confectionery items.
                  </p>
                  <p className="leading-relaxed">
                    Our founder's vision was simple: to bring joy to people's lives through delicious food made with 
                    care and integrity. This philosophy remains at the heart of everything we do, from sourcing 
                    ingredients to crafting our products.
                  </p>
                  <p className="leading-relaxed">
                    With state-of-the-art manufacturing facilities and a dedicated team, we combine traditional 
                    recipes with modern food technology to deliver products that meet international quality standards.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section - New addition */}
          <section className="mb-20 bg-gradient-to-r from-[#f0f7ff] to-[#e6f2ff] rounded-2xl p-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-4">
                    <Star size={24} fill="white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0055a4]">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed pl-16">
                  To create high-quality, delicious food products that delight consumers while maintaining the highest 
                  standards of food safety and nutritional value. We are committed to innovation, sustainability, and 
                  making a positive impact in our communities.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-4">
                    <Leaf size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0055a4]">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed pl-16">
                  To be Nepal's most loved food brand, recognized for quality and innovation, while expanding our 
                  reach to bring authentic Nepali flavors to the global market. We aspire to set benchmarks in food 
                  manufacturing excellence.
                </p>
              </div>
            </div>
          </section>

          {/* Our Values Section - Enhanced */}
          <section className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-[#0055a4] mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every product we create
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#0055a4]">
                <div className="w-16 h-16 rounded-full bg-[#0055a4]/10 flex items-center justify-center text-[#0055a4] mb-4 mx-auto">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0055a4] text-center mb-3">Quality Excellence</h3>
                <p className="text-gray-600 text-center">
                  We maintain rigorous quality standards at every stage, from sourcing to production, ensuring only the best reaches our consumers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#39b7e8]">
                <div className="w-16 h-16 rounded-full bg-[#39b7e8]/10 flex items-center justify-center text-[#39b7e8] mb-4 mx-auto">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0055a4] text-center mb-3">Consumer Trust</h3>
                <p className="text-gray-600 text-center">
                  We build lasting relationships through transparency, consistent quality, and products that deliver on their promise.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#0055a4]">
                <div className="w-16 h-16 rounded-full bg-[#0055a4]/10 flex items-center justify-center text-[#0055a4] mb-4 mx-auto">
                  <Leaf size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0055a4] text-center mb-3">Sustainable Growth</h3>
                <p className="text-gray-600 text-center">
                  We're committed to environmentally responsible practices that ensure long-term sustainability for our business and community.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#39b7e8]">
                <div className="w-16 h-16 rounded-full bg-[#39b7e8]/10 flex items-center justify-center text-[#39b7e8] mb-4 mx-auto">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0055a4] text-center mb-3">Team Spirit</h3>
                <p className="text-gray-600 text-center">
                  Our people are our greatest asset. We foster collaboration, respect, and continuous learning.
                </p>
              </div>
            </div>
          </section>

          {/* Manufacturing Excellence Section - New */}
          <section className="mb-20 bg-[#0055a4] rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 text-white">
                <h2 className="text-3xl font-bold !mb-6">Manufacturing Excellence</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Quality Assurance</h3>
                      <p className="text-white/90">
                        Our state-of-the-art facility follows strict quality control measures and international food safety standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Factory size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Modern Facilities</h3>
                      <p className="text-white/90">
                        Equipped with advanced machinery to ensure consistent quality and efficient production.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Leaf size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Sustainable Practices</h3>
                      <p className="text-white/90">
                        We implement eco-friendly processes to minimize our environmental impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-full w-full aspect-[4/3]">
                  <Image
                    src="/Manuf.webp" // Replace with actual image
                    alt="Arksh Food Manufacturing Facility"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section - Enhanced */}
          <section className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-[#0055a4] mb-4">Meet Our Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate team behind Arksh Food's success
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src="https://www.arkshgroup.com/rajul-shrestha-ceo-arksh-group-1.jpg" // Replace with actual images
                    alt="Rajul Shrestha"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0055a4] text-xl mb-1">Rajul Shrestha</h3>
                  <p className="text-[#39b7e8] font-medium mb-3">Founder & CEO</p>
                  <p className="text-gray-600 text-sm">
                    With over 20 years in the food industry, Rajesh's vision drives Arksh Food's innovation and growth.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src="/Arksh Food.png"
                    alt="Priya Patel"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0055a4] text-xl mb-1">Priya Patel</h3>
                  <p className="text-[#39b7e8] font-medium mb-3">Head of Product Development</p>
                  <p className="text-gray-600 text-sm">
                    Food scientist with a passion for creating delicious products that meet nutritional guidelines.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src="/Arksh Food.png"
                    alt="Anish Gupta"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0055a4] text-xl mb-1">Anish Gupta</h3>
                  <p className="text-[#39b7e8] font-medium mb-3">Quality Assurance Manager</p>
                  <p className="text-gray-600 text-sm">
                    Ensures all products meet our stringent quality and safety standards before reaching consumers.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src="/Arksh Food.png"
                    alt="Sanjay Kapoor"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0055a4] text-xl mb-1">Sanjay Kapoor</h3>
                  <p className="text-[#39b7e8] font-medium mb-3">Operations Director</p>
                  <p className="text-gray-600 text-sm">
                    Oversees our manufacturing processes to ensure efficiency and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA Section */}
          <section className="bg-gradient-to-r from-[#0055a4] to-[#39b7e8] rounded-2xl p-10 text-white mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-3">Ready to experience Arksh Food quality?</h2>
                <p className="text-white/90 max-w-lg">
                  Whether you're a retailer, distributor, or consumer, we'd love to hear from you.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}