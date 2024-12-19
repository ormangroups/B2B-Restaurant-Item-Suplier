// redux/slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [], // Initialize categories as an empty array
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState, // Ensure initialState is set
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = categorySlice.actions;

export default categorySlice.reducer;
