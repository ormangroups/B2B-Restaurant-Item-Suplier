"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite} from "../app/redux/slices/favoritesSlice";
import {addToCart } from "../app/redux/slices/cartSlice";
import api from "@/app/api/mainapi";
import "../styles/global.css";

const CategorySection = ({ title, constantPrice, products, onSeeAll }) => {
  const dispatch = useDispatch();
  
  // Get favorites from Redux store
  const favorites = useSelector((state) => state.favorites.favorites || []); // Ensure it's always an array

  const [selectedQuantity, setSelectedQuantity] = useState({});

  const toggleFavorite = async (id) => {
    try {
      if (favorites.includes(id)) {
        await api.removeFavorite(id);
        dispatch(removeFavorite({ id }));
      } else {
        await api.addFavorite(id);
        dispatch(addFavorite(id));
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error.message);
    }
  };

  const handleQuantityChange = (id, change) => {
    setSelectedQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleAddToCart = async (id) => {
    const quantity = selectedQuantity[id] || 1;
    try {
      await api.addToCart(id, quantity);
      dispatch(addToCart({ id, quantity }));
      alert("Item added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
    }
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

              {/* Price Section */}
              {!constantPrice && product.price && (
                <p className="text-gray-700 font-semibold mt-2">
                  ₹{product.price}{" "}
                  <span className="text-sm text-gray-500">(per {product.unit})</span>
                </p>
              )}

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
                      [product.id]: Math.max(1, parseInt(e.target.value) || 1),
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
              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full w-full text-center"
              >
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
