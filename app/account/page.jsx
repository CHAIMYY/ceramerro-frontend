"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Package, ShoppingBag, User } from "lucide-react"

export default function Account() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    zipCode: "12345",
    phone: "555-123-4567",
  })

  const [orderHistory] = useState([
    {
      id: "ORD-2024-0042",
      date: "February 15, 2025",
      total: "$129.99",
      status: "Delivered",
      items: 3
    },
    {
      id: "ORD-2024-0038",
      date: "January 28, 2025",
      total: "$79.50",
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD-2024-0029",
      date: "January 12, 2025",
      total: "$214.75",
      status: "Delivered",
      items: 4
    }
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    console.log("User data updated:", user)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/api/placeholder/100/100" alt={user.name} />
          <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">Member since January 2023</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Address</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={user.phone} onChange={handleInputChange} />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="profile-form">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Update your shipping and billing address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="address-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" name="address" value={user.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={user.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" name="zipCode" value={user.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={user.country} onChange={handleInputChange} />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="address-form">Update Address</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your recent purchases and track deliveries.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">You haven't placed any orders yet.</p>
                ) : (
                  orderHistory.map((order) => (
                    <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Package size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            <span>{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{order.total}</div>
                          <div className="text-sm text-gray-500">{order.items} items</div>
                        </div>
                        <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                          {order.status}
                        </Badge>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Orders</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}