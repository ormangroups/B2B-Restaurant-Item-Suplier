"use client";
import React, { useState } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [isVariablePricing, setIsVariablePricing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle category submission
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form className="bg-white shadow rounded-lg p-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Category Name</span>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={isVariablePricing}
            onChange={(e) => setIsVariablePricing(e.target.checked)}
          />
          Variable Pricing
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
