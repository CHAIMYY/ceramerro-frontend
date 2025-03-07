import React from "react"
import { Card } from "@/components/ui/card"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// const data = [
//   { name: "Jan", sales: 4000, orders: 2400 },
//   { name: "Feb", sales: 3000, orders: 1398 },
//   { name: "Mar", sales: 2000, orders: 9800 },
//   { name: "Apr", sales: 2780, orders: 3908 },
//   { name: "May", sales: 1890, orders: 4800 },
//   { name: "Jun", sales: 2390, orders: 3800 },
// ]

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-orchid">1,234</p>
            <p className="text-sm text-plum/60">+12% from last month</p>
          </Card>
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Total Products</h3>
            <p className="text-3xl font-bold text-orchid">567</p>
            <p className="text-sm text-plum/60">+5% from last month</p>
          </Card>
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-orchid">892</p>
            <p className="text-sm text-plum/60">+18% from last month</p>
          </Card>
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold text-orchid">$12,345</p>
            <p className="text-sm text-plum/60">+15% from last month</p>
          </Card>
        </div>

        {/* Charts */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-plum">Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4B164C" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-plum">Orders Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#DD88CF" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div> */}
      </div>
    </DashboardLayout>
  )
}

