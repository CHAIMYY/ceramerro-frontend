import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white/70 py-16 border-t border-dark-700">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-display text-white mb-6">
              Ceramic Studio
            </h3>
            <p className="mb-6">
              Handcrafted ceramic pieces that blend traditional craftsmanship
              with contemporary design.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/50 hover:text-accent-green transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-accent-green transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-accent-green transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-wider mb-6">EXPLORE</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-wider mb-6">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Product Care
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent-green transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-wider mb-6">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent-green flex-shrink-0" />
                <span>123 Ceramic Lane, Design District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent-green flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent-green flex-shrink-0" />
                <span>info@ceramicstudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; 2025 Ceramic Studio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="hover:text-accent-green transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent-green transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
