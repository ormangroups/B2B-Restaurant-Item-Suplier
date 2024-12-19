"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/mainapi";


const RestaurantDetailPage = () => {
  const { id } = useParams(); // Access the params using useParams() hook
  
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const router = useRouter();
  const handleDeleteClick = async (id) => {
    try {
    
      await api.deleteRestaurant(`${id}`);
     
      router.push(`/admin/restaurants`);
      
    } catch (err) {
      console.error("Error deleting restaurant:", err.message);
      dispatch(setError(err.message));  // Dispatch error state
      dispatch(setLoading(false));
    }
    
  };
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // Fetch restaurant data by ID
        const response = await api.getRestaurantById(`${id}`);
        console.log(response)
        setRestaurant(response);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("Failed to load restaurant data");
      }
    };

    const fetchOrdersData = async () => {
      try {
        // Fetch orders data for the specific restaurant
        const response = await api.getOrderById(`${id}`);
        console.log(response)
        setOrders(response);
      } catch (err) {
        console.error("Error fetching orders data:", err);
        setError("Failed to load orders data");
      }
    };
   
    if (id) {
      fetchRestaurantData();
       fetchOrdersData();
      setLoading(false); // Set loading to false after data fetching
    }
  }, [id]);
  

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

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
    {restaurant ? (
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{restaurant.restaurantName}</h2>
        <p className="text-gray-600"><strong>Contact:</strong> {restaurant.contactNumber}</p>
        <p className="text-gray-600"><strong>Email:</strong> {restaurant.email}</p>
        <p className="text-gray-600"><strong>Address:</strong> {restaurant.restaurantAddress}</p>
        <p className="text-gray-600"><strong>GSTIN:</strong> {restaurant.gstin===""?"N/A":restaurant.gstin}</p>
        <p className="text-gray-600"><strong>Status:</strong> <span className="text-600">{restaurant.isActive?"active":"inactive"}</span></p>
      </div>
    ) : (
      <p className="text-center text-gray-500">Restaurant data is loading...</p>
    )}

    {/* Action Buttons */}
    <div className="flex flex-wrap gap-4">
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
                <td className="px-4 py-2 border">{order.orderDate}</td>
                <td className="px-4 py-2 border">₹‎{order.totalPrice.toFixed(2)}</td>
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
