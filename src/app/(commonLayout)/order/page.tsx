"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  CartItem,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/feature/auth/cartSlice";
import { AppDispatch, RootState } from "@/redux/feature/store";

import { useAppSelector } from "@/redux/feature/hook";
export default function CartPage() {
  const [mounted, setMounted] = useState(false); // 👈 hydration guard
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.user);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // ensure client-only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  // ✅ Calculate total
  const total: number = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  const handleBuyNow = async () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.city
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/payment/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          customer,
          items: cartItems, // store what user is buying
          userId: user,
        }),
      });

      const data = await res.json();
      if (data?.redirectURL) {
        window.location.href = data.redirectURL; // go to SSLCOMMERZ
      } else {
        alert("Failed to initialize payment");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart 🛒</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-indigo-600 font-bold">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="mt-2 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Cart Total */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-2xl font-bold text-indigo-600">
          ${total.toFixed(2)}
        </p>
      </div>

      {/* ✅ Confirm Button */}
      {!user ? (
        <div className="mt-6 flex justify-end">
          <a
            href="/login"
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700"
          >
            Login to Order
          </a>
        </div>
      ) : (
        // ✅ If logged in → show Confirm Order
        !showForm && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Confirm Order
            </button>
          </div>
        )
      )}

      {/* ✅ Customer Info Form */}
      {showForm && (
        <div className="mt-8 p-6 border rounded-lg shadow-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
