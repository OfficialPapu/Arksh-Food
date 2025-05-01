import React from 'react'
import Categories from '@/Components/Website/Home/Categories'
import FeaturedProducts from '@/Components/Website/Home/FeaturedProducts'
import HeroSection from '@/Components/Website/Home/HeroSection'
import Testimonials from '@/Components/Website/Home/Testimonials'
import { Toaster } from 'react-hot-toast'

const page = () => {
  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
    </div>
  )
}

export default page