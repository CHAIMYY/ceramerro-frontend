"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  DollarSign,
  User,
  Star
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalActiveProducts: 0,
    totalFeaturedProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   router.push('/login');
        //   return;
        // }

        // Fetch seller statistics
        const response = await axios.get('http://localhost:3001/api/artisan/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.data) {
          throw new Error("Invalid response format");
        }

        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (err.response?.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Please log in to access the seller dashboard",
            variant: "destructive",
          });
          router.push('/login');
          return;
        }
        setError("Failed to load dashboard data. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, toast]);

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto"></div>
          <p className="mt-4 text-white/70">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-dark-800">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-accent-green text-dark-900 rounded-lg hover:bg-accent-green/90 transition-colors"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
        <p className="text-white/70 mt-2">Overview of your store performance and recent activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-dark-800 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-sm text-white/70">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-800 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Products</CardTitle>
            <Package className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalActiveProducts}</div>
            <p className="text-sm text-white/70">Out of {stats.totalProducts} total</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-800 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Featured Items</CardTitle>
            <Star className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalFeaturedProducts}</div>
            <p className="text-sm text-white/70">Highlighted products</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-800 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalOrders}</div>
            <p className="text-sm text-white/70">Total orders received</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-dark-800 border-0">
          <CardHeader>
            <CardTitle className="text-white">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-accent-green/10 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-accent-green" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-white">
                        Order #{order._id.slice(-8)}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white/70">
                          {formatDate(order.createdAt)}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="font-medium text-accent-green">
                      {formatCurrency(order.total)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/70 text-center py-6">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-800 border-0">
          <CardHeader>
            <CardTitle className="text-white">Product Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Average Order Value</span>
                <span className="text-sm font-medium text-white">
                  {formatCurrency(stats.totalRevenue / (stats.totalOrders || 1))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Featured Product Rate</span>
                <span className="text-sm font-medium text-white">
                  {((stats.totalFeaturedProducts / stats.totalProducts) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Active Product Rate</span>
                <span className="text-sm font-medium text-white">
                  {((stats.totalActiveProducts / stats.totalProducts) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}