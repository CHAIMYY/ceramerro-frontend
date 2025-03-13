import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artisanal Ceramics",
  description: "Discover unique handcrafted ceramic pieces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <AuthProvider>
        <ProductProvider>
          <CartProvider> */}
            <LanguageProvider>
              <CurrencyProvider>
                <body
                  className={`${inter.className} bg-cream min-h-screen flex flex-col`}
                >
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </body>
              </CurrencyProvider>
            </LanguageProvider>
          {/* </CartProvider>
        </ProductProvider>
      </AuthProvider> */}
    </html>
  );
}

// const [isDashboard, setIsDashboard] = useState(false);

// useEffect(() => {
//   const path = window.location.pathname;
//   setIsDashboard(path.startsWith("/admin") || path.startsWith("/seller"));
// }, []);
