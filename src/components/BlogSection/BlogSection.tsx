"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  BookOpen,
  TrendingUp,
  Eye
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Smartphones in 2025",
    excerpt: "Discover the latest smartphones of 2025 with cutting-edge features, AI integration, and futuristic designs that will revolutionize your mobile experience.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&q=80",
    link: "/blog/top-5-smartphones-2025",
    category: "Smartphones",
    author: "Tech Insider",
    date: "Feb 10, 2025",
    readTime: "5 min read",
    views: "2.3K",
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: "Best Laptops for Work & Gaming",
    excerpt: "From ultra-slim productivity machines to powerful gaming rigs, here's our comprehensive guide to the best laptops of 2025 for every need and budget.",
    image: "https://images.unsplash.com/photo-1587202372775-98973a1a93a0?w=600&q=80",
    link: "/blog/best-laptops-2025",
    category: "Laptops",
    author: "Gadget Hub",
    date: "Feb 5, 2025",
    readTime: "8 min read",
    views: "1.8K",
    featured: false,
    trending: true
  },
  {
    id: 3,
    title: "Smart Gadgets That Make Life Easier",
    excerpt: "Check out these innovative smart devices—from wearables to smart home gadgets—that simplify your daily routine and boost your productivity.",
    image: "https://images.unsplash.com/photo-1581276879432-15e505a1e6f1?w=600&q=80",
    link: "/blog/smart-gadgets-2025",
    category: "Gadgets",
    author: "Tech Life",
    date: "Jan 28, 2025",
    readTime: "6 min read",
    views: "3.1K",
    featured: false,
    trending: false
  },
  {
    id: 4,
    title: "Top Smartwatches to Buy in 2025",
    excerpt: "Fitness tracking, AI features, and sleek designs—explore the best smartwatches this year with detailed reviews and buying recommendations.",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&q=80",
    link: "/blog/top-smartwatches-2025",
    category: "Wearables",
    author: "Future Tech",
    date: "Jan 20, 2025",
    readTime: "4 min read",
    views: "1.5K",
    featured: false,
    trending: false
  },
  {
    id: 5,
    title: "Future of E-commerce in Bangladesh",
    excerpt: "Learn how digital payments, logistics innovations, and mobile commerce are shaping the next era of online shopping in Bangladesh.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    link: "/blog/future-of-ecommerce",
    category: "E-commerce",
    author: "Shopora Team",
    date: "Jan 12, 2025",
    readTime: "7 min read",
    views: "4.2K",
    featured: true,
    trending: false
  },
];

const categories = ["All", "Smartphones", "Laptops", "Gadgets", "Wearables", "E-commerce"];

export default function BlogSection() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
            <BookOpen className="w-6 h-6" />
            Our Blog
            <TrendingUp className="w-5 h-5" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
            Latest News & Insights
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Stay updated with the latest tech trends, product reviews, and industry insights from our expert team.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-300 text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                    {featuredPost.trending && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                      <Calendar className="w-4 h-4 ml-2" />
                      <span>{featuredPost.date}</span>
                    </div>

                    <Link
                      href={featuredPost.link}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    post.category === 'Smartphones' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    post.category === 'Laptops' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    post.category === 'Gadgets' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                    post.category === 'Wearables' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {post.category}
                  </span>
                  
                  {post.trending && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex gap-2 text-xs text-white">
                  <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <Link
                  href={post.link}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:gap-3"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
            <BookOpen className="w-6 h-6" />
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Discover more insights and stay ahead of the tech curve
          </p>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl mt-16 text-center"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and never miss the latest tech insights and product updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}