"use client";
import { Star, Quote, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Define a type for testimonials
type Testimonial = {
  name: string;
  photo: string;
  review: string;
  rating: number;
  location: string;
  purchaseItem: string;
  verified: boolean;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Ali",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "Amazing service and fast delivery! The product quality exceeded my expectations. The packaging was beautiful and the customer service team was incredibly helpful throughout the process.",
    rating: 5,
    location: "Dhaka, Bangladesh",
    purchaseItem: "Wireless Headphones",
    verified: true
  },
  {
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "Great quality products at affordable prices. The flash sale deals are incredible! I've been shopping here for months and never had a single issue. Highly recommend to everyone!",
    rating: 4,
    location: "Chittagong, Bangladesh",
    purchaseItem: "Gaming Laptop",
    verified: true
  },
  {
    name: "Ayesha Khan",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "Customer support was very helpful and polite. They resolved my query within minutes. The return process was smooth and hassle-free. Will definitely shop again!",
    rating: 5,
    location: "Sylhet, Bangladesh",
    purchaseItem: "Fashion Accessories",
    verified: true
  },
  {
    name: "Michael Smith",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    review: "I'm really impressed with the packaging and quick delivery. Everything arrived exactly as described. The quality is top-notch and prices are very competitive. Five stars!",
    rating: 5,
    location: "Rajshahi, Bangladesh",
    purchaseItem: "Smartphone",
    verified: true
  },
  {
    name: "Fatima Noor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    review: "Products are original and prices are reasonable. Shopping was smooth and the mobile app is very user-friendly. Love the flash sales and popular products section!",
    rating: 4,
    location: "Khulna, Bangladesh",
    purchaseItem: "Home Appliances",
    verified: true
  },
  {
    name: "David Lee",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    review: "The best e-commerce experience I've had in Bangladesh. Will definitely refer friends and family. The variety of products is amazing and delivery is always on time.",
    rating: 5,
    location: "Barisal, Bangladesh",
    purchaseItem: "Sports Equipment",
    verified: true
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
            <Heart className="w-6 h-6 fill-white" />
            Customer Reviews
            <Quote className="w-5 h-5" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their shopping experience.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-100/50 to-pink-100/50 dark:from-red-900/20 dark:to-pink-900/20 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                  <Quote className="w-8 h-8 text-white fill-white" />
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-center text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonials[currentIndex].photo}
                      alt={testimonials[currentIndex].name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {testimonials[currentIndex].verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].location}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      Purchased: {testimonials[currentIndex].purchaseItem}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {testimonials[currentIndex].rating}/5 Stars
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>

              {/* Review */}
              <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                "{testimonial.review}"
              </blockquote>

              {/* Purchase Info */}
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <ShoppingBag className="w-4 h-4" />
                <span className="font-medium">Purchased: {testimonial.purchaseItem}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-black text-amber-600 mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-black text-amber-600 mb-2">4.9★</div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-black text-amber-600 mb-2">15K+</div>
            <div className="text-gray-600 dark:text-gray-300">Reviews</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-black text-amber-600 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Recommended</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}