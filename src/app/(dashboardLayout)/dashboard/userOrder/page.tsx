"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/feature/hook";
import { useGetUserOrdersQuery } from "@/redux/api/orderApi";

const UserOrdersTable = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const user = useAppSelector((state) => state.auth.user);
  const { data: orders, isLoading } = useGetUserOrdersQuery(user?._id ?? "", {
    skip: !user?._id,
  });

  if (!mounted) return <p>Loading...</p>;
  if (isLoading) return <p>Loading your orders...</p>;
  if (!orders?.data || orders.data.length === 0) return <p>No orders found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.data.map((order: any, idx: number) => (
            <tr
              key={order._id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3 font-mono text-sm">{order.tran_id}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.orderStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.orderStatus === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td className="p-3 font-semibold">
                {order.amount} {order.currency}
              </td>
              <td className="p-3">
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-3 border rounded-lg p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersTable;
