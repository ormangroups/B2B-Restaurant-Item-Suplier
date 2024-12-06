// main/favorites/page.jsx
"use client";
import "../../../styles/components.css"
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([ {
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
  },]);
 

  // Fetch favorites from localStorage

  // Remove an item from favorites
  const removeFavorite = (item) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p>Your favorite list is empty!</p>;
  }

  return (
    <div>
      {favorites.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ddd",
            margin: "10px 0",
            borderRadius: "8px",
          }}
        >
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <button
            onClick={() => removeFavorite(item)}
            style={{
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
