"use server";

import axios from "axios";
import { Metadata } from "next";

async function getProduct(id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/product/product/${id}`,
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching product for meta:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found | Ceramerro",
      description:
        "The requested product could not be found. Browse our collection of handcrafted ceramics at Ceramerro.",
    };
  }

  return {
    title: `${product.nom} | Ceramerro - Handcrafted Ceramics`,
    description: `${product.description?.slice(0, 150)}... | Shop handcrafted ceramic ${product.nom.toLowerCase()} by ${product.userId?.name || "our artisans"} at Ceramerro.`,
    openGraph: {
      title: `${product.nom} | Ceramerro`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductLayout({ children }) {
  return children;
}
