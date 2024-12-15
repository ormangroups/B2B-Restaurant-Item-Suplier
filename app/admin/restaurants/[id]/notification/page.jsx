"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi"; // Assuming you are using Axios for HTTP requests

const NotificationPage = ({ params }) => {
  const { id } = params; // Restaurant ID
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
  });

  // Fetch notifications when the component is mounted
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.getNotificationsForUser(id); // Ensure you await the response here
        if (response ) {
          setNotifications(response); // Assuming the backend returns notifications as an array
        } else {
          setNotifications([]); // If no data is returned, set to empty array
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Handle errors by setting an empty array
      }
    };

    fetchNotifications();
  }, [id]);

  // Handle sending notifications to the restaurant
  const handleSendNotification = async (e) => {
    e.preventDefault();

    const newNotification = {
      recipientId: id, // Send to the specific restaurant
      message: notificationForm.message,
      isRead: false, // New notification is unread
      timestamp: new Date().toISOString(),
    };

    try {
      // Send the notification to the backend (ensure this route is available)
      const response = await api.sendToUser(id, notificationForm.message);
      setNotifications((prev) => [response.data, ...prev]);

      // Clear the form
      setNotificationForm({ title: "", message: "" });

      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800">Notifications for Restaurant {id}</h1>

      {/* Send Notification Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Send Notification</h2>
        <form onSubmit={handleSendNotification} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={notificationForm.title}
              onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Message</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              rows="4"
              value={notificationForm.message}
              onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Notification
          </button>
        </form>
      </div>

      {/* Notification History */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification History</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-gray-500 text-sm">{new Date(notification.timestamp).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications sent yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
