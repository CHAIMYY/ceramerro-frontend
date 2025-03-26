"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrency } from "../../contexts/CurrencyContext";

export default function ProductDetails({ params }) {
  const [quantity, setQuantity] = useState(1);
  const { currency } = useCurrency();

  // Mock product data - in a real app, you'd fetch this based on the ID
  const product = {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: { USD: 129.99, EUR: 109.99, GBP: 99.99 },
    description:
      "A beautiful, hand-thrown ceramic vase with a unique glaze finish. Perfect for displaying your favorite flowers or as a standalone decorative piece.",
    artisan: "Jane Doe",
    dimensions: '8" x 6" x 10"',
    weight: "2 lbs",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src="https://img.freepik.com/free-photo/white-modern-vases-arrangement_52683-93730.jpg?t=st=1740050825~exp=1740054425~hmac=c48819b7621480f62ffaf500d25d1c764e8cef6fdde2fb7ea2e604bb9d49ccb3&w=1060"
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">
            {product.price[currency]} {currency}
          </p>
          <p className="text-gray-600">{product.description}</p>
          <p>Artisan: {product.artisan}</p>
          <p>Dimensions: {product.dimensions}</p>
          <p>Weight: {product.weight}</p>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
