"use client";
import { useGetFlashSaleProductsQuery } from "@/redux/api/productApi";
import { addToCart } from "@/redux/feature/auth/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Flame, ShoppingCart, Zap, CheckCircle } from "lucide-react";

type ProductType = {
  _id: string;
  title: string;
  price: number;
  flashSalePrice: number;
  flashSaleStart: string;
  flashSaleEnd: string;
  image: string;
};

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

// Enhanced Countdown hook
const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Check if less than 1 hour remaining
        setIsUrgent(distance < 3600000);
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return { timeLeft, isUrgent };
};

// Enhanced Flash Sale Card
const FlashSaleCard = ({ product, index }: { product: ProductType; index: number }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { timeLeft, isUrgent } = useCountdown(product.flashSaleEnd);
  const isInCart = cartItems.some((item: CartItem) => item._id === product?._id);
  
  const discountPercentage = Math.round(((product.price - product.flashSalePrice) / product.price) * 100);

  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.flashSalePrice,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
    >
      {/* Flash Sale Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Flame className="w-3 h-3" />
          {discountPercentage}% OFF
        </div>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700">
        <Image
          width={300}
          height={200}
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick Add Button Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white disabled:opacity-50"
          >
            {isInCart ? "Added!" : "Quick Add"}
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl font-black text-red-600">
            ${product.flashSalePrice}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${product.price}
          </span>
          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">
            Save ${(product.price - product.flashSalePrice).toFixed(2)}
          </span>
        </div>

        {/* Sale Duration */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <span>Started:</span>
            <span className="font-medium">{new Date(product.flashSaleStart).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Ends:</span>
            <span className="font-medium">{new Date(product.flashSaleEnd).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${
          isUrgent 
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
            : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
        }`}>
          <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-600' : 'text-orange-600'}`} />
          <span className={`text-sm font-bold ${
            isUrgent ? 'text-red-700 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'
          }`}>
            {timeLeft !== "Expired" ? timeLeft : "Sale Ended"}
          </span>
          {isUrgent && timeLeft !== "Expired" && (
            <Zap className="w-4 h-4 text-red-600 animate-pulse" />
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isInCart || timeLeft === "Expired"}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? 'bg-green-500 text-white cursor-not-allowed'
              : timeLeft === "Expired"
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-red-500/25'
          }`}
        >
          {isInCart ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Added to Cart
            </>
          ) : timeLeft === "Expired" ? (
            "Sale Ended"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const FlashSaleProducts = () => {
  const { data, isLoading, error } = useGetFlashSaleProductsQuery(null);

  if (isLoading)
    return (
      <div className="px-6 py-16">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            <Flame className="absolute inset-0 m-auto w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="px-6 py-16 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <p className="text-red-500 text-xl">Failed to load flash sale products</p>
      </div>
    );

  return (
    <section className="px-6 py-16 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-red-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
            <Flame className="w-6 h-6" />
            Flash Sale
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Limited Time Offers
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Grab these amazing deals before they're gone! Hurry, time is running out.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.data?.map((product: ProductType, index: number) => (
            <FlashSaleCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto">
            <Flame className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Don't Miss Out!</h3>
            <p className="text-red-100">New flash sales every day. Check back tomorrow!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSaleProducts;