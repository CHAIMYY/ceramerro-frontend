"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/admin/products",
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/admin/products/${productToDelete._id}`,
      );
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/admin/products/${editProduct._id}`,
        editProduct,
      );
      setProducts(
        products.map((p) => (p._id === editProduct._id ? editProduct : p)),
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product.nom}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {product.description}
                    </TableCell>
                    <TableCell>${product.prix}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "active"
                            ? "outline"
                            : product.status === "outOfStock"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="nom">Name</label>
                <Input
                  id="nom"
                  name="nom"
                  value={editProduct?.nom || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  name="description"
                  value={editProduct?.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="prix">Price</label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  value={editProduct?.prix || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editProduct?.category || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  <option value="pottery">Pottery</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="tableware">Tableware</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editProduct?.status || "active"}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="stock">Stock</label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={editProduct?.stock || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="featured">Featured</label>
                <select
                  id="featured"
                  name="featured"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editProduct?.featured ? "true" : "false"}
                  onChange={(e) => {
                    setEditProduct({
                      ...editProduct,
                      featured: e.target.value === "true",
                    });
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
