import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", textAlign: "center", padding: "10px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 auto" }}
      />
      <h4 style={{ margin: "10px 0" }}>{product.name}</h4>
    </div>
  );
};

export default ProductCard;
