"use client"
import React, { useState } from "react";
import { FaEdit, FaSave, FaMapMarkerAlt, FaPhone, FaStore, FaEnvelope } from "react-icons/fa";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Outlet Information State
  const [outletInfo, setOutletInfo] = useState({
    name: "Orman Restaurant",
    address: "123 Main Street, New York, NY",
    phone: "+1 234 567 890",
    email: "contact@orman.com",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutletInfo({ ...outletInfo, [name]: value });
  };

  // Handle Save
  const handleSave = () => {
    setIsEditing(false);
    // Save logic (e.g., API call) can be added here
    console.log("Saved outlet information:", outletInfo);
  };

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
                name="name"
                value={outletInfo.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{outletInfo.name}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={outletInfo.address}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{outletInfo.address}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <FaPhone className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={outletInfo.phone}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{outletInfo.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center">
            <FaEnvelope className="text-red-500 text-xl mr-4" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={outletInfo.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{outletInfo.email}</p>
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
