"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Edit, Trash, Search, Plus, Eye, Heart } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/admin/blog");
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/admin/blog", newPost);
      setIsCreateDialogOpen(false);
      setNewPost({
        titre: "",
        contenu: "",
        postPicture: "",
        slug: "",
      });
      // Fetch posts again to update the state
      await fetchPosts();
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
      await axios.put(
        `http://localhost:3001/api/admin/blog/${currentPost._id}`,
        currentPost,
      );
      setIsEditDialogOpen(false);
      // Fetch posts again to update the state
      await fetchPosts();
    } catch (error) {
      console.error("Failed to update blog post:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/admin/blog/${currentPost._id}`,
      );
      setIsDeleteDialogOpen(false);
      // Fetch posts again to update the state
      await fetchPosts();
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
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
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
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No blog posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell className="font-medium">
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
                        <Badge variant="outline">No Image</Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {post.slug}
                    </TableCell>
                    <TableCell>
                      {new Date(
                        post.datePublication || post.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-rose-500" />
                        {post.likes}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
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
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(post)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="titre">Title</label>
                <Input
                  id="titre"
                  name="titre"
                  value={newPost.titre}
                  onChange={(e) => handleInputChange(e, "new")}
                  onBlur={(e) => generateSlug(e.target.value, "new")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="slug">Slug</label>
                <Input
                  id="slug"
                  name="slug"
                  value={newPost.slug}
                  onChange={(e) => handleInputChange(e, "new")}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The slug is automatically generated from the title, but you
                  can edit it.
                </p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="postPicture">Image URL</label>
                <Input
                  id="postPicture"
                  name="postPicture"
                  value={newPost.postPicture}
                  onChange={(e) => handleInputChange(e, "new")}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contenu">Content</label>
                <Textarea
                  id="contenu"
                  name="contenu"
                  rows={10}
                  value={newPost.contenu}
                  onChange={(e) => handleInputChange(e, "new")}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePost}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-titre">Title</label>
                <Input
                  id="edit-titre"
                  name="titre"
                  value={currentPost?.titre || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  onBlur={(e) => generateSlug(e.target.value, "edit")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-slug">Slug</label>
                <Input
                  id="edit-slug"
                  name="slug"
                  value={currentPost?.slug || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-postPicture">Image URL</label>
                <Input
                  id="edit-postPicture"
                  name="postPicture"
                  value={currentPost?.postPicture || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
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
                <label htmlFor="edit-contenu">Content</label>
                <Textarea
                  id="edit-contenu"
                  name="contenu"
                  rows={10}
                  value={currentPost?.contenu || ""}
                  onChange={(e) => handleInputChange(e, "edit")}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Post</Button>
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
              blog post from the database.
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
