"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";

const initialOrders = []; 

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search orders..." />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={statusColors[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                    </DialogHeader>
                    <Card>
                      <CardHeader><CardTitle>Customer Info</CardTitle></CardHeader>
                      <CardContent>
                        <p>{selectedOrder?.customer}</p>
                        <p>{selectedOrder?.email}</p>
                      </CardContent>
                    </Card>
                    <DialogFooter>
                      <DialogClose>Close</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
