"use client";
import React, { useState, useEffect } from "react";

const NotificationPage = ({ params }) => {
  const { id } = params; // Restaurant ID
  const [notifications, setNotifications] = useState([]);
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    // Simulated fetch for notifications
    setNotifications([
      { id: 1, title: "Welcome!", message: "Thanks for joining us!", date: "2024-12-01" },
      { id: 2, title: "Update", message: "Your account has been updated.", date: "2024-12-05" },
    ]);
  }, []);

  const handleSendNotification = (e) => {
    e.preventDefault();
    const newNotification = {
      id: notifications.length + 1,
      title: notificationForm.title,
      message: notificationForm.message,
      date: new Date().toISOString().split("T")[0],
    };

    // Add the new notification
    setNotifications((prev) => [newNotification, ...prev]);

    // Clear form
    setNotificationForm({ title: "", message: "" });

    alert("Notification sent successfully!");
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
                <h3 className="font-bold text-gray-800">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-gray-500 text-sm">{notification.date}</span>
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
