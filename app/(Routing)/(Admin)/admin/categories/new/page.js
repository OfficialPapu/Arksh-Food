import NewCategory from '@/Components/Admin/Category/NewCategory'
import React from 'react'
export const metadata = {
  title: 'New Category - Arksh Food',
  description: 'Create a new product category for Arksh Food.',
};
const page = () => {
  return (
    <div>
      <NewCategory />
    </div>
  )
}

export default page
