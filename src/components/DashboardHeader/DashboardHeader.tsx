'use client';
import { Bell, MessageSquare, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardHeader = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  // Initialize theme after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 🚀 Avoid mismatch: don’t render until theme is loaded
  if (!theme) return null;

  return (
    <main className="overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-sm w-64 transition-all duration-200"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="h-8 w-8 rounded-full object-cover border-2 border-indigo-400 dark:border-indigo-600"
              src="https://placehold.co/32x32/6366F1/FFFFFF?text=JD"
              alt="User Avatar"
            />
            <span className="hidden sm:block">John Doe</span>
          </div>
        </div>
      </header>
    </main>
  );
};

export default DashboardHeader;
