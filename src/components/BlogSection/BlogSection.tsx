"use client";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Smartphones in 2025",
    excerpt:
      "Discover the latest smartphones of 2025 with cutting-edge features, AI integration, and futuristic designs.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&q=80",
    link: "/blog/top-5-smartphones-2025",
    category: "Smartphones",
    author: "Tech Insider",
    date: "Feb 10, 2025",
  },
  {
    id: 2,
    title: "Best Laptops for Work & Gaming",
    excerpt:
      "From ultra-slim productivity machines to powerful gaming rigs, here’s our pick for 2025 laptops.",
    image:
      "https://images.unsplash.com/photo-1587202372775-98973a1a93a0?w=600&q=80",
    link: "/blog/best-laptops-2025",
    category: "Laptops",
    author: "Gadget Hub",
    date: "Feb 5, 2025",
  },
  {
    id: 3,
    title: "Smart Gadgets That Make Life Easier",
    excerpt:
      "Check out these smart devices—from wearables to smart home gadgets—that simplify your daily routine.",
    image:
      "https://images.unsplash.com/photo-1581276879432-15e505a1e6f1?w=600&q=80",
    link: "/blog/smart-gadgets-2025",
    category: "Gadgets",
    author: "Tech Life",
    date: "Jan 28, 2025",
  },
  {
    id: 4,
    title: "Top Smartwatches to Buy in 2025",
    excerpt:
      "Fitness tracking, AI features, and sleek designs—explore the best smartwatches this year.",
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&q=80",
    link: "/blog/top-smartwatches-2025",
    category: "Wearables",
    author: "Future Tech",
    date: "Jan 20, 2025",
  },
  {
    id: 5,
    title: "Future of E-commerce in Bangladesh",
    excerpt:
      "Learn how digital payments and logistics are shaping the next era of online shopping.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    link: "/blog/future-of-ecommerce",
    category: "E-commerce",
    author: "Shopora Team",
    date: "Jan 12, 2025",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className=" mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest <span className="text-blue-600">News & Blogs</span>
          </h2>
          <button
            className="text-blue-600 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold uppercase">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                  <span>✍ {post.author}</span>
                  <span>📅 {post.date}</span>
                </div>

                <Link
                  href={post.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
