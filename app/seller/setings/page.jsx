"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

export default function SettingsPage() {
  const [artisan, setArtisan] = useState({
    name: "Maria Rodriguez",
    specialty: "Handcrafted Ceramics",
    bio: "I've been creating pottery for over 15 years, specializing in functional pieces with unique glazes. My work is inspired by natural landscapes and traditional techniques from my hometown.",
    location: "Portland, Oregon",
    image: "/placeholder.svg?height=200&width=200",
    gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    category: "pottery",
    featured: true,
    socialMedia: {
      instagram: "@mariaceramics",
      website: "www.mariaceramics.com",
      facebook: "mariaceramics",
      twitter: "@maria_ceramics",
    },
    process: [
      {
        title: "Clay Selection",
        description: "I carefully select locally sourced clay that's perfect for functional pieces.",
      },
      {
        title: "Wheel Throwing",
        description: "Each piece is hand-thrown on my pottery wheel, ensuring unique characteristics.",
      },
    ],
  })

  const [newProcess, setNewProcess] = useState({
    title: "",
    description: "",
  })

  const handleChange = (field, value) => {
    setArtisan({
      ...artisan,
      [field]: value,
    })
  }

  const handleSocialMediaChange = (platform, value) => {
    setArtisan({
      ...artisan,
      socialMedia: {
        ...artisan.socialMedia,
        [platform]: value,
      },
    })
  }

  const addProcess = () => {
    if (newProcess.title && newProcess.description) {
      setArtisan({
        ...artisan,
        process: [...artisan.process, { ...newProcess }],
      })
      setNewProcess({ title: "", description: "" })
    }
  }

  const removeProcess = (index) => {
    const updatedProcess = [...artisan.process]
    updatedProcess.splice(index, 1)
    setArtisan({
      ...artisan,
      process: updatedProcess,
    })
  }

  const removeGalleryImage = (index) => {
    const updatedGallery = [...artisan.gallery]
    updatedGallery.splice(index, 1)
    setArtisan({
      ...artisan,
      gallery: updatedGallery,
    })
  }

  const addGalleryImage = () => {
    // In a real app, this would upload an image
    setArtisan({
      ...artisan,
      gallery: [...artisan.gallery, "/placeholder.svg?height=100&width=100"],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    console.log("Saving profile:", artisan)
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Artisan Profile</h1>
        <p className="text-muted-foreground">Update your artisan profile information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your personal and business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={artisan.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    value={artisan.specialty}
                    onChange={(e) => handleChange("specialty", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={artisan.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={artisan.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  required
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground text-right">{artisan.bio.length}/1000 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={artisan.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="sculpture">Sculpture</SelectItem>
                    <SelectItem value="tableware">Tableware</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={artisan.featured}
                  onCheckedChange={(checked) => handleChange("featured", checked)}
                />
                <Label htmlFor="featured">Featured Artisan</Label>
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
              <CardDescription>Upload your main profile image</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-2 border-border">
                  <Image src={artisan.image || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                </div>
                <Button type="button" variant="outline" className="w-full max-w-xs">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Profile Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Showcase your work with multiple images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {artisan.gallery.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-md overflow-hidden border border-border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="aspect-square flex items-center justify-center border-2 border-dashed border-border rounded-md hover:border-primary transition-colors"
                  >
                    <PlusCircle className="h-8 w-8 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add images of your work to showcase your craftsmanship. Recommended size: 800x800px.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={artisan.socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={artisan.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={artisan.socialMedia.facebook}
                    onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                    placeholder="username or page name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={artisan.socialMedia.website}
                    onChange={(e) => handleSocialMediaChange("website", e.target.value)}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process */}
          <Card>
            <CardHeader>
              <CardTitle>Creation Process</CardTitle>
              <CardDescription>Share your creative process with customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {artisan.process.map((step, index) => (
                <div key={index} className="p-4 border rounded-md relative group">
                  <button
                    type="button"
                    onClick={() => removeProcess(index)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-2">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}

              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Add New Process Step</h3>
                <div className="space-y-2">
                  <Label htmlFor="process-title">Step Title</Label>
                  <Input
                    id="process-title"
                    value={newProcess.title}
                    onChange={(e) => setNewProcess({ ...newProcess, title: e.target.value })}
                    placeholder="e.g., Clay Preparation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="process-description">Step Description</Label>
                  <Textarea
                    id="process-description"
                    value={newProcess.description}
                    onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                    placeholder="Describe this step of your creation process..."
                    rows={2}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addProcess}
                  disabled={!newProcess.title || !newProcess.description}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

