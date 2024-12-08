"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditRestaurantPage = ({ params }) => {
  const { id } = params; // Restaurant ID from the URL
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ownerName: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulated fetch for restaurant data
    // Replace this with an API call
    setFormData({
      email: `restaurant${id}@example.com`,
      password: "defaultpassword",
      ownerName: `Owner ${id}`,
      contactNumber: "123-456-7890",
    });
  }, [id]);

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
      // Simulate API call for updating restaurant details
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with actual API call

      setMessage({ type: "success", text: "Restaurant details updated successfully!" });

      // Redirect to restaurant details page after successful update
      router.push(`/admin/restaurants/${id}`);
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Restaurant</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
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
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
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
          <label htmlFor="ownerName" className="block text-gray-700 font-medium mb-2">
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
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
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Details"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/restaurants/${id}`)}
            className="bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurantPage;
