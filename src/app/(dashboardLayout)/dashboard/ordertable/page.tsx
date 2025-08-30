"use client";

import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";

const OrdersTable: React.FC = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) return <p className="text-center py-6">Loading orders...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Failed to load orders</p>;

  const orders = data?.data || [];

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id: orderId, orderStatus: newStatus }).unwrap();
      console.log("Order status updated:", newStatus);
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Tran ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Order Status</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order: any, index: number) => (
              <tr key={order._id}>
                {/* index */}
                <td className="px-6 py-4">{index + 1}</td>

                {/* Tran ID */}
                <td className="px-6 py-4 font-mono text-xs">{order.tran_id}</td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">{order.customer.name}</p>
                    <p className="text-xs text-gray-600">{order.customer.phone}</p>
                    <p className="text-xs text-gray-600">{order.customer.city}</p>
                    <p className="text-xs text-gray-600">{order.customer.address}</p>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 font-semibold">
                  {order.amount} {order.currency}
                </td>

                {/* Items */}
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-2 border-b last:border-none pb-2 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div className="text-sm">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-gray-600">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Payment status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      order.status === "SUCCESS"
                        ? "bg-green-100 text-green-600"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Delivery status with select */}
                <td className="px-6 py-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="RETURNED">RETURNED</option>
                    <option value="ON_ARRIVAL_PENDING">ON ARRIVAL PENDING</option>
                    <option value="ON_ARRIVAL_DELIVERED">ON ARRIVAL DELIVERED</option>
                  </select>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-xs text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
