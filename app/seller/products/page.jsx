"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreVertical, Edit, Trash, X, PlusCircle } from "lucide-react"
import Image from "next/image"

// Sample product data
const initialProducts = [
  {
    id: "1",
    nom: "Premium Handcrafted Bowl",
    description: "A beautiful handcrafted ceramic bowl with unique glazing pattern.",
    prix: 129.99,
    stock: 45,
    category: "pottery",
    dimensions: {
      height: 4,
      width: 8,
      depth: 8,
      unit: "in",
    },
    weight: {
      value: 2.5,
      unit: "lb",
    },
    status: "active",
    featured: true,
    images: ["/placeholder.svg?height=80&width=80", "/placeholder.svg?height=80&width=80"],
  },
  {
    id: "2",
    nom: "Ceramic Vase",
    description: "Elegant ceramic vase with minimalist design, perfect for modern homes.",
    prix: 89.99,
    stock: 18,
    category: "pottery",
    dimensions: {
      height: 12,
      width: 6,
      depth: 6,
      unit: "in",
    },
    weight: {
      value: 3.2,
      unit: "lb",
    },
    status: "active",
    featured: false,
    images: ["/placeholder.svg?height=80&width=80"],
  },
  {
    id: "3",
    nom: "Decorative Plate Set",
    description: "Set of 4 decorative plates with hand-painted designs.",
    prix: 149.99,
    stock: 12,
    category: "tableware",
    dimensions: {
      height: 1,
      width: 10,
      depth: 10,
      unit: "in",
    },
    weight: {
      value: 4,
      unit: "lb",
    },
    status: "active",
    featured: true,
    images: ["/placeholder.svg?height=80&width=80"],
  },
  {
    id: "4",
    nom: "Stoneware Mug",
    description: "Handcrafted stoneware mug with comfortable handle and durable finish.",
    prix: 24.99,
    stock: 87,
    category: "tableware",
    dimensions: {
      height: 4,
      width: 3,
      depth: 3,
      unit: "in",
    },
    weight: {
      value: 12,
      unit: "oz",
    },
    status: "active",
    featured: false,
    images: ["/placeholder.svg?height=80&width=80"],
  },
  {
    id: "5",
    nom: "Ceramic Sculpture",
    description: "Abstract ceramic sculpture, perfect as a statement piece for home or office.",
    prix: 299.99,
    stock: 5,
    category: "sculpture",
    dimensions: {
      height: 15,
      width: 8,
      depth: 8,
      unit: "in",
    },
    weight: {
      value: 5.5,
      unit: "lb",
    },
    status: "active",
    featured: true,
    images: ["/placeholder.svg?height=80&width=80"],
  },
]

// Sample categories
const categories = [
  { id: "1", name: "Pottery" },
  { id: "2", name: "Sculpture" },
  { id: "3", name: "Tableware" },
  { id: "4", name: "Decorative" },
  { id: "5", name: "Other" },
]

