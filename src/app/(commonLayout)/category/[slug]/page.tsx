"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/redux/api/productApi";


export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const subSlug = searchParams.get("sub"); // ✅ current subcategory from query
 
  const { data, isLoading } = useGetAllProductsQuery({});

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data?.data) return <p>No products found</p>;

  // ✅ Products of this category
  let products = data.data.filter(
    (p: any) =>
      p?.subCategory?.category?.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  // ✅ Unique subcategories for filter buttons
  const subcategories = Array.from(
    new Map(
      products.map((p: any) => [
        p.subCategory?._id,
        {
          id: p.subCategory?._id,
          name: p.subCategory?.name,
          slug: p.subCategory?.name.toLowerCase().replace(/\s+/g, "-"),
        },
      ])
    ).values()
  );

  // ✅ Filter products by selected subcategory
  if (subSlug) {
    products = products.filter(
      (p: any) =>
        p?.subCategory?.name.toLowerCase().replace(/\s+/g, "-") === subSlug
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">{slug}</h1>

      {/* ✅ Subcategories filter buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <Link href={`/category/${slug}`}>
          <span
            className={`px-5 py-2 rounded-full cursor-pointer transition ${
              !subSlug
                ? "bg-indigo-700 "
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </span>
        </Link>

        {subcategories.map((sub) => (
          <Link key={sub.id} href={`/category/${slug}?sub=${sub.slug}`}>
            <span
              className={`px-5 py-2 rounded-full cursor-pointer transition ${
                subSlug === sub.slug
                  ? "bg-indigo-700 "
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {sub.name}
            </span>
          </Link>
        ))}
      </div>

      {/* ✅ Products */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((p: any) => (
            <Link key={p._id} href={`/category/${slug}/product/${p._id}`}>
              <div className="border rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h2 className="mt-3 font-semibold text-lg">{p.title}</h2>
                <p className="text-indigo-600 font-bold">
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
