"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  // Import axios for API calls
import api from "@/app/api/mainapi";

const EditRestaurantPage = ({ params }) => {
  const { id } = params; // Restaurant ID from the URL
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    email: "",
    password: "",
    contactNumber: "",
    isActive: true, // Assuming restaurant is active by default
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  // Fetch restaurant data on page load
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // Fetch restaurant data by ID
        const response = await api.getRestaurantById(`${id}`);
        setFormData({
          ...response, // Assuming the response data matches the form structure
        });
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setMessage({
          type: "error",
          text: "Failed to load restaurant data",
        });
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // API call to update the restaurant
      const response = await api.updateRestaurant(`${id}`,formData);

      if (response.status === 200) {
        setMessage({ type: "success", text: "Restaurant details updated successfully!" });
        // Redirect to restaurant details page after successful update
        setTimeout(() => router.push(`/admin/restaurants/${id}`), 2000);
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Edit Restaurant</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        {message && (
          <div
            className={`text-center px-4 py-2 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Restaurant Name Field */}
        <div className="relative">
          <label htmlFor="restaurantName" className="block text-gray-700 font-medium mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Restaurant Address Field */}
        <div className="relative">
          <label htmlFor="restaurantAddress" className="block text-gray-700 font-medium mb-2">
            Restaurant Address
          </label>
          <input
            type="text"
            id="restaurantAddress"
            name="restaurantAddress"
            value={formData.restaurantAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Contact Number Field */}
        <div className="relative">
          <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        {/* Active Status */}
        <div className="relative">
          <label htmlFor="isActive" className="block text-gray-700 font-medium mb-2">
            Active Status
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                <span className="ml-2">Updating...</span>
              </div>
            ) : (
              "Update Details"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/restaurants/${id}`)}
            className="bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurantPage;
