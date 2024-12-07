"use client";
import React, { useState, useEffect } from "react";

const AdminNotificationPage = () => {
  const [restaurants, setRestaurants] = useState([]); // List of all restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Selected restaurant (optional for specific users)
  const [notificationMessage, setNotificationMessage] = useState(""); // Notification content
  const [sentNotifications, setSentNotifications] = useState([]); // List of sent notifications

  // Example restaurant list - ideally, this would be fetched from your backend
  useEffect(() => {
    setRestaurants([
      { id: 1, name: "Restaurant A" },
      { id: 2, name: "Restaurant B" },
      { id: 3, name: "Restaurant C" },
    ]);
  }, []);

  // Handle sending notification
  const handleSendNotification = () => {
    if (!notificationMessage) return alert("Please enter a notification message.");

    // Create a notification object
    const newNotification = {
      id: Date.now(),
      message: notificationMessage,
      target: selectedRestaurant ? selectedRestaurant.name : "All Restaurants", // Either a specific restaurant or all
      date: new Date().toLocaleString(),
    };

    // Send notification to backend (here, we're just adding it to the list)
    setSentNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    // Clear form
    setNotificationMessage("");
    setSelectedRestaurant(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Notification Center</h1>

      {/* Notification Form */}
      <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Send Notification</h2>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Enter notification message"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Send to:</label>
          <select
            className="w-full p-3 border rounded-md mt-2"
            value={selectedRestaurant ? selectedRestaurant.id : "all"}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (selectedId === "all") {
                setSelectedRestaurant(null);
              } else {
                setSelectedRestaurant(
                  restaurants.find((rest) => rest.id === Number(selectedId))
                );
              }
            }}
          >
            <option value="all">All Restaurants</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSendNotification}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Send Notification
        </button>
      </div>

      {/* Sent Notifications */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sent Notifications</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Target</th>
            </tr>
          </thead>
          <tbody>
            {sentNotifications.map((notification) => (
              <tr key={notification.id}>
                <td className="px-4 py-2 border">{notification.date}</td>
                <td className="px-4 py-2 border">{notification.message}</td>
                <td className="px-4 py-2 border">{notification.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotificationPage;
