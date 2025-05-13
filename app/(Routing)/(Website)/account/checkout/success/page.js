import Success from '@/Components/Website/Account/Checkout/Success'
import React from 'react'
export const metadata = {
  title: 'Order Placed Successfully - Arksh Food',
  description: "Your order has been placed successfully! Thank you for choosing Arksh Food. We'll process and deliver your fresh food shortly.",
}

const page = () => {
  return (
    <div>
      <Success />
    </div>
  )
}

export default page
