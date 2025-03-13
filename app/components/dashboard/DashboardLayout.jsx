"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Box, Home, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Users } from "lucide-react"

export default function DashboardLayout({ children, role }) {
  const adminNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Box, label: "Categories", href: "/admin/categories" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  const sellerNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/seller" },
    { icon: Package, label: "My Products", href: "/seller/products" },
    { icon: ShoppingCart, label: "Orders", href: "/seller/orders" },
    { icon: BarChart3, label: "Analytics", href: "/seller/analytics" },
    { icon: Settings, label: "Settings", href: "/seller/settings" },
  ]

  const navItems = role === "admin" ? adminNavItems : sellerNavItems

  return (
    <div className="min-h-screen bg-pearl">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-plum text-pearl">
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6" />
              <span className="font-bold text-xl">{role === "admin" ? "Admin" : "Seller"} Panel</span>
            </Link>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-orchid/20 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-orchid/20">
            <Button variant="ghost" className="w-full flex items-center space-x-2 text-pearl hover:text-orchid">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-pearl">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
