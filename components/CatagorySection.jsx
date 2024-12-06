"use client";

import React from "react";
import ProductCard from "./ProductCard";

const CategorySection = ({ title, products, onSeeAll }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{title}</h2>
        <button
          onClick={onSeeAll}
          style={{ background: "none", color: "red", border: "none", cursor: "pointer" }}
        >
          See All
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
