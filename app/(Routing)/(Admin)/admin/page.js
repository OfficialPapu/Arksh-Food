import React from 'react'
import Dashboard from '@/Components/Admin/Dashboard'
export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your Arksh Food admin panel. View orders, products, and more.',
};

const page = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default page
