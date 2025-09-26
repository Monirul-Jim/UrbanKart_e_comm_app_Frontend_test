"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, Search } from "lucide-react";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you will receive a tracking number via email within 24 hours. You can use it to track your order in real-time on our website or through our mobile app. We also send SMS updates for major milestones.",
    category: "Orders"
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, MasterCard, American Express), mobile banking (bKash, Nagad, Rocket), PayPal, and SSLCOMMERZ payments. All transactions are secured with 256-bit encryption.",
    category: "Payment"
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 2–5 business days within major cities and 5–7 days for remote areas. Express delivery (next-day) is available in Dhaka, Chittagong, and Sylhet for an additional fee.",
    category: "Delivery"
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes! Products can be returned within 7 days if they are unused and in original packaging. Electronics come with a 3-day return policy. We offer free returns for defective items and exchanges for size/color issues.",
    category: "Returns"
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, cash on delivery (COD) is available for orders up to $500 in selected locations. A small COD fee may apply depending on your area. You can pay with cash or mobile banking at the time of delivery.",
    category: "Payment"
  },
  {
    question: "Are all products covered by warranty?",
    answer:
      "Most electronics come with manufacturer warranty (6 months to 2 years). Fashion items have a 30-day quality guarantee. Warranty terms are clearly mentioned on each product page with full coverage details.",
    category: "Warranty"
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, orders can be canceled free of charge before they are shipped (usually within 2-4 hours). Once shipped, cancellation isn't possible, but you can return the item once delivered.",
    category: "Orders"
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only deliver within Bangladesh. However, we're planning to expand to neighboring countries by 2025. Subscribe to our newsletter to get notified when international shipping becomes available.",
    category: "Delivery"
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@shopora.com, call our 24/7 hotline at +880-123-456-789, or use the live chat feature on our website. We typically respond within 30 minutes during business hours.",
    category: "Support"
  },
];

const categories = ["All", "Orders", "Payment", "Delivery", "Returns", "Warranty", "Support"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-6 py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
            <HelpCircle className="w-6 h-6" />
            FAQ
            <MessageCircle className="w-5 h-5" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about shopping with us.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      faq.category === 'Orders' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      faq.category === 'Payment' ? 'bg-green-100 dark:bg-green-900/30' :
                      faq.category === 'Delivery' ? 'bg-orange-100 dark:bg-orange-900/30' :
                      faq.category === 'Returns' ? 'bg-red-100 dark:bg-red-900/30' :
                      faq.category === 'Warranty' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      <span className="text-xs font-bold">
                        {faq.category.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {faq.question}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      faq.category === 'Orders' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      faq.category === 'Payment' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      faq.category === 'Delivery' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      faq.category === 'Returns' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      faq.category === 'Warranty' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {faq.category}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-400" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-2xl">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-blue-100 mb-6">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}