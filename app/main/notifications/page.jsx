"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";
import {  useSelector } from "react-redux";

const Notifications = () => {
  const [userNotifications, setUserNotifications] = useState([]); // Notifications for the user
  const [unassignedNotifications, setUnassignedNotifications] = useState([]); // Unassigned notifications
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);
  // Fetch notifications when the component mounts
  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        // Fetch notifications for the user
        const userData = await api.getNotificationsForUser(restaurantId);
        setUserNotifications(userData);

        // Fetch unassigned notifications
        const unassignedData = await api.getUnassignedNotifications();
        setUnassignedNotifications(unassignedData);
      } catch (error) {
        setError("Failed to fetch notifications"); // Handle error
      } finally {
        setLoading(false);
      }
    };

    loadNotifications(); // Load notifications on mount
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white "> <div className="flex flex-col items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div> <h2 className="text-center text-lg font-semibold">Loading...</h2> <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p> </div> </div>
    ); // Show loading state
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    ); // Show error state
  }

  // Combine notifications and sort them by timestamp (newest first)
  const combinedNotifications = [...userNotifications, ...unassignedNotifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="p-4 sticky top-0 bg-white shadow-md z-10">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {combinedNotifications.length > 0 ? (
          <div className="space-y-4">
            {combinedNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No notifications to show.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
        You’re all caught up! 🎉
      </div>
    </div>
  );
};

export default Notifications;
