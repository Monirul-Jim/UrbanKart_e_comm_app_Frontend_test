"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart,
  ChevronRight,
  ChevronLeft,
  LogOut,
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  User,
  Boxes,
  Layers,
  ListTree,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { logout } from "@/redux/feature/auth/authSlice";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  current: boolean;
  children?: NavItem[];
}

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<string>("Dashboard");
 const user = useAppSelector((state) => state.auth.user);
const dispatch=useAppDispatch()
// const navigation: NavItem[] = [
//   {
//     name: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//     current: true,
//   },
//   {
//     name: "User Management",
//     icon: User,
//     href: "/dashboard/usermanagement",
//     current: false,
//   },
//   {
//     name: "Product",
//     icon: Boxes,
//     href: "/dashboard/product",
//     current: false,
//     children: [
//       { name: "Category", icon: Layers, href: "/dashboard/categories", current: false },
//       { name: "Sub Category", icon: ListTree, href: "/dashboard/subcategories", current: false },
//       { name: "Product", icon: Package, href: "/dashboard/product", current: false },
//     ],
//   },
//   {
//     name: "Orders",
//     icon: ShoppingCart,
//     href: "/dashboard/orders",
//     current: false,
//     children: [
//       { name: "All Orders", icon: Package, href: "/dashboard/ordertable", current: false },
//       { name: "Pending", icon: Clock, href: "/dashboard/orders/pending", current: false },
//       { name: "Completed", icon: CheckCircle, href: "/dashboard/orders/completed", current: false },
//     ],
//   },
//   { name: "Users", icon: Users, href: "/dashboard/users", current: false },
//   { name: "Analytics", icon: BarChart, href: "/dashboard/analytics", current: false },
//   { name: "Settings", icon: Settings, href: "/dashboard/settings", current: false },
// ];
 // Full menu (for admin)
  const adminNavigation: NavItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      current: true,
    },
    {
      name: "User Management",
      icon: User,
      href: "/dashboard/usermanagement",
      current: false,
    },
    {
      name: "Product",
      icon: Boxes,
      href: "/dashboard/product",
      current: false,
      children: [
        { name: "Category", icon: Layers, href: "/dashboard/categories", current: false },
        { name: "Sub Category", icon: ListTree, href: "/dashboard/subcategories", current: false },
        { name: "Product", icon: Package, href: "/dashboard/product", current: false },
      ],
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      current: false,
      children: [
        { name: "All Orders", icon: Package, href: "/dashboard/ordertable", current: false },
        { name: "Pending", icon: Clock, href: "/dashboard/orders/pending", current: false },
        { name: "Completed", icon: CheckCircle, href: "/dashboard/orders/completed", current: false },
      ],
    },
    { name: "Analytics", icon: BarChart, href: "/dashboard/analytics", current: false },
    { name: "Settings", icon: Settings, href: "/dashboard/settings", current: false },
  ];

  // Limited menu (for normal user)
  const userNavigation: NavItem[] = [
    {
      name: "User Order",
      icon: LayoutDashboard,
      href: "/dashboard/userOrder",
      current: true,
    },
  ];

  // Decide which navigation to use
// Decide which navigation to use
const navigation =
  user?.role === "admin" || user?.role === "super_admin"
    ? adminNavigation
    : userNavigation;



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const handleNavLinkClick = (contentName: string) => {
    setActiveContent(contentName);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <aside
        className={`relative flex flex-col bg-white shadow-xl transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          dark:bg-gray-800 dark:text-gray-100 rounded-r-xl`}
      >
        <div
          className={`relative flex items-center p-4 border-b border-gray-100 dark:border-gray-700
            ${isOpen ? "justify-between" : "justify-center"}`}
        >
          {isOpen && (
            <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              DashFlow
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className={`absolute top-1/2 -translate-y-1/2 rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200
              ${isOpen ? "-right-4" : "right-1/2 translate-x-1/2"}`}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <button
                  onClick={() => isOpen && handleSubmenuToggle(item.name)}
                  className={`group flex items-center w-full rounded-lg py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      activeContent === item.href ||
                      item.children.some(
                        (child) => child.href === activeContent
                      )
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md border-l-4 border-indigo-700 dark:border-indigo-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:scale-[1.02]"
                    }
                    ${isOpen ? "justify-between px-3" : "justify-center"}`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-6 w-6 ${isOpen ? "mr-3" : ""} ${
                        activeContent === item.href ||
                        item.children.some(
                          (child) => child.href === activeContent
                        )
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
                      }`}
                    />
                    {isOpen && <span>{item.name}</span>}
                  </div>
                  {isOpen &&
                    (openSubmenu === item.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ))}
                </button>
              ) : (
                <a
                  href={item.href}
                  className={`group flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      activeContent === item.href
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md border-l-4 border-indigo-700 dark:border-indigo-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:scale-[1.02]"
                    }
                    ${isOpen ? "justify-start px-3" : "justify-center"}`}
                >
                  <item.icon
                    className={`h-6 w-6 ${isOpen ? "mr-3" : ""} ${
                      activeContent === item.href
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
                    }`}
                  />
                  {isOpen && <span>{item.name}</span>}
                </a>
              )}

              {isOpen && item.children && openSubmenu === item.name && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-600 pl-2">
                  {item.children.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      onClick={() => handleNavLinkClick(subItem.href)}
                      className={`group flex items-center rounded-lg py-2 text-sm font-medium transition-colors duration-200
                        ${
                          activeContent === subItem.href
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        }
                        px-3`}
                    >
                      <subItem.icon
                        className={`h-5 w-5 mr-3 ${
                          activeContent === subItem.href
                            ? "text-indigo-600 dark:text-indigo-300"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
                        }`}
                      />
                      <span>{subItem.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div
          className={`p-4 border-t border-gray-100 dark:border-gray-700 ${
            isOpen ? "" : "flex justify-center flex-col items-center"
          }`}
        >
          <div className={`flex items-center ${isOpen ? "" : "flex-col"}`}>
            <img
              className={`h-10 w-10 rounded-full object-cover border-2 border-indigo-400 dark:border-indigo-600 ${
                isOpen ? "mr-3" : ""
              }`}
              src="https://placehold.co/40x40/6366F1/FFFFFF?text=JD"
              alt="User Avatar"
            />
            {isOpen && (
              <div>
                <div className="text-base font-semibold">{user?.firstName} {user?.lastName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </div>
              </div>
            )}
          </div>
          <button
           onClick={handleLogout}
            className={`mt-4 flex items-center w-full rounded-lg py-2.5 text-sm font-medium transition-colors duration-200
              ${isOpen ? "px-3 justify-start" : "justify-center"}
              text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:scale-[1.02]'`}
          >
            <LogOut
              className={`h-5 w-5 ${
                isOpen ? "mr-3" : ""
              } text-gray-500 dark:text-gray-400`}
            />
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
