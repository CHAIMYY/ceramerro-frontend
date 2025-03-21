"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { toast } from "@/components/ui/use-toast" // Assuming you have toast component from shadcn/ui

// API service for profile-related operations
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/artisan';

// Set auth token for requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/updateProfile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error;
  }
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artisan, setArtisan] = useState({
    firstname: "",
    lastname: "",
    specialty: "",
    bio: "",
    location: "",
    image: "/placeholder.svg?height=200&width=200",
    gallery: [],
    category: "",
    featured: false,
    socialMedia: {
      instagram: "",
      website: "",
      facebook: "",
      twitter: "",
    },
    process: []
  });
  
  const [newProcess, setNewProcess] = useState({
    title: "",
    description: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }
        
        // Set token in axios headers
        setAuthToken(token);
        
        // Fetch profile data
        const data = await getProfile();
        
        if (data.user) {
          // Transform backend data model to frontend model if needed
          const profileData = {
            firstname: data.user.firstname || "",
            lastname: data.user.lastname || "",
            name: `${data.user.firstname || ""} ${data.user.lastname || ""}`.trim(),
            specialty: data.user.specialty || "",
            bio: data.user.bio || "",
            location: data.user.location || "",
            image: data.user.image || "/placeholder.svg?height=200&width=200",
            gallery: data.user.gallery || [],
            category: data.user.category || "",
            featured: data.user.featured || false,
            socialMedia: {
              instagram: data.user.socialMedia?.instagram || "",
              website: data.user.socialMedia?.website || "",
              facebook: data.user.socialMedia?.facebook || "",
              twitter: data.user.socialMedia?.twitter || "",
            },
            process: data.user.process || []
          };
          
          setArtisan(profileData);
        }
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    // Handle name field specially
    if (field === "name") {
      const nameParts = value.split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";
      
      setArtisan({
        ...artisan,
        name: value,
        firstname,
        lastname
      });
    } else {
      setArtisan({
        ...artisan,
        [field]: value,
      });
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setArtisan({
      ...artisan,
      socialMedia: {
        ...artisan.socialMedia,
        [platform]: value,
      },
    });
  };

  const addProcess = () => {
    if (newProcess.title && newProcess.description) {
      setArtisan({
        ...artisan,
        process: [...(artisan.process || []), { ...newProcess }],
      });
      setNewProcess({ title: "", description: "" });
    }
  };

  const removeProcess = (index) => {
    const updatedProcess = [...artisan.process];
    updatedProcess.splice(index, 1);
    setArtisan({
      ...artisan,
      process: updatedProcess,
    });
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = [...artisan.gallery];
    updatedGallery.splice(index, 1);
    setArtisan({
      ...artisan,
      gallery: updatedGallery,
    });
  };

  const addGalleryImage = () => {
    // In a real app, this would upload an image
    setArtisan({
      ...artisan,
      gallery: [...artisan.gallery, "/placeholder.svg?height=100&width=100"],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare data for API
      const profileData = {
        firstname: artisan.firstname,
        lastname: artisan.lastname,
        email: artisan.email, // If your form collects email
        bio: artisan.bio,
        location: artisan.location,
        specialty: artisan.specialty,
        category: artisan.category,
        featured: artisan.featured,
        socialMedia: artisan.socialMedia,
        image: artisan.image,
        gallery: artisan.gallery,
        process: artisan.process
      };
      
      // Send data to API
      const result = await updateProfile(profileData);
      
      // Show success message
      if (typeof toast !== 'undefined') {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
          duration: 3000
        });
      } else {
        alert("Profile updated successfully!");
      }
      
      console.log("Profile updated:", result);
    } catch (err) {
      console.error("Error updating profile:", err);
      
      // Show error message
      if (typeof toast !== 'undefined') {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
          duration: 3000
        });
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !artisan.name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !artisan.name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
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
                  {artisan.gallery && artisan.gallery.map((image, index) => (
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
                    value={artisan.socialMedia?.instagram || ""}
                    onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={artisan.socialMedia?.twitter || ""}
                    onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={artisan.socialMedia?.facebook || ""}
                    onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                    placeholder="username or page name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={artisan.socialMedia?.website || ""}
                    onChange={(e) => handleSocialMediaChange("website", e.target.value)}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}