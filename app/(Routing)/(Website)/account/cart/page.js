import Cart from '@/Components/Website/Account/Cart/Cart'
import React from 'react'
export const metadata = {
  title: 'Your Cart - Arksh Food',
  description: 'Review the items you’ve added to your cart and proceed to checkout for fresh, quality food at Arksh Food.',
}
const page = () => {
  return (
    <div>
      <Cart />
    </div>
  )
}

export default page
