"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";

const NotificationPage = ({ params }) => {
  const { id } = params; // Restaurant ID
  const [notifications, setNotifications] = useState([]); // Notifications list
  const [notificationForm, setNotificationForm] = useState({
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for better UX

  // Fetch notifications when the component is mounted
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await api.getNotificationsForUser(id);
        if (response && Array.isArray(response)) {
          setNotifications(response); // Assume response is an array of notifications
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        alert("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id]);

  // Handle sending notifications
  const handleSendNotification = async (e) => {
    e.preventDefault();

    // Basic validation for an empty message
    if (!notificationForm.message.trim()) {
      alert("Notification message cannot be empty.");
      return;
    }

    const newNotification = {
      recipientId: id,
      message: notificationForm.message,
      isRead: false, // Default value for new notifications
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await api.createNotification(newNotification);
      if (response) {
        setNotifications((prev) => [response, ...prev]); // Prepend the new notification
      }

      // Reset the form
      setNotificationForm({ message: "" });
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Notifications for Restaurant {id}
      </h1>

      {/* Send Notification Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Send Notification</h2>
        <form onSubmit={handleSendNotification} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Message</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              rows="4"
              value={notificationForm.message}
              onChange={(e) =>
                setNotificationForm({ ...notificationForm, message: e.target.value })
              }
              placeholder="Enter your notification message..."
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
        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id || notification.timestamp} // Unique identifier fallback
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-gray-600">
                  {notification.message || "No message provided"}
                </p>
                <span className="text-gray-500 text-sm">
                  {notification.timestamp
                    ? new Date(notification.timestamp).toLocaleString()
                    : "No timestamp available"}
                </span>
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
