"use client";

import React from "react";
import CategorySection from "@/components/CatagorySection";

const MainSection = () => {
  const categories = [
    {
      title: "Fruits & Vegetables",
      constantPrice: 50, // Constant price for this category
      products: [
        { id: 1, name: "Indian Vegetables", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Tomato, Onion, Potato", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Exotic Vegetables", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      title: "Dairy",
      constantPrice: null, // Variable price for each product
      products: [
        { id: 4, name: "Cream", price: 100, image: "https://via.placeholder.com/100" },
        { id: 5, name: "Butter", price: 150, image: "https://via.placeholder.com/100" },
        { id: 6, name: "Cheese", price: 200, image: "https://via.placeholder.com/100" },
      ],
    },
  ];

  const handleSeeAll = (categoryTitle) => {
    alert(`See all clicked for ${categoryTitle}`);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Categories</h1>
      {categories.map((category, index) => (
        <CategorySection
          key={index}
          title={category.title}
          constantPrice={category.constantPrice}
          products={category.products}
          onSeeAll={() => handleSeeAll(category.title)}
        />
      ))}
    </div>
  );
};

export default MainSection;
