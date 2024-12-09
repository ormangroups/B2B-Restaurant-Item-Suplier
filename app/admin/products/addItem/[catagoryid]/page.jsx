"use client";
import React, { useState } from "react";

const AddItem = ({ params }) => {
  const { categoryId } = params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle item submission
    const newItem = {
      categoryId,
      name,
      price: parseFloat(price) || 0,
      image: imageUrl,
      isAvailable,
    };
    console.log("New Item:", newItem);
    // Perform API call or state update
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form className="bg-white shadow rounded-lg p-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Item</h1>

        <label className="block mb-4">
          <span className="text-gray-700">Item Name</span>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Price</span>
          <input
            type="number"
            step="0.01"
            className="w-full mt-1 border-gray-300 rounded shadow"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Image URL</span>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded shadow"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          Available
        </label>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
