import Product from '@/Components/Admin/Products/Product'
import React from 'react'
export const metadata = {
  title: 'Add New Product - Arksh Food',
  description: 'Add a new product to the Arksh Food catalog.',
};
const page = () => {
  return (
    <div>
      <Product />
    </div>
  )
}

export default page
