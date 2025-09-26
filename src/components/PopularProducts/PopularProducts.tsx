"use client";
import { useGetPopularProductsQuery } from "@/redux/api/productApi";
import { addToCart } from "@/redux/feature/auth/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  CheckCircle, 
  Sparkles,
  Crown
} from "lucide-react";

type ProductType = {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
};

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

// Enhanced Popular Product Card
const PopularCard = ({ product, index }: { product: ProductType; index: number }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item: CartItem) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.discountPrice ?? product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Generate random rating for demo (4-5 stars)
  const rating = 4 + Math.random();
  const reviewCount = Math.floor(Math.random() * 500) + 50;

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
      {/* Popular Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Crown className="w-3 h-3" />
          Popular
        </div>
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        </div>
      )}

      {/* Heart Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-12 right-3 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
      </motion.button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700">
        <Image
          width={300}
          height={200}
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Trending Indicator */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        </div>

        {/* Quick Add Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white disabled:opacity-50 flex items-center gap-2"
          >
            {isInCart ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Quick Add
              </>
            )}
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : i < rating
                    ? 'text-yellow-400 fill-yellow-400/50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-black text-emerald-600">
                ${product.discountPrice}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${product.price}
              </span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full font-medium">
                Save ${(product.price - product.discountPrice).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-black text-gray-900 dark:text-white">
              ${product.price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? 'bg-emerald-500 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25'
          }`}
        >
          {isInCart ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/10 group-hover:to-teal-400/10 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

// Main Popular Products Component
const PopularProducts = () => {
  const { data, isLoading, error } = useGetPopularProductsQuery(null);

  if (isLoading)
    return (
      <div className="px-6 py-16">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <Star className="absolute inset-0 m-auto w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="px-6 py-16 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <p className="text-red-500 text-xl">Failed to load popular products</p>
      </div>
    );

  return (
    <section className="px-6 py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
            <Star className="w-6 h-6 fill-white" />
            Popular Products
            <Sparkles className="w-5 h-5" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Customer Favorites
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover what our customers love most. These trending products are flying off our shelves!
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.data?.map((product: ProductType, index: number) => (
            <PopularCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">4.8★</div>
              <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProducts;