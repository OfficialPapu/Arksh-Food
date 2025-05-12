"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
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
            <Image src="/Media/Images/Logo/Arksh Food.png" alt="Arksh Food Logo" width={120} height={120} className="relative z-10" />
          </div>
          <h1 className="text-4xl font-bold text-[#0055a4] text-center">Privacy Policy</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg sm:p-8 md:p-12 py-8 px-4 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#0055a4]/5 rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#39b7e8]/5 rounded-tl-3xl"></div>

            <div className="space-y-8 text-gray-700 relative z-10">
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Introduction</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed">
                    Welcome to Arksh Food's Privacy Policy. At Arksh Food, we respect your privacy and are committed to
                    protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you visit our website, purchase our products, or interact with us in
                    any way.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Our delicious range of biscuits, puffs, chocolates, and other confectionery products are made with
                    care, and we extend the same care to how we handle your personal information.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Information We Collect</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed mb-3">We may collect the following types of information:</p>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Personal Information:</span> Name, email address,
                        phone number, billing address, delivery address, and payment information when you place an
                        order.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Order Information:</span> Details about the
                        products you purchase, including product preferences, order history, and dietary requirements.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Technical Information:</span> IP address, browser
                        type, device information, and cookies when you visit our website.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Communication Information:</span> Records of your
                        correspondence with us, including customer service inquiries and feedback about our products.
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 text-[#39b7e8]">
                        <Star size={18} fill="#39b7e8" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#0055a4]">Marketing Preferences:</span> Your preferences
                        for receiving marketing communications from us.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">How We Use Your Information</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed mb-3">We use your information for the following purposes:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>
                        To process and fulfill your orders for our biscuits, puffs, chocolates, and other products
                      </div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To manage your account and provide customer support</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To improve our products and develop new food items based on customer preferences</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To send you order confirmations, delivery updates, and important product information</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To notify you about allergen information, product recalls, or safety concerns</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To personalize your shopping experience and recommend products you might enjoy</div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>
                        To send you marketing communications about new products, special offers, and promotions (if you
                        have opted in)
                      </div>
                    </div>
                    <div className="bg-[#f0f7ff] p-4 rounded-lg flex">
                      <div className="mr-3 text-[#0055a4] mt-1">
                        <Star size={16} fill="#0055a4" />
                      </div>
                      <div>To comply with food safety regulations and other legal obligations</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Cookies and Tracking Technologies</h2>
                </div>
                <div className="sm:pl-11">
                  <div className="p-5 border-l-4 border-[#39b7e8] bg-[#f0f7ff]">
                    <p className="leading-relaxed">
                      We use cookies and similar tracking technologies to track activity on our website and to hold
                      certain information. Cookies are files with a small amount of data which may include an anonymous
                      unique identifier. These help us understand how you interact with our website, improve your
                      shopping experience, and enable personalized product recommendations.
                    </p>
                    <p className="leading-relaxed mt-3">
                      You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                      However, if you do not accept cookies, you may not be able to use some portions of our website.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Sharing Your Information</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed mb-3">We may share your information with:</p>
                  <div className="space-y-3">
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Service Providers</h3>
                        <p>
                          Payment processors, delivery services, and IT service providers who help us operate our
                          business.
                        </p>
                      </div>
                    </div>
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Business Partners</h3>
                        <p>Distributors and retailers who sell our food products.</p>
                      </div>
                    </div>
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Regulatory Authorities</h3>
                        <p>Food safety agencies and other government bodies when required by law.</p>
                      </div>
                    </div>
                    <div className="flex p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 flex items-center justify-center mr-4 shrink-0">
                        <Star size={20} className="text-[#0055a4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0055a4]">Professional Advisors</h3>
                        <p>Lawyers, accountants, and consultants as necessary for our business operations.</p>
                      </div>
                    </div>
                  </div>
                  <p className="leading-relaxed mt-4 text-[#0055a4] font-medium">
                    We do not sell your personal information to third parties. Any third parties we share your data with
                    are obligated to keep your information secure and confidential.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Data Security</h2>
                </div>
                <div className="sm:pl-11">
                  <div className="bg-gradient-to-r from-[#0055a4]/5 to-[#39b7e8]/5 p-5 rounded-lg">
                    <p className="leading-relaxed">
                      We implement appropriate security measures to protect your personal information from unauthorized
                      access, alteration, disclosure, or destruction. These measures include encryption, secure payment
                      processing, regular security assessments, and employee training on data protection.
                    </p>
                    <p className="leading-relaxed mt-3">
                      However, no method of transmission over the Internet or electronic storage is 100% secure. While
                      we strive to use commercially acceptable means to protect your personal information, we cannot
                      guarantee its absolute security.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">7</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Your Rights</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed mb-3">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">1</span>
                      </div>
                      <div>The right to access your personal information</div>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">2</span>
                      </div>
                      <div>The right to request correction of inaccurate information</div>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">3</span>
                      </div>
                      <div>The right to request deletion of your information</div>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">4</span>
                      </div>
                      <div>The right to restrict or object to processing</div>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">5</span>
                      </div>
                      <div>The right to data portability</div>
                    </div>
                    <div className="flex items-center p-3 bg-white border border-[#e0e0e0] rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-[#39b7e8] flex items-center justify-center text-white mr-3">
                        <span className="text-xs">6</span>
                      </div>
                      <div>The right to withdraw consent at any time</div>
                    </div>
                  </div>
                  <p className="leading-relaxed mt-4">
                    To exercise any of these rights, please contact us using the details provided below.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">8</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Children's Privacy</h2>
                </div>
                <div className="sm:pl-11">
                  <div className="bg-[#f0f7ff] p-5 rounded-lg border-l-4 border-[#0055a4]">
                    <p className="leading-relaxed">
                      While our food products may be enjoyed by people of all ages, our website and online services are
                      not directed to children under 16. We do not knowingly collect personal information from children.
                      If you are a parent or guardian and believe your child has provided us with personal information,
                      please contact us, and we will take steps to delete such information.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">9</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Changes to This Privacy Policy</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed">
                    We may update our Privacy Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                    new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p className="leading-relaxed mt-3">
                    We encourage you to review this Privacy Policy periodically to stay informed about how we are
                    protecting your information.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0055a4] flex items-center justify-center text-white mr-3">
                    <span className="text-sm font-bold">10</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0055a4]">Contact Us</h2>
                </div>
                <div className="sm:pl-11">
                  <p className="leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
                          src="/Media/Images/Logo/Arksh Food.png"
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
