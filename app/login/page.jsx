"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login with:", { email });
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
      );

      if (!response.data?.token) {
        throw new Error("Invalid response from server");
      }

      // Store the token and user type in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType || "artisan");

      // Debug: log the userType to see what's coming from the server
      console.log("User type from server:", response.data.userType);

      // toast({
      //   title: "Login successful",
      //   description: "Welcome back!",
      // });

      // Add a small delay before redirection (sometimes helps with Next.js router)
      setTimeout(() => {
        // Redirect based on user type with explicit string comparison
        if (response.data.userType === "admin") {
          console.log("Redirecting to admin dashboard");
          // router.replace('/admin');
          router.push("/admin");
        } else if (response.data.userType === "client") {
          console.log("Redirecting to shop");
          router.push("/shop");
        } else {
          // Default to artisan/seller
          console.log("Redirecting to seller dashboard");
          router.push("/seller");
        }
      }, 100);
    } catch (err) {
      // Error handling remains the same
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to login. Please check your credentials and try again.";

      setError(errorMessage);
      // toast({
      //   title: "Login failed",
      //   description: errorMessage,
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-plum">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-lavender/50 border-orchid/20"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-lavender/50 border-orchid/20"
                disabled={loading}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-plum text-pearl hover:bg-orchid transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-plum">
            Don't have an account?{" "}
            <Link href="/register" className="text-orchid hover:underline">
              Register here
            </Link>
          </p>
          <Link
            href="/shop"
            className="text-sm text-plum hover:text-orchid transition-colors"
          >
            Continue shopping as guest
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
