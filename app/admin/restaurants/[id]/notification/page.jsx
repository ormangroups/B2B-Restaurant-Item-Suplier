"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import api from "@/app/api/mainapi"; // Assuming the API methods are in this file
import { FaArrowLeft, FaBell } from "react-icons/fa"; // Icons for styling

const AdminNotificationPage = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [sentNotifications, setSentNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.getAllRestaurants();
        setRestaurants(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await api.getAllNotifications();
        setSentNotifications(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchRestaurants();
    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    if (!notificationMessage) return alert("Please enter a notification message.");

    const recipientId = selectedRestaurant ? selectedRestaurant.id : null;

    const newNotification = {
      message: notificationMessage,
      recipientId,
    };

    try {
      await api.createNotification(newNotification);
      const updatedNotifications = await api.getAllNotifications();
      setSentNotifications(updatedNotifications);
      setNotificationMessage("");
      setSelectedRestaurant(null);
      setSearchTerm("");
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSearchTerm(restaurant.restaurantName);
    setShowDropdown(false);
  };

  return (
    <div className="container mx-auto  py-6 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Admin Notification Center</h1>

      {/* Notification Form */}
      <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Send Notification</h2>
        <textarea
          className="w-full p-3 border rounded-md mb-4"
          placeholder="Enter notification message"
          value={notificationMessage}
          onChange={(e) => setNotificationMessage(e.target.value)}
          rows="4"
        />
        <div className="relative mb-4">
          <label className="block text-gray-700 font-semibold">Send to:</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md mt-2"
            placeholder="Search restaurants"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && searchTerm && (
            <div className="absolute bg-white border mt-2 rounded-md w-full max-h-60 overflow-y-auto shadow-lg z-10">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleRestaurantSelect(restaurant)}
                  >
                    {restaurant.restaurantName}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No matching restaurants</div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleSendNotification}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Send Notification
        </button>
      </div>

      {/* Sent Notifications */}
      <div className="bg-white  shadow-lg rounded-lg ">
        <h2 className="text-xl font-bold mb-4">Sent Notifications</h2>
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Target</th>
            </tr>
          </thead>
          <tbody>
            {sentNotifications.map((notification) => {
              const restaurantName = notification.recipientId
                ? restaurants.find((r) => r.id === notification.recipientId)?.restaurantName
                : "All Restaurants";
              return (
                <tr key={notification.id}>
                  <td className="px-4 py-2 border">{notification.timestamp}</td>
                  <td className="px-4 py-2 border">{notification.message}</td>
                  <td className="px-4 py-2 border">{restaurantName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotificationPage;
