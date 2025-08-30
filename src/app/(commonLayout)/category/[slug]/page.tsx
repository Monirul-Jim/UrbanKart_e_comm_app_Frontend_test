"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import Image from "next/image";

type Category = { _id: string; name: string };
type SubCategory = { _id: string; name: string; category: Category };
type Product = {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
  subCategory?: SubCategory;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const subSlug = searchParams.get("sub");

  const { data, isLoading } = useGetAllProductsQuery({});

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data?.data) return <p className="text-center mt-10">No products found</p>;

  let products = data.data.filter(
    (p: Product) =>
      p?.subCategory?.category?.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const subcategories = Array.from(
    new Map(
      products.map((p: Product) => [
        p.subCategory?._id,
        {
          id: p.subCategory?._id,
          name: p.subCategory?.name,
          slug: p.subCategory?.name.toLowerCase().replace(/\s+/g, "-"),
        },
      ])
    ).values()
  );

  if (subSlug) {
    products = products.filter(
      (p: Product) =>
        p?.subCategory?.name.toLowerCase().replace(/\s+/g, "-") === subSlug
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">{slug}</h1>

      {/* Subcategory filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Link href={`/category/${slug}`}>
          <span
            className={`px-4 py-2 rounded-full cursor-pointer font-medium transition ${
              !subSlug
                ? "bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </span>
        </Link>

        {subcategories.map((sub) => (
          <Link key={sub.id} href={`/category/${slug}?sub=${sub.slug}`}>
            <span
              className={`px-4 py-2 rounded-full cursor-pointer font-medium transition ${
                subSlug === sub.slug
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {sub.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((p: Product) => (
            <Link key={p._id} href={`/category/${slug}/product/${p._id}`}>
              <div className="border rounded-xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer flex flex-col">
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="font-semibold text-lg mb-2">{p.title}</h2>
                <p className="text-indigo-600 font-bold text-lg">
                  ${p.discountPrice || p.price}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this subcategory.
          </p>
        )}
      </div>
    </div>
  );
}
