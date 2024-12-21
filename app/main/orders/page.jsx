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
        console.log(response);
        setOrders(response); // Assuming the response data contains the orders
      } catch (error) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div>
          <h2 className="text-center text-lg font-semibold">Loading...</h2>
          <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p>
        </div>
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
    <div className="max-w-7xl mx-auto p-2 mb-8 md:mb-11">
      <h1 className="text-3xl font-bold text-gray-900">Order history</h1>
      <p className="text-gray-500 mt-2">
        Check the status of recent orders, manage returns, and discover similar products.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Order ID: {order.id}</h2>
                <span className={`px-2 py-1 rounded text-white ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-4 h-48 overflow-y-auto">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <img
                      src={item.product.image || "https://placehold.co/100x100"}
                      alt={`${item.product.name} image`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-gray-700">
                      <h3 className="text-md font-medium">{item.product.name}</h3>
                      <p className="text-sm">Category: {item.product.category}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm">Price: ₹{item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-gray-700">
                <p className="font-bold">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="font-bold">Total Price: ₹{order.totalPrice}</p>
                <p className="font-bold">Final Amount: ₹{order.finalAmount}</p>
              </div>
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
