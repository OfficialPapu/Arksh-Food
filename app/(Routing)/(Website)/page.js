import React from 'react'
import Categories from '@/Components/Website/Home/Categories'
import FeaturedProducts from '@/Components/Website/Home/FeaturedProducts'
import HeroSection from '@/Components/Website/Home/HeroSection'
import Testimonials from '@/Components/Website/Home/Testimonials'

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      {/* <Testimonials /> */}
    </div>
  )
}

export default page