import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsByCategory: {}, // { category: { products: [...], constantPrice: value } }
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const categoryMap = {};
      action.payload.forEach((product) => {
        if (!categoryMap[product.category]) {
          categoryMap[product.category] = {
            products: [],
            constantPrice: product.categoryPriceConstant ? product.price : null,
          };
        }
        categoryMap[product.category].products.push(product);
      });
      state.productsByCategory = categoryMap;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;
