"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const routes = [
    {
      name: "Dashboard",
      path: "/seller",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      path: "/seller/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Home",
      path: "/shop",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full"
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold">Seller Dashboard</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === route.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {route.icon}
                <span className="ml-3">{route.name}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            {/* <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Theme</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div> */}
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
