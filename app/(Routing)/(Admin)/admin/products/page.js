import React from 'react'
import Products from '@/Components/Admin/Products/Products'
export const metadata = {
  title: 'Manage Products - Arksh Food',
  description: 'View and manage all products available on Arksh Food.',
};
const page = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Products />
    </div>
  )
}

export default page
