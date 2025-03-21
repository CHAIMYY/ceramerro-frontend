"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, FileText, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])

  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 1200 },
    { name: "Feb", sales: 1900 },
    { name: "Mar", sales: 1500 },
    { name: "Apr", sales: 2400 },
    { name: "May", sales: 2700 },
    { name: "Jun", sales: 3000 },
  ]

  const categoryData = [
    { name: "Pottery", value: 35 },
    { name: "Sculpture", value: 25 },
    { name: "Tableware", value: 30 },
    { name: "Other", value: 10 },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Get token from localStorage
        const token = localStorage.getItem("token")
        if (!token) {
          window.location.href = "/login"
          return
        }

        // Fetch statistics
        const statsResponse = await axios.get("http://localhost:3001/api/artisan/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setStats(statsResponse.data.sellerStatistics)

        // Fetch recent orders
        const ordersResponse = await axios.get("http://localhost:3001/api/artisan/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRecentOrders(ordersResponse.data.orders.slice(0, 5)) // Get only 5 most recent

        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
        setLoading(false)

        // Handle unauthorized error
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token")
          window.location.href = "/login"
        }
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Error</h2>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={loading ? null : stats?.totalProducts || 0}
          icon={<Package className="h-5 w-5" />}
          loading={loading}
        />
        <StatCard
          title="Total Orders"
          value={loading ? null : stats?.totalOrders || 0}
          icon={<ShoppingCart className="h-5 w-5" />}
          loading={loading}
        />
        <StatCard
          title="Blog Posts"
          value={loading ? null : stats?.totalPosts || 0}
          icon={<FileText className="h-5 w-5" />}
          loading={loading}
        />
        <StatCard
          title="Revenue"
          value={loading ? null : `$${stats?.totalRevenue?.toFixed(2) || "0.00"}`}
          icon={<TrendingUp className="h-5 w-5" />}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Order ID</th>
                    <th className="text-left py-3 px-2">Customer</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-right py-3 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-3 px-2">{order._id.substring(0, 8)}</td>
                      <td className="py-3 px-2">{order.user?.email || "Unknown"}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">${order.total?.toFixed(2) || "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No recent orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon, loading }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  )
}

