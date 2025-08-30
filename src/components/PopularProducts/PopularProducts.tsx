"use client";
import { useGetPopularProductsQuery } from "@/redux/api/productApi";
import { addToCart } from "@/redux/feature/auth/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import React from "react";

// ✅ Card component for Popular products
const PopularCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();

  // ✅ Get cart state
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item: any) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.discountPrice,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 w-full">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-32 object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{product.title}</h3>

        <div className="mt-1 flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-base font-bold text-green-600">
                ${product.discountPrice}
              </span>
              <span className="text-xs line-through text-gray-400">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-800">
              ${product.price}
            </span>
          )}
        </div>

        {isInCart ? (
          <button
            disabled
            className="mt-2 w-full bg-green-500 text-white text-xs py-1.5 rounded-lg transition-colors cursor-not-allowed"
          >
            Already Added
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

// ✅ Wrapper Component
const PopularProducts = () => {
  const { data, isLoading, error } = useGetPopularProductsQuery(null);

  if (isLoading)
    return <p className="text-center py-10">Loading popular products...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        Failed to load popular products
      </p>
    );

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">⭐ Popular Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.map((product: any) => (
          <PopularCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
