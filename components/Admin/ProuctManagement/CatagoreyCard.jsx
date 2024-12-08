"use client";
import React from "react";
import ItemCard from "./ItemCard";

const CategoryCard = ({ category, items, onAddItem, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onEditCategory(category.id)}
          >
            Edit Category
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onDeleteCategory(category.id)}
          >
            Delete Category
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => onAddItem(category.id)}
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="overflow-x-auto flex gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
