"use client";
import { Star } from "lucide-react";
import Image from "next/image";

// Define a type for testimonials
type Testimonial = {
  name: string;
  photo: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Ali",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Amazing service and fast delivery! The product quality was better than expected.",
    rating: 5,
  },
  {
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Great quality products at affordable prices. Will definitely shop again!",
    rating: 4,
  },
  {
    name: "Ayesha Khan",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Customer support was very helpful and polite. Loved my shopping experience!",
    rating: 5,
  },
  {
    name: "Michael Smith",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "I’m really impressed with the packaging and quick delivery. Highly recommended!",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    review: "Products are original and prices are reasonable. Shopping was smooth.",
    rating: 4,
  },
  {
    name: "David Lee",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    review:
      "The best e-commerce experience I’ve had. Will refer friends and family.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        💬 Customer Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {testimonials.map((t: Testimonial, i: number) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Profile */}
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={t.photo}
                alt={t.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">{t.name}</p>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index: number) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < t.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-gray-600 italic">“{t.review}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
