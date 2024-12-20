"use client"; // Ensure this is at the very top

import "../../../styles/components.css";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import api from "@/app/api/mainapi"; // Assuming the API file is located here
import { setFavorites, removeFavorite } from "../../redux/slices/favoritesSlice";
import { addToCart, setCartItems } from "../../redux/slices/cartSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();

  // Retrieve the favorites and cart items from the Redux store
  const favorites = useSelector((state) => state.favorites?.favorites || []);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  // Fetch favorite items and cart items on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await api.getFavoriteList(restaurantId);
        dispatch(setFavorites(data));
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const data = await api.getCartItems(restaurantId);
        dispatch(setCartItems(data));
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    if (restaurantId) {
      fetchFavorites();
      fetchCartItems();
    }
  }, [dispatch, restaurantId]);

  // Handle adding items to the cart
  const handleAddToCart = async (item, quantity) => {
    try {
      const orderItem = { product: item, quantity:quantity,price:(item.price*quantity)};
      await api.addToCart(restaurantId, orderItem);
      const updatedCart = await api.getCartItems(restaurantId);
      dispatch(setCartItems(updatedCart));
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  // Handle removing items from favorites
  const handleRemoveFavorite = async (item) => {
    try {
      dispatch(removeFavorite(item));
      await api.removeFavorite(restaurantId, item);
      alert("Item removed from favorites successfully!");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Failed to remove item from favorites.");
    }
  };

  // Check if an item is already in the cart
  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.product?.id === itemId);
  };

  // Render fallback if there are no favorites
  if (!favorites.length) {
    return (
      <p className="text-center text-gray-600 mt-6">
        Your favorite list is empty!
      </p>
    );
  }

  return (
    <div className="container mx-auto px-2 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-start mb-6">
        Favorites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 sm:mb-1 lg:mb-0">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-1">Price: ₹{item.price}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => {
                      const input = document.getElementById(`quantity-${item.id}`);
                      input.stepDown();
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    defaultValue="1"
                    className="w-12 text-center border border-gray-300 rounded-md"
                  />
                  <button
                    className="text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => {
                      const input = document.getElementById(`quantity-${item.id}`);
                      input.stepUp();
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    handleAddToCart(
                      item,
                      parseInt(
                        document.getElementById(`quantity-${item.id}`).value
                      )
                    )
                  }
                  className={`py-2 px-4 rounded-md ${
                    isItemInCart(item.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  disabled={isItemInCart(item.id)}
                >
                  {isItemInCart(item.id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
              <button
                onClick={() => handleRemoveFavorite(item)}
                className="mt-4 text-red-500 flex items-center space-x-1"
              >
                <CiTrash />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
