"use client";
import "../../../styles/components.css";
import { useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import api from "@/app/api/mainapi"; // Assuming the API file is located here
import { setFavorites, removeFavorite } from "../../redux/slices/favoritesSlice";
import { addToCart } from "../../redux/slices/cartSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();

  // Retrieve the favorites from the Redux store
  const favorites = useSelector((state) => state.favorites?.favorites || []);
  const cart = useSelector((state) => state.cart);

  const restaurantId = "your-restaurant-id"; // Replace with the actual restaurant ID

  useEffect(() => {
    // Fetch favorite items from the API and set them in the Redux store
    const fetchFavorites = async () => {
      try {
        const data = await api.getFavoriteList(restaurantId);
        dispatch(setFavorites(data)); // Update the Redux state with the fetched data
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  const handleAddToCart = async (item, quantity) => {
    try {
      const orderItem = { productId: item.id, quantity: parseInt(quantity) };
      await api.addToCart(restaurantId, orderItem);
      dispatch(addToCart({ ...item, quantity: parseInt(quantity) })); // Add item to cart in Redux
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleRemoveFavorite = async (item) => {
    try {
      await api.removeFavorite(item.id);
      dispatch(removeFavorite(item.id)); // Remove item from favorites in Redux
      alert("Item removed from favorites successfully!");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  // Fallback for when favorites is not an array or is empty
  if (!Array.isArray(favorites) || favorites.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-6">
        Your favorite list is empty!
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-start mb-6">
        Favorites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover"
            />

            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.description}</p>

              {/* Quantity and Add to Cart */}
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
                    className="w-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
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

                {/* Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveFavorite(item)}
                    className="text-red-500 hover:text-red-600 text-lg transition"
                    title="Remove from Favorites"
                  >
                    <CiTrash />
                  </button>
                </div>
              </div>
              <div className="w-full mt-2">
                <button
                  onClick={() => {
                    const quantity = document.getElementById(`quantity-${item.id}`).value;
                    handleAddToCart(item, quantity);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white w-full font-medium py-2 px-4 rounded-md transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
