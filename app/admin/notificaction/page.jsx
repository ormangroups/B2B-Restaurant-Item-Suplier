"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi"; // Assuming the API methods are in this file

const AdminNotificationPage = () => {
  const [restaurants, setRestaurants] = useState([]); // List of all restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Selected restaurant
  const [notificationMessage, setNotificationMessage] = useState(""); // Notification content
  const [sentNotifications, setSentNotifications] = useState([]); // List of sent notifications
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering restaurants
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility control

  // Fetch restaurants from the backend on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.getAllRestaurants(); // Assuming this method exists in your API
        setRestaurants(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await api.getAllNotifications(); // Assuming this method exists in your API
        setSentNotifications(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchRestaurants();
    fetchNotifications();
  }, []);

  // Handle sending notification
  const handleSendNotification = async () => {
    if (!notificationMessage) return alert("Please enter a notification message.");

    const recipientId = selectedRestaurant ? selectedRestaurant.id : null; // If no restaurant selected, set recipientId to null

    // Create a notification object to send to the backend
    const newNotification = {
      message: notificationMessage,
      recipientId: recipientId, // Set recipientId based on the selected restaurant or null
    };

    try {
      // Send notification to backend (you may need to adjust this to match the backend endpoint)
      await api.createNotification(newNotification);

      // Fetch the latest notifications after sending
      const updatedNotifications = await api.getAllNotifications();
      setSentNotifications(updatedNotifications);

      // Reset input fields after sending notification
      setNotificationMessage("");
      setSelectedRestaurant(null);
      setSearchTerm(""); 
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Filter restaurants based on the search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the click event when a restaurant is selected
  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSearchTerm(restaurant.restaurantName); // Set the search term to the selected restaurant's name
    setShowDropdown(false); // Close the dropdown after selecting
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

        {/* Searchable Restaurant Input */}
        <div className="relative mb-4">
          <label className="block text-gray-700 font-semibold">Send to:</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md mt-2"
            placeholder="Search restaurants"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true); // Show dropdown when typing
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Hide dropdown when input loses focus
            onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
          />
          
          {/* Dropdown showing filtered restaurants */}
          {showDropdown && searchTerm && (
            <div
              className="absolute bg-white border mt-2 rounded-md w-full max-h-60 overflow-y-auto shadow-lg"
              style={{ zIndex: 10 }} // Ensure dropdown is on top of other elements
            >
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

        {/* Send Notification Button */}
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
  {sentNotifications.map((notification) => {
    // Find the restaurant name based on recipientId
    const restaurantName = notification.recipientId
      ? restaurants.find((r) => r.id === notification.recipientId)?.restaurantName
      : null;

    return (
      <tr key={notification.id}>
        <td className="px-4 py-2 border">{notification.timestamp}</td>
        <td className="px-4 py-2 border">{notification.message}</td>
        <td className="px-4 py-2 border">
          {notification.recipientId === null
            ? "All Restaurants"
            : restaurantName || notification.target || notification.recipientId}
        </td>
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
