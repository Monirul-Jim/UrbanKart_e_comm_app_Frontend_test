"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white rounded-3xl shadow-2xl overflow-hidden mx-4 my-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-md animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-16 gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8 lg:w-1/2"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">New Collection Available</span>
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              Elevate Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                Style Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl leading-relaxed">
              Discover premium collections with <span className="font-semibold text-yellow-300">up to 70% off</span>. 
              Limited-time offers that redefine your wardrobe.
            </p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Explore Collections
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center lg:justify-start gap-8 pt-4"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">500K+</div>
              <div className="text-sm text-purple-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">50K+</div>
              <div className="text-sm text-purple-200">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">4.9★</div>
              <div className="text-sm text-purple-200">Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 flex justify-center relative"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <Image
                width={500}
                height={500}
                src="https://i.ibb.co/9c1KpVg/shopping-banner.png"
                alt="Ecommerce Banner"
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
              />
            </motion.div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-pink-400/30 rounded-full blur-3xl scale-110 -z-10"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Shopping Bag Icon */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 100
        }}
        className="absolute top-8 right-8"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-2xl"
        >
          <ShoppingBag className="text-black w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Sale Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="absolute bottom-8 left-8"
      >
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl transform -rotate-12">
          70% OFF
        </div>
      </motion.div>
    </div>
  );
}