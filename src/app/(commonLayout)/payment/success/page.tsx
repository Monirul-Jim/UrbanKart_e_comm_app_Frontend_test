"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/feature/auth/cartSlice"; // add this action in your slice

export default function PaymentSuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // clear local cart after success
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-3 text-gray-600">Thank you for your purchase.</p>
    </div>
  );
}
