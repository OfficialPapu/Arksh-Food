"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
  const {Slug} = useParams();
  console.log(Slug);
  
  return (
    <div>
      This is your slug: {Slug}
    </div>
  )
}
