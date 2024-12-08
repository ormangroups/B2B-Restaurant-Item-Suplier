"use client";
import React from "react";

const ItemCard = ({ item, category }) => {
  return (
    <div className="flex-shrink-0 w-[250px] bg-gray-100 shadow rounded-lg p-4">
      <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-3" />
      <h3 className="text-lg font-semibold">{item.name}</h3>
      {category.isVariablePricing && <p className="text-gray-600">Price: ${item.price}</p>}
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
        <button
          className={`px-3 py-1 rounded ${
            item.isAvailable ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-gray-700"
          }`}
        >
          {item.isAvailable ? "Available" : "Disabled"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
