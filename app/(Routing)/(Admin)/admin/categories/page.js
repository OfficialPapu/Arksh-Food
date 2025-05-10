import CategoryDashboard from '@/Components/Admin/Category/CategoryDashboard'
import React from 'react'
export const metadata = {
  title: 'Manage Categories - Arksh Food',
  description: 'Manage product categories in the Arksh Food admin panel.',
};

const page = () => {
  return (
    <div>
      <CategoryDashboard/>
    </div>
  )
}

export default page;