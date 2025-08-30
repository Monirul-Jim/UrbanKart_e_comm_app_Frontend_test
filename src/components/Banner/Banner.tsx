"use client";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white rounded-2xl shadow-lg overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Elevate Your Style <br />
            <span className="text-yellow-300">Shop the Latest Trends</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-lg">
            Discover handpicked collections at unbeatable prices. Limited-time
            offers you won’t want to miss!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-300 transition transform hover:scale-105">
              Shop Now
            </button>
            <button className="px-6 py-3 rounded-xl bg-white/20 border border-white text-white font-semibold hover:bg-white/30 transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center md:justify-end w-full md:w-1/2"
        >
          <img
            src="https://i.ibb.co/9c1KpVg/shopping-banner.png"
            alt="Ecommerce Banner"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Floating Icon */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
        }}
        className="absolute top-6 right-6 bg-yellow-400 p-3 rounded-full shadow-lg"
      >
        <ShoppingBag className="text-gray-900 w-6 h-6" />
      </motion.div>
    </div>
  );
}
