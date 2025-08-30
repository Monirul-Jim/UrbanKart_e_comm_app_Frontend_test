"use client";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/feature/store";
import { addToCart } from "@/redux/feature/auth/cartSlice";
import Image from "next/image";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id as string);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error fetching product</p>;

  const product = data?.data;

  const isInCart = cartItems.some(
    (item: CartItem) => item._id === product?._id
  );

  const handleAddToCart = () => {
    if (!product || isInCart || product.stockOut) return;
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <Image
          width={100}
          height={80}
          src={product?.image}
          alt={product?.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product?.title}</h1>
          <p className="mt-4 text-gray-600">{product?.description}</p>
          <p className="mt-6 text-2xl font-semibold text-indigo-600">
            ${product?.price}
          </p>

          {product?.stockOut ? (
            <span className="mt-6 inline-block bg-red-100 text-red-700 px-6 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          ) : isInCart ? (
            <button
              disabled
              className="mt-6 bg-gray-400 text-white px-6 py-2 rounded-lg shadow cursor-not-allowed"
            >
              Already Added
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
