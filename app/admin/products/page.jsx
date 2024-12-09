"use client";
import React, { useState } from "react";
import CategoryCard from "@/components/Admin/ProuctManagement/CatagoreyCard";

const ProductManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Beverages", isVariablePricing: true },
    { id: 2, name: "Snacks", isVariablePricing: false },
  ]);

  const [items, setItems] = useState([
    { id: 1, name: "Coffee", image: "/coffee.jpg", price: 3, isAvailable: true, categoryId: 1 },
    { id: 2, name: "Tea", image: "/tea.jpg", price: 2, isAvailable: false, categoryId: 1 },
    { id: 3, name: "Chips", image: "/chips.jpg", price: 1, isAvailable: true, categoryId: 2 },
  ]);

  const handleAddItem = (categoryId) => {
    window.location.href = `/admin/products/addItem/${categoryId}`;
  };

  const handleEditCategory = (categoryId) => {
    // Handle edit category logic
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          onClick={() => (window.location.href = "/admin/products/addCategory")}
        >
          Add Category
        </button>
      </div>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          items={items.filter((item) => item.categoryId === category.id)}
          onAddItem={handleAddItem}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      ))}
    </div>
  );
};

export default ProductManagement;
