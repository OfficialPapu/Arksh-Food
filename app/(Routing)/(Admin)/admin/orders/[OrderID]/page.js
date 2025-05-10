import React from 'react'
import Orders from '@/Components/Admin/Orders/OrderDetails/Orders'
export const metadata = {
  title: 'Order Detail - Arksh Food',
  description: 'View detailed information about a specific customer order in Arksh Food.',
};
const page = () => {
  return (
    <div>
      <Orders />
    </div>
  )
}

export default page
