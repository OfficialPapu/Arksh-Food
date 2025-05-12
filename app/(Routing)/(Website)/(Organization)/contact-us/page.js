"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "@/lib/axios"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/Components/ui/button"

export default function ContactUs() {
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.phone || !formState.subject || !formState.message) {
      toast.error("Please fill in all the required fields.")
      return
    }


    try {
      setIsLoading(true)
      const response = await axios.post("api/contact-us/new", {
        Name: formState.name,
        Email: formState.email,
        Phone: formState.phone,
        Subject: formState.subject,
        Message: formState.message,
      })
      if (response.status === 201) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Thank you for your message. We'll get back to you shortly!",
        })

        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#0055a4]/5 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-64 bg-gradient-to-tl from-[#39b7e8]/5 to-transparent rounded-tl-[200px]"></div>
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full border-8 border-[#0055a4]/5"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border-8 border-[#39b7e8]/5"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-[#0055a4]/10 to-[#39b7e8]/10 rounded-full blur-xl opacity-70"></div>
                <Image
                  src="/Media/Images/Logo/Arksh Food.png"
                  alt="Arksh Food Logo"
                  width={120}
                  height={120}
                  className="relative h-24 w-auto"
                  priority
                />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="relative inline-block">
                  <span className="relative z-10">Contact</span>
                  <div className="absolute bottom-2 left-0 right-0 h-3 bg-[#39b7e8]/20 -rotate-1"></div>
                </span>
                <span className="text-[#0055a4]"> Us</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10">
                We're here to help with any questions about our products and services. Our team is ready to provide the
                support you need.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center bg-[#0055a4] text-white px-8 py-4 rounded-full font-medium hover:bg-[#004a8f] transition-all duration-300 shadow-lg group"
                >
                  Send a Message
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/JZNq4YHfaGnicv2X7"
                  className="inline-flex items-center bg-white text-[#0055a4] border-2 border-[#0055a4] px-8 py-4 rounded-full font-medium hover:bg-[#f0f7ff] transition-all duration-300"
                >
                  View Our Location
                  <MapPin size={18} className="ml-2" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-[#0055a4]/20 transition-all hover:shadow-2xl group">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0055a4] to-[#0055a4]/80 flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                  <Phone size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">+977-9704591211</p>
                <a
                  href="tel:+9779704591211"
                  className="inline-flex items-center text-[#0055a4] font-medium hover:text-[#39b7e8] transition-colors"
                >
                  Call Now
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-[#39b7e8]/20 transition-all hover:shadow-2xl group">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#39b7e8] to-[#39b7e8]/80 flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-4">info@arkshgroup.com</p>
                <a
                  href="mailto:info@arkshfood.com"
                  className="inline-flex items-center text-[#39b7e8] font-medium hover:text-[#0055a4] transition-colors"
                >
                  Send Email
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-[#0055a4]/20 transition-all hover:shadow-2xl group">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0055a4] to-[#39b7e8] flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
                <p className="text-gray-600 mb-4">Trisara Lazimpat, Kathmandu, Nepal</p>
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/JZNq4YHfaGnicv2X7"
                  className="inline-flex items-center text-[#0055a4] font-medium hover:text-[#39b7e8] transition-colors"
                >
                  Get Directions
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-64 bg-gradient-to-br from-[#0055a4]/5 to-transparent rounded-br-[200px]"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-gradient-to-tl from-[#39b7e8]/5 to-transparent rounded-tl-[200px]"></div>
          <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full border-8 border-[#0055a4]/5"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full border-8 border-[#39b7e8]/5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0055a4]/20 to-[#39b7e8]/20 blur-xl rounded-full"></div>
                  <div className="relative bg-white rounded-full p-3 shadow-lg">
                    <Mail className="h-8 w-8 text-[#0055a4]" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="relative inline-block">
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute bottom-2 left-0 right-0 h-3 bg-[#39b7e8]/20 -rotate-1"></div>
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our products or services? We're here to help! Fill out the form below and our team
                will get back to you as soon as possible.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="h-2 bg-gradient-to-r from-[#0055a4] to-[#39b7e8]"></div>

              <div className="p-6 md:p-8">
                {/* Form Status */}
                {formStatus.submitted ? (
                  <div
                    className={`p-6 rounded-xl mb-6 ${formStatus.success ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                  >
                    <div className="flex items-center">
                      {formStatus.success ? (
                        <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {formStatus.success ? "Message Sent Successfully!" : "Error Sending Message"}
                        </h3>
                        <p>{formStatus.message}</p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0055a4]"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#0055a4]/20 pointer-events-none transition-colors duration-300"></div>
                    </div>

                    <div className="group relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0055a4]"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#0055a4]/20 pointer-events-none transition-colors duration-300"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="block w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="phone"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0055a4]"
                      >
                        Phone Number
                      </label>
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#0055a4]/20 pointer-events-none transition-colors duration-300"></div>
                    </div>

                    <div className="group relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="subject"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0055a4]"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#0055a4]/20 pointer-events-none transition-colors duration-300"></div>
                    </div>
                  </div>

                  <div className="group relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="block w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0055a4] focus:border-transparent peer"
                      placeholder=" "
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0055a4]"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#0055a4]/20 pointer-events-none transition-colors duration-300"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="privacy-policy"
                        name="privacy-policy"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-[#0055a4] focus:ring-[#0055a4] border-gray-300 rounded"
                      />
                      <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-600">
                        I agree to the{" "}
                        <Link href="/privacy-policy" className="text-[#0055a4] hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-[#0055a4] to-[#39b7e8] text-white !px-8 !py-6 rounded-lg font-medium hover:from-[#39b7e8] hover:to-[#0055a4] transition-all duration-300 shadow-md group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Sending...
                        </>
                      ) :
                        (
                          <>
                            Send Message
                            <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )
                      }
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#0055a4]/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#39b7e8]/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 !mb-4">
                    Visit Our <span className="text-[#0055a4]">Office</span>
                  </h2>
                  <p className="text-gray-600 max-w-xl">
                    We're conveniently located in the Trisara Lazimpat, Kathmandu. Feel free to visit us during
                    business hours.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border border-gray-100">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#0055a4]/10 flex items-center justify-center text-[#0055a4] mr-4 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 !mb-2">Our Address</h3>
                      <p className="text-gray-600 mb-1">Arksh Food Pvt. Ltd.</p>
                      <p className="text-gray-600 mb-1">Trisara Lazimpat</p>
                      <p className="text-gray-600">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#39b7e8]/10 flex items-center justify-center text-[#39b7e8] mr-4 flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 !mb-2">Opening Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p className="text-gray-600">Saturday - Friday:</p>
                        <p className="text-gray-800 font-medium">9:00 AM - 5:00 PM</p>
                        <p className="text-gray-600">Saturday:</p>
                        <p className="text-gray-800 font-medium">Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white p-3 rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
                  <div className="absolute top-3 left-3 z-10 bg-white rounded-lg shadow-md px-4 py-2 flex items-center">
                    <Image
                      src="/Media/Images/Logo/Arksh Food.png"
                      alt="Arksh Food Logo"
                      width={32}
                      height={32}
                      className="h-8 w-auto mr-2"
                    />
                    <span className="font-medium text-gray-900">Arksh Food</span>
                  </div>

                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7063.626874298182!2d85.3151426916328!3d27.723045954694005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1918569da9d3%3A0xc3e26ac7228addc4!2sArksh%20Food%20Lazimpat%20%7C%20Dami%20Snacks%2C%20MacCoffee%2C%20Didian%20Biscuits%2C%20Tafeli%20Chocolates!5e0!3m2!1sen!2snp!4v1747031092602!5m2!1sen!2snp"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Arksh Food Location"
                      className="w-full h-full"
                    ></iframe>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="inline-flex items-center">
                        <MapPin size={14} className="mr-1 text-[#0055a4]" />
                        Trisara Lazimpat, Kathmandu
                      </span>
                    </div>

                    <a
                      href="https://maps.app.goo.gl/JZNq4YHfaGnicv2X7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#0055a4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#39b7e8] transition-all duration-300"
                    >
                      Get Directions
                      <ArrowRight size={14} className="ml-1" />
                    </a>
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
