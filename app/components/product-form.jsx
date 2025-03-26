"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Default product structure
const defaultProduct = {
  nom: "",
  description: "",
  prix: "",
  stock: "",
  category: "",
  dimensions: {
    height: "",
    width: "",
    depth: "",
    unit: "in",
  },
  weight: {
    value: "",
    unit: "lb",
  },
  status: "active",
  featured: false,
  images: [],
};

export default function ProductCreationPage() {
  const router = useRouter();
  const [product, setProduct] = useState(defaultProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form field changes
  const handleChange = (field, value) => {
    // Handle nested fields like dimensions.height
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProduct({
        ...product,
        [parent]: {
          ...product[parent],
          [child]: value,
        },
      });
    } else {
      setProduct({
        ...product,
        [field]: value,
      });
    }
  };

  // Handle adding image URLs
  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      setProduct({
        ...product,
        images: [...product.images, imageUrl],
      });
    }
  };

  // Handle removing images
  const handleRemoveImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({
      ...product,
      images: newImages,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Convert string values to numbers where needed
      const formattedProduct = {
        ...product,
        prix: parseFloat(product.prix),
        stock: parseInt(product.stock),
        dimensions: {
          height: parseFloat(product.dimensions.height),
          width: parseFloat(product.dimensions.width),
          depth: parseFloat(product.dimensions.depth),
          unit: product.dimensions.unit,
        },
        weight: {
          value: parseFloat(product.weight.value),
          unit: product.weight.unit,
        },
      };

      const response = await fetch("http://localhost:3001/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      const data = await response.json();
      setSuccessMessage("Product created successfully!");

      // Optionally redirect to product list or clear form
      setTimeout(() => {
        router.push("/products"); // Redirect to products page
        // Or clear form: setProduct(defaultProduct)
      }, 2000);
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "An error occurred while creating the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <ProductForm
            isEditing={false}
            product={product}
            onChange={handleChange}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
