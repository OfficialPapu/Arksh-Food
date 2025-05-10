
import Product from '@/Components/Admin/Products/Product'
import React from 'react'
export const metadata = {
  title: 'Edit Product - Arksh Food',
  description: 'Edit details of an existing product in the Arksh Food catalog.',
};

const page = () => {
  return (
    <div>
      <Product />
    </div>
  )
}

export default page
