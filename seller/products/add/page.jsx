"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../app/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/seller/products");
  };

  return (
    <DashboardLayout role="seller">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-plum mb-6">Add New Product</h1>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-lavender/50 border-orchid/20"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="bg-lavender/50 border-orchid/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="bg-lavender/50 border-orchid/20"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="bg-lavender/50 border-orchid/20"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                onValueChange={handleSelectChange("category")}
              >
                <SelectTrigger className="bg-lavender/50 border-orchid/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vases">Vases</SelectItem>
                  <SelectItem value="plates">Plates</SelectItem>
                  <SelectItem value="bowls">Bowls</SelectItem>
                  <SelectItem value="cups">Cups</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                onValueChange={handleSelectChange("status")}
              >
                <SelectTrigger className="bg-lavender/50 border-orchid/20">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-plum text-pearl hover:bg-orchid"
              >
                Add Product
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
