"use client";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import Image from "next/image";

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
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading...
      </p>
    );
  if (!data?.data)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        No categories found
      </p>
    );

  // Extract unique categories with slug & imageUrl
  const categories = Array.from(
    new Map(
      data.data.map((p: Product) => [
        p?.subCategory?.category?._id,
        {
          name: p?.subCategory?.category?.name,
          slug: p?.subCategory?.category?.name
            .toLowerCase()
            .replace(/\s+/g, "-"),
          imageUrl: p?.subCategory?.category?.imageUrl,
        },
      ])
    ).values()
  );

  return (
    <div className=" mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">
        Shop by Category
      </h1>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`}>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full h-52">
              {cat.imageUrl && (
                <Image
                  width={60}
                  height={60}
                  src={cat.imageUrl}
                  alt={cat.name || 'Product Category'}
                  className="rounded-full object-cover mb-3 border-2 border-gray-200 dark:border-gray-600"
                />
              )}
              <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-100 text-center">
                {cat.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
