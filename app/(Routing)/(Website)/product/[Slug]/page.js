"use client";
import React from 'react'
import ProductDetails from '@/Components/Website/Product/ProductDetails'
import UseProductDetails from '@/Components/Website/Product/UseProductDetails';
import { generateProductMetadata } from '@/Components/Website/Metadata/Product';

const page = () => {
  const { Product } = UseProductDetails();
  const metadata = generateProductMetadata(Product);
  return (
    <div>
      <ProductDetails />
    </div>
  )
}

export default page
