import "./globals.css";
import { Inter } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import ClientLayout from "./components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artisanal Ceramics",
  description: "Discover unique handcrafted ceramic pieces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <CurrencyProvider>
          <body
            className={`${inter.className} bg-cream min-h-screen flex flex-col`}
          >
            <ClientLayout>{children}</ClientLayout>
          </body>
        </CurrencyProvider>
      </LanguageProvider>
    </html>
  );
}
