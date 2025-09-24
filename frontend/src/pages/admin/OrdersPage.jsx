import React, { useState } from "react";
import { orders as mockOrders } from "../../data/orders";
import AdminCard from "../../components/admin/AdminCard";

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);

  const handleUpdateStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <div
        className="w-full h-64 md:h-80 bg-center bg-cover flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/12.jpg')" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Manage Orders</h1>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map(o => (
            <AdminCard
              key={o.id}
              title={`Order #${o.id}`}
              details={`User: ${o.user} | Total: LKR ${o.total} | Status: ${o.status}`}
              actions={
                <>
                  <button
                    onClick={() => handleUpdateStatus(o.id, "Shipped")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(o.id, "Cancelled")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
