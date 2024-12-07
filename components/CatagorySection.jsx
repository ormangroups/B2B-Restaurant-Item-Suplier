"use client";

import React, { useState } from "react";
import "../styles/global.css";

const CategorySection = ({ title, constantPrice, products, onSeeAll }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id, change) => {
    setSelectedQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  return (
    <div className="my-10">
      {/* Title and See All Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          {title}{" "}
          {constantPrice && (
            <span className="text-lg text-gray-600 ml-2">₹{constantPrice}</span>
          )}
        </h2>
        <button
          onClick={onSeeAll}
          className="text-blue-600 hover:text-blue-800 transition font-medium text-base"
        >
          See All →
        </button>
      </div>

      {/* Horizontal Scrollable Products */}
      <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] bg-white shadow-md hover:shadow-lg rounded-lg p-4 flex-shrink-0 transition transform hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              {/* Favorite Button */}
              <button
                className={`absolute top-2 right-2 px-3 py-1 rounded-full ${
                  favorites.includes(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                } shadow hover:bg-red-500 hover:text-white transition`}
                onClick={() => toggleFavorite(product.id)}
              >
                ♥
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {product.name}
              </h3>
              {/* Product Tags (SuperSaver, ISO Certified, etc.) */}
              <div className="flex space-x-2 mt-2">
                {product.superSaver && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    SUPERSAVER
                  </span>
                )}
                {product.isoCertified && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    ISO CERTIFIED
                  </span>
                )}
                {product.bestQuality && (
                  <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                    BEST QUALITY & YIELD
                  </span>
                )}
              </div>

              {/* Show price */}
              {!constantPrice && product.price && (
                <p className="text-gray-700 font-semibold mt-2">
                  ₹{product.price} <span className="text-sm text-gray-500">(per {product.unit})</span>
                </p>
              )}

              {/* Price Variants */}
              {product.priceVariants &&
                product.priceVariants.map((variant, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="text-sm text-gray-600">
                      ₹{variant.price} for {variant.quantity}
                    </p>
                    <button
                      className="text-blue-500 text-sm hover:text-blue-700 mt-1"
                      onClick={() => handleQuantityChange(product.id, variant.quantity)}
                    >
                      Add {variant.quantity}
                    </button>
                  </div>
                ))}

              {/* Add/Quantity Button */}
              <div className="flex items-center mt-4 space-x-2">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedQuantity[product.id] || 1}
                  min="1"
                  className="w-12 text-center border border-gray-300 rounded"
                  onChange={(e) =>
                    setSelectedQuantity({
                      ...selectedQuantity,
                      [product.id]: Math.max(1, e.target.value),
                    })
                  }
                />
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full w-full text-center">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
