"use client";
import { useGetFlashSaleProductsQuery } from "@/redux/api/productApi";
import { addToCart } from "@/redux/feature/auth/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import React, { useEffect, useState } from "react";

// Countdown hook
const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
};

// ✅ Card component (still in same file)
const FlashSaleCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();

  // ✅ Get cart state
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const countdown = useCountdown(product.flashSaleEnd);
  const isInCart = cartItems.some((item: any) => item._id === product?._id);
  const handleAddToCart = () => {
    if (!product || isInCart) return;
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.flashSalePrice,
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
          <span className="text-base font-bold text-red-500">
            ${product.flashSalePrice}
          </span>
          <span className="text-xs line-through text-gray-400">
            ${product.price}
          </span>
        </div>

        <div className="mt-1 text-[10px] text-gray-500 leading-tight">
          <p>Start: {new Date(product.flashSaleStart).toLocaleDateString()}</p>
          <p>End: {new Date(product.flashSaleEnd).toLocaleDateString()}</p>
        </div>

        <div className="mt-1 text-xs font-medium text-red-600">
          {countdown !== "Expired" ? `⏳ ${countdown}` : "❌ Ended"}
        </div>
         {isInCart ? (
            <button
              disabled
              className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 rounded-lg transition-colors cursor-not-allowed"
            >
              Already Added
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          )}
      </div>
    </div>
  );
};

const FlashSaleProducts = () => {
  const { data, isLoading, error } = useGetFlashSaleProductsQuery(null);

  if (isLoading)
    return <p className="text-center py-10">Loading flash sale...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        Failed to load flash sale products
      </p>
    );

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🔥 Flash Sale</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.map((product: any) => (
          <FlashSaleCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSaleProducts;
