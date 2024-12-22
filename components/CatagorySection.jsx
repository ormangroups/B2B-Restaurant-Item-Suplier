"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../app/redux/slices/favoritesSlice";
import { addToCart, setCartItems } from "../app/redux/slices/cartSlice";
import api from "@/app/api/mainapi";
import "../styles/global.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

export const CategorySection = ({ title, constantPrice, products, onSeeAll }) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  // Redux states for favorites and cart
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const cart = useSelector((state) => state.cart.items || []);
  const [selectedQuantity, setSelectedQuantity] = useState({});

  // Initialize quantities for available products
  useEffect(() => {
    const initialQuantities = {};
    products.forEach((product) => {
      if (product.available) initialQuantities[product.id] = 1;
    });
    setSelectedQuantity(initialQuantities);
  }, [products]);

  // Fetch favorites and cart items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!restaurantId) throw new Error("Restaurant ID is not available.");

        const fetchedFavorites = await api.getFavoriteList(restaurantId);
        const fetchedCart = await api.getCartItems(restaurantId);
        
        dispatch(setFavorites(fetchedFavorites));
        dispatch(setCartItems(fetchedCart));
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      }
    };

    fetchData();
  }, [restaurantId, dispatch]);

  // Optimistically toggle favorite status for a product
  const toggleFavorite = async (product) => {
    try {
      if (!restaurantId) throw new Error("Restaurant ID is not available.");

      // Check if the product is already a favorite
      const isFavorite = favorites.some((fav) => fav.id === product.id);

      if (isFavorite) {
        // Optimistically update state
        dispatch(removeFavorite(product.id));

        // Remove from favorites via API
        await api.removeFavorite(restaurantId, product);
      } else {
        // Optimistically update state
        dispatch(addFavorite(product));

        // Add to favorites via API
        await api.addFavorite(restaurantId, product);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error.message);
      // Revert state update if API call fails
      dispatch(setFavorites(await api.getFavoriteList(restaurantId)));
    }
  };

  // Handle quantity change for products
  const handleQuantityChange = (id, change) => {
    setSelectedQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  // Optimistically add product to cart and update Redux state
  const handleAddToCart = async (product) => {
    try {
      if (!restaurantId) throw new Error("Restaurant ID is not available.");

      const quantity = selectedQuantity[product.id] || 1;
      const price = product.price * quantity;
      const orderItem = { product, quantity, price };

      // Optimistically update state
      dispatch(addToCart(orderItem));

      // Add item to the cart via API
      await api.addToCart(restaurantId, orderItem);

      // Fetch the updated cart from the API
      const updatedCart = await api.getCartItems(restaurantId);

      // Update Redux state
      dispatch(setCartItems(updatedCart));
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
      // Revert state update if API call fails
      dispatch(setCartItems(await api.getCartItems(restaurantId)));
    }
  };

  return (
    <div className="my-10">
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

      <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
        {products
          .filter((product) => product.available)
          .map((product) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id);
            const isInCart = cart.some((cartItem) => cartItem.product?.id === product.id);

            return (
              <div
                key={product.id}
                className="min-w-[220px] bg-white shadow-md hover:shadow-lg rounded-lg p-4 flex-shrink-0 transition transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-40 object-cover rounded-lg"
                  />
                  <button
                    className={`absolute top-2 right-2 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                    onClick={() => toggleFavorite(product)}
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {product.name}
                  </h3>
                  {!constantPrice && product.price && (
                    <p className="text-gray-700 font-semibold mt-2">
                      ₹{product.price}{" "}
                      <span className="text-sm text-gray-500">
                        (per {product.unit})
                      </span>
                    </p>
                  )}

                  <div className="flex items-center mt-4 space-x-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded"
                      aria-label="Decrease quantity"
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
                          [product.id]: Math.max(
                            1,
                            parseInt(e.target.value) || 1
                          ),
                        })
                      }
                      aria-label="Product quantity"
                    />
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-4 py-2 px-6 rounded-full w-full text-center transition ${
                      isInCart
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    aria-label="Add to cart"
                    disabled={isInCart}
                  >
                    {isInCart ? "Already in Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
