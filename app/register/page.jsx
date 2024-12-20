"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/mainapi";

const RestaurantRegistrationPage = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    contactNumber: "",
    email: "",
    password: "",
    gstin: "", // New GSTIN field
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.createRestaurant(formData);
      setMessage({ type: "success", text: "Restaurant registered successfully!" });
      setFormData({
        restaurantName: "",
        restaurantAddress: "",
        contactNumber: "",
        email: "",
        password: "",
        gstin: "",
      });

      // Redirect to admin restaurant list after successful registration
      router.push("/admin/restaurants");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Register Restaurant
        </h1>

        {message && (
          <div
            className={`text-center px-4 py-2 rounded-md mb-4 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="restaurantName"
              className="block text-gray-700 font-medium mb-2"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="restaurantAddress"
              className="block text-gray-700 font-medium mb-2"
            >
              Restaurant Address
            </label>
            <input
              type="text"
              id="restaurantAddress"
              name="restaurantAddress"
              value={formData.restaurantAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gstin"
              className="block text-gray-700 font-medium mb-2"
            >
              GSTIN (Optional)
            </label>
            <input
              type="text"
              id="gstin"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantRegistrationPage;
