import UserList from '@/Components/Admin/Users/UserList'
import React from 'react'
export const metadata = {
  title: 'Manage Users - Arksh Food',
  description: 'View and manage users registered on Arksh Food.',
};
const page = () => {
  return (
    <div>
      <UserList/>
    </div>
  )
}

export default page
