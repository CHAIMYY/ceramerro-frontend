import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import ProductCard from "../components/ProductCard"

export default function ProductCatalog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select>
          <option value="">All Categories</option>
          <option value="tableware">Tableware</option>
          <option value="decor">Decor</option>
          <option value="jewelry">Jewelry</option>
        </Select>
        <Select>
          <option value="">All Colors</option>
          <option value="white">White</option>
          <option value="terracotta">Terracotta</option>
          <option value="blue">Blue</option>
        </Select>
        <Select>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </Select>
        <div className="flex-grow">
          <Input type="search" placeholder="Search products..." />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Add ProductCard components here */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="mr-2">
          Previous
        </Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}

