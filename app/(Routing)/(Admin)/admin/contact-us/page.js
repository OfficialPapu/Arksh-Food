import ContactUs from '@/Components/Admin/Pages/ContactUs'
import React from 'react'
export const metadata = {
    title: 'Contact Submissions - Admin Panel | Arksh Food',
    description: 'View and manage customer contact form submissions for Arksh Food. Stay connected with your users through the admin panel.',
};

const page = () => {
    return (
        <div>
            <ContactUs />
        </div>
    )
}

export default page
