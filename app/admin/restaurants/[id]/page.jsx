"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/mainapi";
import { HiOutlineChevronLeft } from "react-icons/hi"; // Icon for back button

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();

  const handleDeleteClick = async (id) => {
    try {
      await api.deleteRestaurant(`${id}`);
      router.push(`/admin/restaurants`);
    } catch (err) {
      console.error("Error deleting restaurant:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await api.getRestaurantById(`${id}`);
        setRestaurant(response);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("Failed to load restaurant data");
      }
    };

    const fetchOrdersData = async () => {
      try {
        const response = await api.getOrderById(`${id}`);
        setOrders(response);
      } catch (err) {
        console.error("Error fetching orders data:", err);
        setError("Failed to load orders data");
      }
    };

    if (id) {
      fetchRestaurantData();
      fetchOrdersData();
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/admin/restaurants")}
            className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <HiOutlineChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800">Restaurant Details</h1>
        </div>
       
      </div>

      {/* Restaurant Info */}
      {restaurant ? (
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{restaurant.restaurantName}</h2>
          <p className="text-gray-600"><strong>Contact:</strong> {restaurant.contactNumber}</p>
          <p className="text-gray-600"><strong>Email:</strong> {restaurant.email}</p>
          <p className="text-gray-600"><strong>Address:</strong> {restaurant.restaurantAddress}</p>
          <p className="text-gray-600"><strong>GSTIN:</strong> {restaurant.gstin === "" ? "N/A" : restaurant.gstin}</p>
          <p className="text-gray-600"><strong>Status:</strong> <span className="text-600">{restaurant.isActive ? "active" : "inactive"}</span></p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Restaurant data is loading...</p>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => router.push(`/admin/restaurants/${id}/edit`)}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit Account
        </button>
        <button
          onClick={() => handleDeleteClick(id)}
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
  {orders.length > 0 ? (
    <div>
      {/* Layout for larger screens */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`border rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col ${
              selectedOrder === order.id ? "h-auto" : "h-40"
            }`}
            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
          >
            {/* Order Summary */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-700 text-base">
                  Order ID: {order.id}
                </p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-800 font-semibold text-base">
                ₹{order.finalAmount.toFixed(2)}
              </p>
            </div>

            {/* Order Details */}
            {selectedOrder === order.id && (
              <div className="mt-4 space-y-2 text-base">
                <p className="text-gray-600">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-600">
                  <strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <strong>Discount:</strong> ₹{order.discountAmount.toFixed(2)}
                </p>
                <div className="overflow-auto max-h-40">
                  <h4 className="font-medium text-gray-700">Items:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        {item.product.name} - {item.quantity} x ₹
                        {item.product.price.toFixed(2)} = ₹
                        {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
              selectedOrder === order.id ? "h-auto" : "h-32"
            }`}
            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
          >
            {/* Order Summary */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-700 text-sm">
                Order ID: {order.id}
              </p>
              <p className="text-gray-500 text-sm">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                ₹{order.finalAmount.toFixed(2)}
              </p>
            </div>

            {/* Order Details */}
            {selectedOrder === order.id && (
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-600">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-600">
                  <strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <strong>Discount:</strong> ₹{order.discountAmount.toFixed(2)}
                </p>
                <div className="overflow-auto max-h-32">
                  <h4 className="font-medium text-gray-700">Items:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        {item.product.name} - {item.quantity} x ₹
                        {item.product.price.toFixed(2)} = ₹
                        {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-center">No orders found.</p>
  )}
</div>

    </div>
  );
};

export default RestaurantDetailPage;
