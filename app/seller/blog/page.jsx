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
import { Edit, Trash, Search, Plus, Eye } from "lucide-react";
import Image from "next/image";

export default function SellerBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newPost, setNewPost] = useState({
    titre: "",
    contenu: "",
    postPicture: "",
    slug: "",
  });

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth token to every request
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/seller/blog");
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/blog/create", newPost);
      setPosts([response.data, ...posts]);
      setIsCreateDialogOpen(false);
      setNewPost({
        titre: "",
        contenu: "",
        postPicture: "",
        slug: "",
      });
    } catch (error) {
      console.error("Failed to create blog post:", error);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (post) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/blog/${currentPost._id}`, currentPost);
      setPosts(
        posts.map((post) =>
          post._id === currentPost._id ? response.data : post,
        ),
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update blog post:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/blog/${currentPost._id}`);
      setPosts(posts.filter((post) => post._id !== currentPost._id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "new") {
      setNewPost({
        ...newPost,
        [name]: value,
      });
    } else {
      setCurrentPost({
        ...currentPost,
        [name]: value,
      });
    }
  };

  // Generate slug from title
  const generateSlug = (title, formType) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    if (formType === "new") {
      setNewPost({
        ...newPost,
        slug,
      });
    } else {
      setCurrentPost({
        ...currentPost,
        slug,
      });
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.contenu?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">My Blog Posts</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search posts..."
              className="pl-8 bg-dark-800 border-dark-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-accent-green text-dark-900 hover:bg-accent-green/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading blog posts...</p>
        </div>
      ) : (
        <div className="border border-dark-700 rounded-md">
          <Table>
            <TableHeader className="bg-dark-800">
              <TableRow className="border-dark-700 hover:bg-dark-700">
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Image</TableHead>
                <TableHead className="text-white">Slug</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Likes</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow className="border-dark-700 hover:bg-dark-700">
                  <TableCell colSpan={6} className="text-center text-white/60">
                    No blog posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow
                    key={post._id}
                    className="border-dark-700 hover:bg-dark-700"
                  >
                    <TableCell className="font-medium text-white">
                      <div className="max-w-xs truncate">{post.titre}</div>
                    </TableCell>
                    <TableCell>
                      {post.postPicture ? (
                        <div className="h-10 w-16 relative rounded overflow-hidden">
                          <Image
                            src={post.postPicture || "/placeholder.svg"}
                            alt={post.titre}
                            width={64}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-dark-600 text-white/60"
                        >
                          No Image
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-white/70 max-w-xs truncate">
                      {post.slug}
                    </TableCell>
                    <TableCell className="text-white/70">
                      {new Date(
                        post.datePublication || post.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-white/70">
                      {post.likes || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-dark-700 text-white hover:bg-dark-700"
                        >
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(post)}
                          className="border-dark-700 text-white hover:bg-dark-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(post)}
                          className="border-dark-700 text-white hover:bg-dark-700"
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

      {/* Create Post Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-dark-800 text-white border-dark-700 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="titre" className="text-white/70">
                  Title
                </label>
                <Input
                  id="titre"
                  name="titre"
                  value={newPost.titre}
                  onChange={(e) => handleInputChange(e, "new")}
                  onBlur={(e) => generateSlug(e.target.value, "new")}
                  className="bg-dark-700 border-dark-600 text-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="slug" className="text-white/70">
                  Slug
                </label>
                <Input
                  id="slug"
                  name="slug"
                  value={newPost.slug}
                  onChange={(e) => handleInputChange(e, "new")}
                  className="bg-dark-700 border-dark-600 text-white"
                  required
                />
                <p className="text-xs text-white/50">
                  The slug is automatically generated from the title, but you
                  can edit it.
                </p>
              </div>

              <div className="grid gap-2">
                <label htmlFor="postPicture" className="text-white/70">
                  Image URL
                </label>
                <Input
                  id="postPicture"
                  name="postPicture"
                  value={newPost.postPicture}
                  onChange={(e) => handleInputChange(e, "new")}
                  className="bg-dark-700 border-dark-600 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="contenu" className="text-white/70">
                  Content
                </label>
                <textarea
                  id="contenu"
                  name="contenu"
                  rows={10}
                  value={newPost.contenu}
                  onChange={(e) => handleInputChange(e, "new")}
                  className="bg-dark-700 border-dark-600 text-white rounded-md p-2"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-dark-600 text-white hover:bg-dark-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent-green text-dark-900 hover:bg-accent-green/90"
              >
                Create Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-800 text-white border-dark-700 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePost}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-titre" className="text-white/70">
                  Title
                </label>
                <Input
                  id="edit-titre"
                  name="titre"
                  value={currentPost?.titre || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  onBlur={(e) => generateSlug(e.target.value, "edit")}
                  className="bg-dark-700 border-dark-600 text-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-slug" className="text-white/70">
                  Slug
                </label>
                <Input
                  id="edit-slug"
                  name="slug"
                  value={currentPost?.slug || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  className="bg-dark-700 border-dark-600 text-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-postPicture" className="text-white/70">
                  Image URL
                </label>
                <Input
                  id="edit-postPicture"
                  name="postPicture"
                  value={currentPost?.postPicture || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  className="bg-dark-700 border-dark-600 text-white"
                  placeholder="https://example.com/image.jpg"
                />
                {currentPost?.postPicture && (
                  <div className="mt-2 h-32 w-full relative rounded overflow-hidden">
                    <Image
                      src={currentPost.postPicture || "/placeholder.svg"}
                      alt={currentPost.titre}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-contenu" className="text-white/70">
                  Content
                </label>
                <textarea
                  id="edit-contenu"
                  name="contenu"
                  rows={10}
                  value={currentPost?.contenu || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  className="bg-dark-700 border-dark-600 text-white rounded-md p-2"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-dark-600 text-white hover:bg-dark-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent-green text-dark-900 hover:bg-accent-green/90"
              >
                Update Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-dark-800 text-white border-dark-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete the
              blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-dark-700 text-white border-dark-600 hover:bg-dark-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