function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
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
  })

  const filteredProducts = products.filter((product) => product.nom.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddProduct = () => {
    const productToAdd = {
      id: Date.now().toString(),
      nom: newProduct.nom,
      description: newProduct.description,
      prix: Number.parseFloat(newProduct.prix),
      stock: Number.parseInt(newProduct.stock),
      category: newProduct.category,
      dimensions: {
        height: Number.parseFloat(newProduct.dimensions.height) || 0,
        width: Number.parseFloat(newProduct.dimensions.width) || 0,
        depth: Number.parseFloat(newProduct.dimensions.depth) || 0,
        unit: newProduct.dimensions.unit,
      },
      weight: {
        value: Number.parseFloat(newProduct.weight.value) || 0,
        unit: newProduct.weight.unit,
      },
      status: newProduct.status,
      featured: newProduct.featured,
      images: newProduct.images.length > 0 ? newProduct.images : ["/placeholder.svg?height=80&width=80"],
    }

    setProducts([...products, productToAdd])
    setNewProduct({
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
    })
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleNewProductChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setNewProduct({
        ...newProduct,
        [parent]: {
          ...newProduct[parent],
          [child]: value,
        },
      })
    } else {
      setNewProduct({
        ...newProduct,
        [field]: value,
      })
    }
  }

  const handleEditingProductChange = (field, value) => {
    if (!editingProduct) return

    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditingProduct({
        ...editingProduct,
        [parent]: {
          ...editingProduct[parent],
          [child]: value,
        },
      })
    } else {
      setEditingProduct({
        ...editingProduct,
        [field]: value,
      })
    }
  }

  const addImageToNewProduct = () => {
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, "/placeholder.svg?height=80&width=80"],
    })
  }

  const removeImageFromNewProduct = (index) => {
    const updatedImages = [...newProduct.images]
    updatedImages.splice(index, 1)
    setNewProduct({
      ...newProduct,
      images: updatedImages,
    })
  }

  const addImageToEditingProduct = () => {
    if (!editingProduct) return
    setEditingProduct({
      ...editingProduct,
      images: [...editingProduct.images, "/placeholder.svg?height=80&width=80"],
    })
  }

  const removeImageFromEditingProduct = (index) => {
    if (!editingProduct) return
    const updatedImages = [...editingProduct.images]
    updatedImages.splice(index, 1)
    setEditingProduct({
      ...editingProduct,
      images: updatedImages,
    })
  }

  const ProductForm = ({ isEditing, product, onChange, onAddImage, onRemoveImage }) => (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4 py-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={isEditing ? "edit-name" : "name"}>Product Name</Label>
            <Input
              id={isEditing ? "edit-name" : "name"}
              value={product.nom}
              onChange={(e) => onChange("nom", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={isEditing ? "edit-description" : "description"}>Description</Label>
            <Textarea
              id={isEditing ? "edit-description" : "description"}
              value={product.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor={isEditing ? "edit-price" : "price"}>Price ($)</Label>
              <Input
                id={isEditing ? "edit-price" : "price"}
                type="number"
                step="0.01"
                min="0"
                value={product.prix}
                onChange={(e) => onChange("prix", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={isEditing ? "edit-stock" : "stock"}>Stock</Label>
              <Input
                id={isEditing ? "edit-stock" : "stock"}
                type="number"
                min="0"
                value={product.stock}
                onChange={(e) => onChange("stock", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={isEditing ? "edit-category" : "category"}>Category</Label>
            <Select value={product.category} onValueChange={(value) => onChange("category", value)}>
              <SelectTrigger id={isEditing ? "edit-category" : "category"}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={isEditing ? "edit-status" : "status"}>Status</Label>
            <Select value={product.status} onValueChange={(value) => onChange("status", value)}>
              <SelectTrigger id={isEditing ? "edit-status" : "status"}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="outOfStock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={isEditing ? "edit-featured" : "featured"}
              checked={product.featured}
              onCheckedChange={(checked) => onChange("featured", checked)}
            />
            <Label htmlFor={isEditing ? "edit-featured" : "featured"}>Featured Product</Label>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details" className="space-y-4 py-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Dimensions</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-height" : "height"} className="text-xs">
                  Height
                </Label>
                <Input
                  id={isEditing ? "edit-height" : "height"}
                  type="number"
                  step="0.1"
                  min="0"
                  value={product.dimensions.height}
                  onChange={(e) => onChange("dimensions.height", e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-width" : "width"} className="text-xs">
                  Width
                </Label>
                <Input
                  id={isEditing ? "edit-width" : "width"}
                  type="number"
                  step="0.1"
                  min="0"
                  value={product.dimensions.width}
                  onChange={(e) => onChange("dimensions.width", e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-depth" : "depth"} className="text-xs">
                  Depth
                </Label>
                <Input
                  id={isEditing ? "edit-depth" : "depth"}
                  type="number"
                  step="0.1"
                  min="0"
                  value={product.dimensions.depth}
                  onChange={(e) => onChange("dimensions.depth", e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-dim-unit" : "dim-unit"} className="text-xs">
                  Unit
                </Label>
                <Select value={product.dimensions.unit} onValueChange={(value) => onChange("dimensions.unit", value)}>
                  <SelectTrigger id={isEditing ? "edit-dim-unit" : "dim-unit"} className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">inches</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Weight</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-weight" : "weight"} className="text-xs">
                  Weight
                </Label>
                <Input
                  id={isEditing ? "edit-weight" : "weight"}
                  type="number"
                  step="0.1"
                  min="0"
                  value={product.weight.value}
                  onChange={(e) => onChange("weight.value", e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor={isEditing ? "edit-weight-unit" : "weight-unit"} className="text-xs">
                  Unit
                </Label>
                <Select value={product.weight.unit} onValueChange={(value) => onChange("weight.unit", value)}>
                  <SelectTrigger id={isEditing ? "edit-weight-unit" : "weight-unit"} className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lb">lb</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="oz">oz</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="images" className="space-y-4 py-4">
        <div className="space-y-4">
          <Label>Product Images</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {product.images &&
              product.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square relative rounded-md overflow-hidden border border-border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={onAddImage}
              className="aspect-square flex items-center justify-center border-2 border-dashed border-border rounded-md hover:border-primary transition-colors"
            >
              <PlusCircle className="h-8 w-8 text-muted-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Add images of your product. Recommended size: 800x800px. Max file size: 5MB.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              isEditing={false}
              product={newProduct}
              onChange={handleNewProductChange}
              onAddImage={addImageToNewProduct}
              onRemoveImage={removeImageFromNewProduct}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={handleAddProduct}
                  disabled={!newProduct.nom || !newProduct.prix || !newProduct.stock || !newProduct.category}
                >
                  Add Product
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.nom}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.nom}</TableCell>
                  <TableCell>${product.prix.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "draft"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setEditingProduct(product)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            {editingProduct && (
                              <ProductForm
                                isEditing={true}
                                product={editingProduct}
                                onChange={handleEditingProductChange}
                                onAddImage={addImageToEditingProduct}
                                onRemoveImage={removeImageFromEditingProduct}
                              />
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={handleUpdateProduct}>Save Changes</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductsPage

