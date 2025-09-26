'use client'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-gray-300 mt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/10 rounded-full blur-md"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand + Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white">Shopora</h2>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your one-stop destination for the best deals on premium products. We bring you quality, style, and savings all in one place.
              </p>

              {/* Newsletter Subscription */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Stay Updated</h3>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubscribed}
                    className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubscribed
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {isSubscribed ? (
                      <>
                        <Heart className="w-5 h-5 fill-white" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Subscribe
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Shop", href: "/shop" },
                  { name: "Flash Sales", href: "/flash-sales" },
                  { name: "Popular Products", href: "/popular" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" }
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
              <ul className="space-y-3">
                {[
                  { name: "Smartphones", href: "/category/smartphones" },
                  { name: "Laptops", href: "/category/laptops" },
                  { name: "TVs & Electronics", href: "/category/electronics" },
                  { name: "Fashion", href: "/category/fashion" },
                  { name: "Home & Garden", href: "/category/home" },
                  { name: "Sports & Outdoors", href: "/category/sports" }
                ].map((category, index) => (
                  <motion.li
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    <Link 
                      href={category.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block"
                    >
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+880 123 456 789</p>
                    <p className="text-gray-400 text-sm">24/7 Customer Support</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">support@shopora.com</p>
                    <p className="text-gray-400 text-sm">We reply within 24hrs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Dhaka, Bangladesh</p>
                    <p className="text-gray-400 text-sm">Nationwide delivery</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, color: "hover:bg-blue-600", href: "#" },
                    { icon: Instagram, color: "hover:bg-pink-600", href: "#" },
                    { icon: Twitter, color: "hover:bg-sky-600", href: "#" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400">
                  © {currentYear} <span className="text-white font-semibold">Shopora</span>. All rights reserved.
                </p>
                <p className="text-sm text-gray-500">
                  Made with <Heart className="w-4 h-4 text-red-500 inline fill-red-500" /> in Bangladesh
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
      </div>
    </footer>
  );
}