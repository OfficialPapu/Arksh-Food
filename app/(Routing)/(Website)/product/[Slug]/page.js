import React from 'react';
import ProductDetails from '@/Components/Website/Product/ProductDetails';
import axios from '@/lib/axios';
export async function generateMetadata({ params }) {
  try {
    const response = await axios.get('http://localhost:3000/api/product/' + params.Slug);  // Full URL for dev, use relative in prod
    const Product = response.data[0]; 
    
    return {
      title: Product.Name || "Arksh Food - Delicious Food Items",
      description: Product.description || "Find the best food at Arksh Food",
      openGraph: {
        title: Product.name || "Arksh Food - Delicious Food Items",
        description: Product.description || "Best food delivery options",
        images: Product.imageUrl ? [Product.imageUrl] : ["default-image-url.jpg"], // Default image if none is available
        url: `https://arkshfood.com/product/${params.Slug}`, // Add the URL for Open Graph
        type: "website",  // Type for Open Graph
        locale: "en_US", // Locale
      },
      twitter: {
        card: 'summary_large_image', // Type of Twitter Card
        title: Product.name || "Arksh Food - Delicious Food Items",
        description: Product.description || "Best food delivery options",
        image: Product.imageUrl || "default-image-url.jpg", // Fallback image for Twitter
      },
      canonical: `https://arkshfood.com/product/${params.Slug}`, // Canonical link to avoid duplicate content
      robots: 'index, follow',  // Indexing and following of links
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: Product.name || "Arksh Food - Delicious Food Items",
        description: Product.description || "Find the best food at Arksh Food",
        image: Product.imageUrl || "default-image-url.jpg",
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: Product.price || 0, // Ensure the price is available
          availability: 'https://schema.org/InStock',
        },
      },
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return {
      title: "Arksh Food - Delicious Food Items",  // Fallback title
      description: "Find the best food at Arksh Food",  // Fallback description
      openGraph: {
        title: "Arksh Food - Delicious Food Items",
        description: "Best food delivery options",
        images: ["default-image-url.jpg"],  // Fallback image
        url: "https://arkshfood.com",
        type: "website",  // Type for Open Graph
      },
      twitter: {
        card: 'summary_large_image', 
        title: "Arksh Food - Delicious Food Items",
        description: "Best food delivery options",
        image: "default-image-url.jpg",  // Fallback image
      },
      canonical: "https://arkshfood.com",
      robots: 'index, follow',  // Indexing and following of links
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Website',
        name: "Arksh Food",
        description: "Best food delivery options",
        image: "default-image-url.jpg",
      },
    };
  }
}

// Main page component
const page = () => {
  return (
    <div>
      <ProductDetails /> {/* Render your product details here */}
    </div>
  );
};

export default page;
