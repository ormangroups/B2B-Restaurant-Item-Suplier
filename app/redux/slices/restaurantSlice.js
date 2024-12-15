import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: null, // Single restaurant details
  restaurants: [], // List of all restaurants
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRestaurantDetails: (state, action) => {
      state.restaurant = action.payload; // Single restaurant details
    },
    setRestaurantsList: (state, action) => {
      state.restaurants = action.payload; // List of restaurants
    },
    addRestaurant: (state, action) => {
      state.restaurants.push(action.payload); // Add a restaurant
    },
    updateRestaurant: (state, action) => {
      const index = state.restaurants.findIndex(
        (r) => r.id === action.payload.id
      );
      if (index !== -1) {
        state.restaurants[index] = {
          ...state.restaurants[index],
          ...action.payload,
        };
      }
    },
    deleteRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(
        (r) => r.id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setRestaurantDetails,
  setRestaurantsList,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
