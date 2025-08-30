"use client";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

export default function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({});

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data?.data) return <p>No categories found</p>;

  // ✅ Extract unique categories with slug
  const categories = Array.from(
    new Map(
      data.data.map((p: any) => [
        p?.subCategory?.category?._id,
        {
          name: p?.subCategory?.category?.name,
          slug: p?.subCategory?.category?.name.toLowerCase().replace(/\s+/g, "-"),
        },
      ])
    ).values()
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop by Category</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`}>
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                       rounded-2xl shadow-lg hover:scale-105 transition transform 
                       cursor-pointer flex items-center justify-center h-32 font-semibold text-xl"
            >
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
