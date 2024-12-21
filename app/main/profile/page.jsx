"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaMapMarkerAlt, FaPhone, FaStore, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import api from "@/app/api/mainapi";// Import your API instance

const EditableField = ({ icon, label, name, value, isEditing, onChange }) => (
  <div className="flex items-center">
    {icon}
    {isEditing ? (
      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    ) : (
      <p className="text-lg text-gray-700 font-medium">{value || `Enter ${label}`}</p>
    )}
  </div>
);

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  // Local state for editing
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: "",
    restaurantAddress: "",
    contactNumber: "",
    email: "",
    GSTIN: "",
    password: "", // Password should remain blank unless explicitly edited
  });

  // Fetch restaurant data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.getRestaurantById(restaurantId);
        setRestaurantInfo(response);
      } catch (error) {
        console.error("Failed to fetch restaurant information:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) {
      fetchData();
    }
  }, [restaurantId]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo({ ...restaurantInfo, [name]: value });
  };

  // Handle Save
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // API call to update the restaurant information
      await api.updateRestaurant(restaurantId, restaurantInfo);
      setIsEditing(false);

      // Dispatch updated restaurant data to Redux
      dispatch({ type: "UPDATE_RESTAURANT", payload: restaurantInfo });
    } catch (error) {
      console.error("Failed to update outlet information:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Outlet Information</h1>
        {isLoading ? (
           <div className="fixed inset-0 flex items-center justify-center bg-white "> <div className="flex flex-col items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div> <h2 className="text-center text-lg font-semibold">Loading...</h2> <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p> </div> </div>
        ) : (
          <>
            {/* Outlet Info Section */}
            <div className="space-y-6">
              <EditableField
                icon={<FaStore className="text-red-500 text-xl mr-4" />}
                label="Restaurant Name"
                name="restaurantName"
                value={restaurantInfo.restaurantName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <EditableField
                icon={<FaMapMarkerAlt className="text-red-500 text-xl mr-4" />}
                label="Address"
                name="restaurantAddress"
                value={restaurantInfo.restaurantAddress}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <EditableField
                icon={<FaPhone className="text-red-500 text-xl mr-4" />}
                label="Phone Number"
                name="contactNumber"
                value={restaurantInfo.contactNumber}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <EditableField
                icon={<FaEnvelope className="text-red-500 text-xl mr-4" />}
                label="Email"
                name="email"
                value={restaurantInfo.email}
                isEditing={isEditing}
                onChange={handleChange}
              />
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
