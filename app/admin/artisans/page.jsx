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
import { Search, Ban, CheckCircle, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/admin/users?role=artisan",
      );
      setArtisans(response.data);
    } catch (error) {
      console.error("Failed to fetch artisans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (artisan, action) => {
    setSelectedArtisan(artisan);
    setActionType(action);
    setIsConfirmDialogOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      const endpoint =
        actionType === "ban"
          ? `http://localhost:3001/api/admin/users/${selectedArtisan._id}/ban`
          : `http://localhost:3001/api/admin/users/${selectedArtisan._id}/unban`;

      await axios.put(endpoint);

      // Update the local state
      setArtisans(
        artisans.map((a) => {
          if (a._id === selectedArtisan._id) {
            return { ...a, isBanned: actionType === "ban" };
          }
          return a;
        }),
      );

      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error(`Failed to ${actionType} artisan:`, error);
    }
  };

  const filteredArtisans = artisans.filter(
    (artisan) =>
      artisan.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.specialty?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artisans Management</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artisans..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading artisans...</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artisan</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtisans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No artisans found
                  </TableCell>
                </TableRow>
              ) : (
                filteredArtisans.map((artisan) => (
                  <TableRow key={artisan._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {artisan.image ? (
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={artisan.image || "/placeholder.svg"}
                              alt={`${artisan.firstname} ${artisan.lastname}`}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {artisan.firstname?.[0]}
                              {artisan.lastname?.[0]}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {artisan.firstname} {artisan.lastname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {artisan.category || "No category"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{artisan.email}</TableCell>
                    <TableCell>{artisan.specialty || "N/A"}</TableCell>
                    <TableCell>{artisan.location || "N/A"}</TableCell>
                    <TableCell>
                      {artisan.isBanned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {artisan.featured ? (
                        <Badge variant="secondary">Featured</Badge>
                      ) : (
                        <Badge variant="outline">Regular</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {artisan.isBanned ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(artisan, "unban")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Unban
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(artisan, "ban")}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Ban
                          </Button>
                        )}
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={`/artisans/${artisan._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
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

      {/* Confirmation Dialog */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "ban" ? "Ban Artisan" : "Unban Artisan"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "ban"
                ? "This will prevent the artisan from logging in and using the platform. Are you sure?"
                : "This will allow the artisan to access the platform again. Continue?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {actionType === "ban" ? "Ban" : "Unban"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
