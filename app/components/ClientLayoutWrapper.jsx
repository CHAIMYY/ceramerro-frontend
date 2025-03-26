"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Check if the current path should hide header and footer
  const hideHeaderFooter =
    pathname?.startsWith("/admin") || pathname?.startsWith("/seller");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
