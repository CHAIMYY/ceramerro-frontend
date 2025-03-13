import { Card } from "@/components/ui/card"
import DashboardLayout from "../app/components/dashboard/DashboardLayout"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { name: "Jan", sales: 1200, orders: 800 },
  { name: "Feb", sales: 1900, orders: 1000 },
  { name: "Mar", sales: 1500, orders: 900 },
  { name: "Apr", sales: 1700, orders: 1100 },
  { name: "May", sales: 2000, orders: 1300 },
  { name: "Jun", sales: 2400, orders: 1500 },
]

const recentOrders = [
  { id: "1", product: "Ceramic Vase", customer: "John Doe", status: "Pending", amount: "$120" },
  { id: "2", product: "Clay Pot", customer: "Jane Smith", status: "Shipped", amount: "$85" },
  { id: "3", product: "Tea Set", customer: "Bob Johnson", status: "Delivered", amount: "$250" },
]

export default function SellerDashboard() {
  return (
    <DashboardLayout role="seller">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">My Products</h3>
            <p className="text-3xl font-bold text-orchid">45</p>
            <p className="text-sm text-plum/60">2 new this month</p>
          </Card>
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold text-orchid">$3,456</p>
            <p className="text-sm text-plum/60">+8% from last month</p>
          </Card>
          <Card className="p-6 bg-lavender hover:shadow-lg transition-shadow">
            <h3 className="text-plum font-semibold">Active Orders</h3>
            <p className="text-3xl font-bold text-orchid">12</p>
            <p className="text-sm text-plum/60">4 need shipping</p>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-plum">Sales Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4B164C" />
              <Line type="monotone" dataKey="orders" stroke="#DD88CF" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-plum">Recent Orders</h3>
            <Button variant="outline" className="text-plum hover:text-orchid">
              View All Orders
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  )
}

