import { createSlice } from "@reduxjs/toolkit";

// Initial state holds an array of favorite products
const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Set the favorites list (array of full product objects)
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    // Add a full product object to the favorites list
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    // Remove a full product object from favorites
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id // Compare by full product object id
      );
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
