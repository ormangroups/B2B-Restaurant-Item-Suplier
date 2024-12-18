"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/app/api/mainapi"; // Import the API instance

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id); // Get the restaurantId from the Redux store

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Ensure restaurantId is available
        if (!restaurantId) {
          setError("Restaurant ID is missing.");
          setLoading(false);
          return;
        }

        // Fetch orders for the restaurant
        const response = await api.getOrderById(restaurantId);
        console.log(response)
        setOrders(response); // Assuming the response data contains the orders
      } catch (error) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900">Order history</h1>
      <p className="text-gray-500 mt-2">
        Check the status of recent orders, manage returns, and discover similar products.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <img
                src={order.img || "https://placehold.co/300x300"}
                alt={`${order.name} image`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-medium text-gray-900">{order.name}</h2>
              <p className={`mt-1 ${order.statusColor}`}>{order.status}</p>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
