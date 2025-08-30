'use client'
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`); // 👉 replace with API call
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand + Newsletter */}
        <div>
          <h2 className="text-2xl font-bold text-white">Shopora</h2>
          <p className="mt-3 text-sm">
            Your one-stop shop for the best deals. Trendy products, fast delivery, and secure checkout.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Mobile</a></li>
            <li><a href="#" className="hover:text-white">TV</a></li>
            <li><a href="#" className="hover:text-white">Laptop</a></li>
            <li><a href="#" className="hover:text-white">Accessories</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" className="flex items-center gap-2 hover:text-white">
              <Facebook className="w-5 h-5" /> Facebook
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white">
              <Instagram className="w-5 h-5" /> Instagram
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white">
              <Twitter className="w-5 h-5" /> Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm">
        © {new Date().getFullYear()} Shopora. All rights reserved.
      </div>
    </footer>
  );
}