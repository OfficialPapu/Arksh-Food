"use client"

import Image from "next/image"
import { Star } from 'lucide-react'
import Link from "next/link"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f7ff] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 text-[#39b7e8]/10">
        <Star size={120} fill="#39b7e8" strokeWidth={0} />
      </div>
      <div className="absolute bottom-20 right-10 text-[#0055a4]/10">
        <Star size={180} fill="#0055a4" strokeWidth={0} />
      </div>
      <div className="absolute top-1/3 right-1/4 text-[#39b7e8]/5">
        <Star size={100} fill="#39b7e8" strokeWidth={0} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-[120px] h-[120px] mb-4">
            <div className="absolute inset-0 bg-white rounded-full shadow-md"></div>
            <Image src="/Arksh Food.png" alt="Arksh Food Logo" width={120} height={120} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-bold text-[#0055a4] text-center">Terms and Conditions</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#0055a4]/5 rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#39b7e8]/5 rounded-tl-3xl"></div>

            <div className="space-y-8 text-gray-700 relative z-10">
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Acceptance of Terms</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed">
                    Welcome to Arksh Food. By accessing and using our website, purchasing our products, or engaging with our services, 
                    you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                    please do not use our services or purchase our products.
                  </p>
                  <p className="leading-relaxed mt-3">
                    These Terms and Conditions apply to all visitors, users, and customers of Arksh Food's products and services.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Products and Services</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed mb-3">Arksh Food offers a variety of food products including but not limited to:</p>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Biscuits:</span> Various flavors and types of biscuits made with quality ingredients.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Puffs:</span> Savory and sweet puff pastries with different fillings.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Chocolates:</span> Premium chocolate products in various forms and flavors.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Confectionery:</span> Other sweet treats and confectionery items.
                      </div>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    We strive to ensure all product information is accurate, but variations in ingredients, nutritional content, 
                    and allergen information may occur. Please refer to the product packaging for the most up-to-date information.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Ordering and Payment</h2>
                </div>
                <div className="pl-11">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>
                        Orders can be placed through our website, authorized retailers, or by contacting our customer service
                      </div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>We accept various payment methods including credit/debit cards and digital payment services</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>All prices are listed in the local currency and may be subject to change without notice</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>Payment is processed securely through our trusted payment processors</div>
                    </div>
                  </div>
                  <p className="leading-relaxed mt-4">
                    By placing an order, you confirm that all payment information provided is valid and that you are authorized 
                    to use the payment method.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Shipping and Delivery</h2>
                </div>
                <div className="pl-11">
                  <div className="p-5 border-l-4 border-[#39b7e8] bg-[#f0f7ff]">
                    <p className="leading-relaxed">
                      Arksh Food ships products to locations within our service area. Delivery times may vary depending on your location 
                      and the availability of products. We strive to deliver all orders in a timely manner, but we do not guarantee 
                      specific delivery dates or times.
                    </p>
                    <p className="leading-relaxed mt-3">
                      Shipping costs are calculated based on the delivery location and order size. These costs will be displayed 
                      during the checkout process before payment is completed.
                    </p>
                    <p className="leading-relaxed mt-3">
                      Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Returns and Refunds</h2>
                </div>
                <div className="pl-11">
                  <div className="space-y-3">
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Quality Issues</h3>
                        <p>
                          If you receive products that are damaged, defective, or not as described, please contact us within 
                          48 hours of delivery with photos and details of the issue.
                        </p>
                      </div>
                    </div>
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Refund Process</h3>
                        <p>
                          Approved refunds will be processed using the original payment method. Processing times may vary 
                          depending on your payment provider.
                        </p>
                      </div>
                    </div>
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Non-Returnable Items</h3>
                        <p>
                          Due to the nature of food products, we cannot accept returns of items that have been opened, 
                          partially consumed, or where the packaging has been damaged after delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Intellectual Property</h2>
                </div>
                <div className="pl-11">
                  <div className="bg-gradient-to-r from-[#0055a4]/5 to-[#39b7e8]/5 p-5 rounded-lg">
                    <p className="leading-relaxed">
                      All content on our website, including text, graphics, logos, images, product designs, and software, 
                      is the property of Arksh Food and is protected by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="leading-relaxed mt-3">
                      You may not use, reproduce, distribute, modify, or create derivative works from any content without 
                      our express written permission.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">7</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Limitation of Liability</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed">
                    Arksh Food and its affiliates shall not be liable for any indirect, incidental, special, consequential, 
                    or punitive damages resulting from your use of or inability to use our products or services.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Our liability is limited to the amount paid for the product or service that is the subject of the claim.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Some jurisdictions do not allow the exclusion or limitation of certain warranties or consequential damages, 
                    so the above limitations may not apply to you.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">8</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Allergen Information</h2>
                </div>
                <div className="pl-11">
                  <div className="bg-[#f0f7ff] p-5 rounded-lg border-l-4 border-[#0055a4]">
                    <p className="leading-relaxed">
                      While we make every effort to accurately list ingredients and allergen information for our products, 
                      we cannot guarantee that our products are free from allergens. Our products may contain or come into 
                      contact with common allergens such as nuts, dairy, eggs, wheat, and soy.
                    </p>
                    <p className="leading-relaxed mt-3">
                      If you have food allergies or specific dietary requirements, please carefully read the product packaging 
                      or contact us before consuming our products.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">9</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Governing Law</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of Nepal, 
                    without regard to its conflict of law provisions.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction 
                    of the courts located in Nepal.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">10</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Changes to Terms</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately 
                    upon posting on our website. Your continued use of our services after any changes indicates your acceptance 
                    of the new Terms.
                  </p>
                  <p className="leading-relaxed mt-3">
                    We recommend reviewing these Terms periodically to stay informed of any updates.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">11</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Contact Us</h2>
                </div>
                <div className="pl-11">
                  <p className="leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="bg-gradient-to-r from-[#0055a4] to-[#39b7e8] p-6 rounded-lg text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Arksh Food</h3>
                        <p>Email: info@arkshgroup.com</p>
                        <p>Phone: +977-9704591211</p>
                        <p>Address: Arksh Food Lazimpat</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Image
                          src="/Arksh Food.png"
                          alt="Arksh Food Logo"
                          width={80}
                          height={80}
                          className="bg-white p-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/"
            className="px-8 py-3 bg-[#0055a4] text-white rounded-full hover:bg-[#004a8f] transition-colors flex items-center shadow-lg"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
