"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantDetailPage = ({ params }) => {
  const  {id}  = params; // Restaurant ID

  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Simulated restaurant data
    setRestaurant({
      id,
      name: `Restaurant ${id}`,
      owner: `Owner ${id}`,
      status: "Active",
      contact: "123-456-7890",
      address: "123 Main Street",
    });

    // Simulated orders data
    setOrders([
      { id: 1, date: "2024-12-01", total: 150 },
      { id: 2, date: "2024-12-05", total: 250 },
    ]);
  }, [id]);

  if (!restaurant) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Restaurant Details</h1>
        <button
          onClick={() => router.push("/admin/restaurants")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to List
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{restaurant.name}</h2>
        <p className="text-gray-600"><strong>Owner:</strong> {restaurant.owner}</p>
        <p className="text-gray-600"><strong>Contact:</strong> {restaurant.contact}</p>
        <p className="text-gray-600"><strong>Address:</strong> {restaurant.address}</p>
        <p className="text-gray-600"><strong>Status:</strong> <span className="text-green-600">{restaurant.status}</span></p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => router.push(`/admin/restaurants/${id}/edit`)}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit Account
        </button>
        <button
          onClick={() => alert("Delete functionality not implemented")}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Delete Account
        </button>
        <button
          onClick={() => router.push(`/admin/restaurants/${id}/notification`)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Send Notification
        </button>
        <button
          onClick={() => router.push(`/admin/restaurants/${id}/payment`)}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Money Management
        </button>
      </div>

      {/* Past Orders */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Past Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border font-medium">Order ID</th>
                <th className="px-4 py-2 border font-medium">Date</th>
                <th className="px-4 py-2 border font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.date}</td>
                  <td className="px-4 py-2 border">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
