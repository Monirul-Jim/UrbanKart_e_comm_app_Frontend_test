"use client";
import React, { useState, ReactNode, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Info,
  User,
  LogOut,
  LayoutDashboard,
  Search,
  Heart,
  Bell,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/feature/hook";
import { logout } from "@/redux/feature/auth/authSlice";
import { RootState } from "@/redux/feature/store";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  icon: ReactNode;
  text: string;
  href: string;
  onClick?: () => void;
  badge?: number;
}

function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  
  useEffect(() => setMounted(true), []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };
  if (!mounted) return null;
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`p-2 rounded-xl ${
                  isScrolled
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className={`text-2xl md:text-3xl font-black tracking-wide transition-colors duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                  : 'text-white'
              }`}>
                Shopora
              </span>
            </Link>


            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink
                icon={<Home className="w-5 h-5" />}
                text="Home"
                href="/"
                isScrolled={isScrolled}
              />
              
              <NavLink
                href="/order"
                onClick={() => {}}
                icon={<ShoppingBag className="w-5 h-5" />}
                text="Shop"
                badge={cartItems.length}
                isScrolled={isScrolled}
              />

            

              <NavLink
                icon={<Info className="w-5 h-5" />}
                text="About"
                href="/about"
                isScrolled={isScrolled}
              />

              {user && (
                <>
                  
                  <NavLink
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    text="Dashboard"
                    href="/dashboard"
                    isScrolled={isScrolled}
                  />
                </>
              )}

              <NavLink
                icon={
                  mounted ? (
                    user ? (
                      <LogOut className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )
                  ) : (
                    <User className="w-5 h-5" />
                  )
                }
                text={mounted ? (user ? "Logout" : "Login") : "Login"}
                href={mounted ? (user ? "#" : "/login") : "/login"}
                onClick={mounted && user ? handleLogout : undefined}
                isScrolled={isScrolled}
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pt-16">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white">Shopora</span>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

               

                {/* Navigation Links */}
                <div className="flex-1 space-y-2">
                  <MobileNavLink
                    icon={<Home className="w-6 h-6" />}
                    text="Home"
                    href="/"
                    onClick={toggleMenu}
                  />
                  <MobileNavLink
                    href="/shop"
                    onClick={toggleMenu}
                    icon={<ShoppingBag className="w-6 h-6" />}
                    text="Shop"
                    badge={cartItems.length}
                  />
                
                  <MobileNavLink
                    icon={<Info className="w-6 h-6" />}
                    text="About"
                    href="/about"
                    onClick={toggleMenu}
                  />
                  {user && (
                    <>
                      
                      <MobileNavLink
                        icon={<LayoutDashboard className="w-6 h-6" />}
                        text="Dashboard"
                        href="/dashboard"
                        onClick={toggleMenu}
                      />
                    </>
                  )}
                  <MobileNavLink
                    icon={
                      mounted ? (
                        user ? (
                          <LogOut className="w-6 h-6" />
                        ) : (
                          <User className="w-6 h-6" />
                        )
                      ) : (
                        <User className="w-6 h-6" />
                      )
                    }
                    text={mounted ? (user ? "Logout" : "Login") : "Login"}
                    href={mounted ? (user ? "#" : "/login") : "/login"}
                    onClick={mounted && user ? handleLogout : toggleMenu}
                  />
                </div>

                {/* User Info */}
                {user && (
                  <div className="mt-auto pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold">Welcome back!</div>
                        <div className="text-sm text-white/70">Enjoy shopping</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}

function NavLink({ icon, text, href, onClick, badge, isScrolled }: NavLinkProps & { isScrolled?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
          isScrolled
            ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
            : 'text-white hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30'
        }`}
      >
        <div className="relative">
          {icon}
          {badge && badge > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
            >
              {badge > 99 ? '99+' : badge}
            </motion.span>
          )}
        </div>
        {text && <span className="hidden lg:block">{text}</span>}
      </motion.div>
    </Link>
  );
}

function MobileNavLink({ icon, text, href, onClick, badge }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group"
    >
      <motion.div
        whileHover={{ x: 8 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4 px-4 py-4 text-white hover:bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-300"
      >
        <div className="relative">
          {icon}
          {badge && badge > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </div>
        <span className="text-lg font-semibold">{text}</span>
      </motion.div>
    </Link>
  );
}

export default Navbar;