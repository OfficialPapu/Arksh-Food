export function generateProductMetadata(product) {
  return {
    title: `${product.Name} - Arksh Food`,
    description: product.description,

    keywords: "organic honey, natural honey, Arksh Food, healthy food",
    authors: [{ name: "Arksh Food" }],
    creator: "Arksh Food",

    openGraph: {
      title: `${product.name} - Arksh Food`,
      description: product.description,
      url: product.url,
      siteName: "Arksh Food",
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: "en_US",
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Arksh Food`,
      description: product.description,
      images: [product.image],
      site: "@arkshfood",
      creator: "@arkshfood",
    },

    alternates: {
      canonical: product.url,
    },
  };
}
