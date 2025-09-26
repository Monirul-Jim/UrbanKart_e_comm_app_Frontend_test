"use client";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  imageUrl: string;
};

type SubCategory = {
  category: Category;
};

type Product = {
  _id: string;
  title: string;
  price: number;
  subCategory?: SubCategory;
};

export default function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({});

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );

  if (!data?.data)
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛍️</div>
        <p className="text-xl text-muted-foreground">No categories found</p>
      </div>
    );

  // Extract unique categories with slug & imageUrl
  const categories = Array.from(
    new Map(
      data.data.map((p: Product) => [
        p?.subCategory?.category?._id,
        {
          name: p?.subCategory?.category?.name,
          slug: p?.subCategory?.category?.name
            ?.toLowerCase()
            .replace(/\s+/g, "-"),
          imageUrl: p?.subCategory?.category?.imageUrl,
        },
      ])
    ).values()
  );

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full px-6 py-3 mb-6">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Explore Categories
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
          Shop by Category
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collections across different categories. Find exactly what you're looking for.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories?.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <Link href={`/category/${cat.slug}`}>
              <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden h-64">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid opacity-5"></div>
                
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/5 group-hover:to-blue-500/10 transition-all duration-500 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
                  {/* Image Container */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {cat.imageUrl ? (
                        <Image
                          width={80}
                          height={80}
                          src={cat.imageUrl}
                          alt={cat.name || 'Product Category'}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🛍️</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Name */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {cat.name}
                    </h2>
                    
                    {/* Arrow Icon */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-purple-600 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer">
          <span>View All Products</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.div>
    </div>
  );
}