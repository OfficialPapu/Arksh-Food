import React from 'react';
import ProductDetails from '@/Components/Website/Product/ProductDetails';
import axios from '@/lib/axios';

const BASEURL = process.env.NEXT_PUBLIC_APP_URL;
const BASEIMAGEURL = process.env.NEXT_PUBLIC_IMAGE_URL;
const FALLBACK_IMAGE = `${BASEURL}/Media/Images/Logo/Arksh Food.png`;

const DEFAULT_META = {
  title: "Arksh Food - Delicious Food Items",
  description: "Find the best food at Arksh Food",
  keywords: "Arksh Food, food delivery, best online food, Nepal foods",
};

export async function generateMetadata({ params }) {
  try {
    const { data } = await axios.get(`${BASEURL}/api/product/${params.Slug}`);
    const product = data[0];

    const seo = product?.SEO || {};
    const metaTitle = seo.Title || product?.Name || DEFAULT_META.title;
    const metaDesc = seo.Description || product?.Excerpt || DEFAULT_META.description;
    const metaKeywords = seo.Keywords || product?.Tags?.join(', ') || DEFAULT_META.keywords;

    const imageUrl = product?.Media?.Images?.[0]
      ? `${BASEIMAGEURL}${product.Media.Images[0]}`
      : FALLBACK_IMAGE;

    const pageUrl = `${BASEURL}/product/${params.Slug}`;

    return {
      metadataBase: new URL(BASEURL),
      title: metaTitle,
      description: metaDesc,
      keywords: metaKeywords,
      openGraph: {
        title: metaTitle,
        description: metaDesc,
        images: [imageUrl],
        url: pageUrl,
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDesc,
        images: [imageUrl],
      },
      alternates: {
        canonical: pageUrl,
      },
      robots: 'index, follow',
    };
  } catch (error) {
    return {
      metadataBase: new URL(BASEURL),
      title: DEFAULT_META.title,
      description: DEFAULT_META.description,
      keywords: DEFAULT_META.keywords,
      openGraph: {
        title: DEFAULT_META.title,
        description: DEFAULT_META.description,
        images: [FALLBACK_IMAGE],
        url: `${BASEURL}/product/${params.Slug}`,
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: 'summary_large_image',
        title: DEFAULT_META.title,
        description: DEFAULT_META.description,
        images: [FALLBACK_IMAGE],
      },
      alternates: {
        canonical: `${BASEURL}/product/${params.Slug}`,
      },
      robots: 'index, follow',
    };
  }
}

const page = () => {
  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default page;
