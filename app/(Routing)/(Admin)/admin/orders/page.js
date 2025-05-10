import React from 'react'
import Orders from "@/Components/Admin/Orders/Orders"
export const metadata = {
  title: 'Manage Orders - Arksh Food',
  description: 'Manage all customer orders from the Arksh Food admin panel.',
};
const page = () => {
  return (
    <div>
      <Orders/>
    </div>
  )
}

export default page
