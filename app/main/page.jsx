"use client";

import React from "react";
import CategorySection from "@/components/CatagorySection";

const MainSection = () => {
  const categories = [
    {
      title: "Fruits & Vegetables",
      products: [
        { id: 1, name: "Indian Vegetables", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Tomato, Onion, Potato", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Exotic Vegetables", image: "https://via.placeholder.com/100" },
        { id: 4, name: "Leafy Vegetables", image: "https://via.placeholder.com/100" },
      ],
    },
    {
      title: "Dairy",
      products: [
        { id: 1, name: "Cream", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Butter", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Milk & Milk Powder", image: "https://via.placeholder.com/100" },
        { id: 4, name: "Cheese", image: "https://via.placeholder.com/100" },
      ],
    },
  ];

  const handleSeeAll = (categoryTitle) => {
    alert(`See all clicked for ${categoryTitle}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {categories.map((category, index) => (
        <CategorySection
          key={index}
          title={category.title}
          products={category.products}
          onSeeAll={() => handleSeeAll(category.title)}
        />
      ))}
    </div>
  );
};

export default MainSection;
