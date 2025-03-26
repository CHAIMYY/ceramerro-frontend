import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import DashboardLayout from "../../app/components/dashboard/DashboardLayout";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Handcrafted Vase",
    image: "/placeholder.svg?height=50&width=50",
    price: "$120",
    stock: 15,
    status: "Active",
  },
  {
    id: "2",
    name: "Ceramic Bowl Set",
    image: "/placeholder.svg?height=50&width=50",
    price: "$85",
    stock: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Tea Pot",
    image: "/placeholder.svg?height=50&width=50",
    price: "$150",
    stock: 0,
    status: "Out of Stock",
  },
];

export default function SellerProducts() {
  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-plum">My Products</h1>
          <Button asChild className="bg-plum text-pearl hover:bg-orchid">
            <Link href="/seller/products/add">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Link>
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-plum/40" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-lavender/50 border-orchid/20"
              />
            </div>
            <Button variant="outline" className="text-plum hover:text-orchid">
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-plum hover:text-orchid"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
