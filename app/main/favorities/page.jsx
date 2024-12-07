"use client";
import "../../../styles/components.css";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Kashmiri Chilli Powder",
      description: "500 gm pack - Premium quality spice.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Cling Film Roll",
      description: "1.4 Kg roll - Ideal for food packaging.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Rectangle Container with Lid",
      description: "Pack of 50 - 14-750 ml capacity.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Ajinomoto (MSG)",
      description: "500 gm pack - Enhances flavor in dishes.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const newItem = { ...item, quantity: parseInt(quantity) };
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += parseInt(quantity);
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
    }
  };

  const removeFavorite = (item) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return <p className="text-center text-gray-600 mt-6">Your favorite list is empty!</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 text-start my-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />

            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap items-center justify-between mt-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
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
                    className="w-12 text-center border border-gray-300 rounded"
                  />
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition duration-200"
                    onClick={() => {
                      const input = document.getElementById(`quantity-${item.id}`);
                      input.stepUp();
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => removeFavorite(item)}
                    className="text-red-600 hover:text-red-700 text-lg transition duration-200"
                    title="Remove from Favorites"
                  >
                    <CiTrash />
                  </button>
                  <button
                    onClick={() => {
                      const quantity = document.getElementById(`quantity-${item.id}`).value;
                      addToCart(item, quantity);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
