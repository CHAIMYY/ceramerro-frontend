"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, ArrowUpDown, Loader2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    category: "",
    stock: "",
    status: "active",
    featured: false,
    images: [],
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
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await axios.get("http://localhost:3001/api/artisan/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts(response.data.products)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
      setLoading(false)

      // Handle unauthorized error
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSelectChange = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.nom) errors.nom = "Product name is required"
    if (!formData.description) errors.description = "Description is required"
    if (!formData.prix || isNaN(formData.prix)) errors.prix = "Valid price is required"
    if (!formData.stock || isNaN(formData.stock)) errors.stock = "Valid stock quantity is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddProduct = async () => {
    if (!validateForm()) return

    try {
      setSubmitting(true)

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await axios.post("http://localhost:3001/api/product/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts([...products, response.data.product])
      setIsAddDialogOpen(false)
      resetForm()
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add product",
        variant: "destructive",
      })

      // Handle unauthorized error
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditProduct = async () => {
    if (!validateForm()) return

    try {
      setSubmitting(true)

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await axios.put(`http://localhost:3001/api/product/update/${currentProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts(products.map((p) => (p._id === currentProduct._id ? response.data.product : p)))
      setIsEditDialogOpen(false)
      resetForm()
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update product",
        variant: "destructive",
      })

      // Handle unauthorized error
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      setSubmitting(true)

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
        return
      }

      await axios.delete(`http://localhost:3001/api/product/delete/${currentProduct._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts(products.filter((p) => p._id !== currentProduct._id))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete product",
        variant: "destructive",
      })

   
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nom: "",
      description: "",
      prix: "",
      category: "",
      stock: "",
      status: "active",
      featured: false,
      images: [],
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
    })
    setFormErrors({})
  }

  const openEditDialog = (product) => {
    setCurrentProduct(product)
    setFormData({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      category: product.category,
      stock: product.stock,
      status: product.status,
      featured: product.featured,
      images: product.images || [],
      dimensions: {
        height: product.dimensions?.height || "",
        width: product.dimensions?.width || "",
        depth: product.dimensions?.depth || "",
        unit: product.dimensions?.unit || "in",
      },
      weight: {
        value: product.weight?.value || "",
        unit: product.weight?.unit || "lb",
      },
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }


  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true
      const matchesStatus = statusFilter ? product.status === statusFilter : true

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === "priceHigh") {
        return b.prix - a.prix
      } else if (sortBy === "priceLow") {
        return a.prix - b.prix
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button
          onClick={() => {
            resetForm()
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pottery">Pottery</SelectItem>
              <SelectItem value="sculpture">Sculpture</SelectItem>
              <SelectItem value="tableware">Tableware</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="outOfStock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("priceHigh")}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("priceLow")}>Price: Low to High</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.nom}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => openEditDialog(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => openDeleteDialog(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                    Featured
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.nom}</h3>
                  <span className="font-bold">${product.prix}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      product.status === "active"
                        ? "bg-green-500"
                        : product.status === "draft"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></span>
                  <span className="capitalize">{product.status}</span>
                  <span className="mx-2">•</span>
                  <span>Stock: {product.stock}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                <div className="text-xs text-muted-foreground">
                  <span className="capitalize">{product.category || "Uncategorized"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground mb-4">
            <Package className="h-12 w-12 mx-auto mb-2" />
            <h3 className="text-lg font-medium">No products found</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            {searchTerm || categoryFilter || statusFilter
              ? "Try adjusting your filters to find what you're looking for."
              : "You haven't added any products yet."}
          </p>
          {!searchTerm && !categoryFilter && !statusFilter && (
            <Button
              onClick={() => {
                resetForm()
                setIsAddDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Product
            </Button>
          )}
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Product Name</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className={formErrors.nom ? "border-red-500" : ""}
                />
                {formErrors.nom && <p className="text-xs text-red-500">{formErrors.nom}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="prix">Price ($)</Label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleInputChange}
                  className={formErrors.prix ? "border-red-500" : ""}
                />
                {formErrors.prix && <p className="text-xs text-red-500">{formErrors.prix}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && <p className="text-xs text-red-500">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="sculpture">Sculpture</SelectItem>
                    <SelectItem value="tableware">Tableware</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={formErrors.stock ? "border-red-500" : ""}
                />
                {formErrors.stock && <p className="text-xs text-red-500">{formErrors.stock}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 h-full pt-8">
                <Checkbox
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dimensions</Label>
              <div className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Height"
                  name="dimensions.height"
                  type="number"
                  value={formData.dimensions.height}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Width"
                  name="dimensions.width"
                  type="number"
                  value={formData.dimensions.width}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Depth"
                  name="dimensions.depth"
                  type="number"
                  value={formData.dimensions.depth}
                  onChange={handleInputChange}
                />
                <Select
                  value={formData.dimensions.unit}
                  onValueChange={(value) => handleSelectChange("dimensions.unit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">Inches</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weight</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Weight"
                  name="weight.value"
                  type="number"
                  value={formData.weight.value}
                  onChange={handleInputChange}
                />
                <Select
                  value={formData.weight.unit}
                  onValueChange={(value) => handleSelectChange("weight.unit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lb">Pounds</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="oz">Ounces</SelectItem>
                    <SelectItem value="g">Grams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <div className="border rounded-md p-4">
                <div className="text-center">
                  <Button variant="outline" className="w-full">
                    Upload Images
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Upload up to 5 images. Max 5MB each.</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details of your product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Same form fields as Add Product Dialog */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nom">Product Name</Label>
                <Input
                  id="edit-nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className={formErrors.nom ? "border-red-500" : ""}
                />
                {formErrors.nom && <p className="text-xs text-red-500">{formErrors.nom}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-prix">Price ($)</Label>
                <Input
                  id="edit-prix"
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleInputChange}
                  className={formErrors.prix ? "border-red-500" : ""}
                />
                {formErrors.prix && <p className="text-xs text-red-500">{formErrors.prix}</p>}
              </div>
            </div>

            {/* Rest of the form fields (same as Add Product Dialog) */}
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={formErrors.description ? "border-red-500" : ""}
              />
              {formErrors.description && <p className="text-xs text-red-500">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="sculpture">Sculpture</SelectItem>
                    <SelectItem value="tableware">Tableware</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock Quantity</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={formErrors.stock ? "border-red-500" : ""}
                />
                {formErrors.stock && <p className="text-xs text-red-500">{formErrors.stock}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 h-full pt-8">
                <Checkbox
                  id="edit-featured"
                  name="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="edit-featured">Featured Product</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

