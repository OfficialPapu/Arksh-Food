"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const {Slug} = useParams()
  return (
    <div>
      This is your slug: {Slug}
    </div>
  )
}

export default page
