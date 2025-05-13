import SEO from '@/Components/Admin/Pages/SEO'
import React from 'react'
export const metadata = {
    title: 'SEO Optimization - Admin Panel | Arksh Food',
    description: 'Manage and update meta titles, descriptions, and SEO settings for Arksh Food pages to improve visibility and ranking.',
}
const page = () => {
    return (
        <div>
            <SEO />
        </div>
    )
}

export default page
