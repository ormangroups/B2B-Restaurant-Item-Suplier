"use client";

import React, { useState } from "react";
import { FaEdit, FaSave, FaMapMarkerAlt, FaPhone, FaStore, FaEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import api from "@/app/api/mainapi"; // Import your API instance

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Access the restaurant information from Redux state
  const restaurant = useSelector(state => state.user.restaurant || {});
  const dispatch = useDispatch();

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update local state for editing
    setRestaurantInfo({ ...restaurantInfo, [name]: value });
  };

  // Handle Save
  const handleSave = async () => {
    try {
      // API call to update the restaurant information
      await api.updateRestaurant(restaurant); // Adjust the API call as per your backend design
      alert("Outlet information updated successfully!");
      setIsEditing(false);
      // Optionally, dispatch the updated restaurant data to Redux
      dispatch({ type: 'UPDATE_RESTAURANT', payload: restaurant });
    } catch (error) {
      console.error("Failed to update outlet information:", error.message);
      alert("Failed to update outlet information. Please try again.");
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>; // Placeholder if restaurant data is not available
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Outlet Information</h1>

        {/* Outlet Info Section */}
        <div className="space-y-6">
          {/* Outlet Name */}
          <div className="flex items-center">
            <FaStore className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="text"
                name="restaurantName"
                value={restaurant.restaurantName}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{restaurant.restaurantName}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="text"
                name="restaurantAddress"
                value={restaurant.restaurantAddress}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{restaurant.restaurantAddress}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <FaPhone className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="text"
                name="contactNumber"
                value={restaurant.contactNumber}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{restaurant.contactNumber}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center">
            <FaEnvelope className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{restaurant.email}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-200"
            >
              <FaSave className="mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
