"use client";

import Link from "next/link";
import { Home, ArrowLeftCircle } from "lucide-react";

const  NotFound=()=> {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
    
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow"
        >
          <Home size={20} />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 shadow"
        >
          <ArrowLeftCircle size={20} />
          Go Back
        </button>
      </div>
    </main>
  );
};
export default NotFound;