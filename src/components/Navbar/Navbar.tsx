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
} from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/feature/hook";
import { logout } from "@/redux/feature/auth/authSlice";
import { RootState } from "@/redux/feature/store";

interface NavLinkProps {
  icon: ReactNode;
  text: string;
  href: string;
  onClick?: () => void;
}


function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  useEffect(() => setMounted(true), []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-2xl md:text-3xl font-extrabold tracking-wide hover:opacity-90 transition"
        >
          Shopora
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            icon={<Home className="w-5 h-5 mr-1" />}
            text="Home"
            href="/"
          />
          <NavLink
            href="/order"
            onClick={() => {}}
            icon={
              <div className="relative">
                <ShoppingBag className="w-5 h-5 mr-1" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            }
            text="Shop"
          />

          <NavLink
            icon={<Info className="w-5 h-5 mr-1" />}
            text="About"
            href="/about"
          />
          {user && (
            <NavLink
              icon={<LayoutDashboard className="w-5 h-5 mr-1" />}
              text="Dashboard"
              href="/dashboard"
            />
          )}

          <NavLink
            icon={
              mounted ? (
                user ? (
                  <LogOut className="w-5 h-5 mr-1" />
                ) : (
                  <User className="w-5 h-5 mr-1" />
                )
              ) : (
                <User className="w-5 h-5 mr-1" />
              ) // placeholder for SSR
            }
            text={mounted ? (user ? "Logout" : "Login") : "Login"}
            href={mounted ? (user ? "#" : "/login") : "/login"}
            onClick={mounted && user ? handleLogout : undefined}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-blue-700 to-indigo-900 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-10 z-40`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X size={28} />
        </button>

        <MobileNavLink
          icon={<Home className="w-6 h-6 mr-2" />}
          text="Home"
          href="/"
          onClick={toggleMenu}
        />
        <MobileNavLink
          href="/shop"
          onClick={toggleMenu}
          icon={
            <div className="relative">
              <ShoppingBag className="w-6 h-6 mr-2" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          }
          text="Shop"
        />

        <MobileNavLink
          icon={<Info className="w-6 h-6 mr-2" />}
          text="About"
          href="/about"
          onClick={toggleMenu}
        />
        {user && (
          <MobileNavLink
            icon={<LayoutDashboard className="w-6 h-6 mr-2" />}
            text="Dashboard"
            href="/dashboard"
            onClick={toggleMenu}
          />
        )}
        <MobileNavLink
          icon={
            mounted ? (
              user ? (
                <LogOut className="w-5 h-5 mr-1" />
              ) : (
                <User className="w-5 h-5 mr-1" />
              )
            ) : (
              <User className="w-5 h-5 mr-1" />
            ) // placeholder for SSR
          }
          text={mounted ? (user ? "Logout" : "Login") : "Login"}
          href={mounted ? (user ? "#" : "/login") : "/login"}
          onClick={mounted && user ? handleLogout : undefined}
        />
      </div>
    </nav>
  );
}

function NavLink({ icon, text, href, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white text-lg font-medium hover:text-blue-200 transition flex items-center relative group"
    >
      {icon}
      <span>{text}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

function MobileNavLink({ icon, text, href, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white text-2xl font-semibold flex items-center px-6 py-3 rounded-lg hover:bg-white/10 transition"
    >
      {icon}
      {text}
    </Link>
  );
}


export default Navbar;
