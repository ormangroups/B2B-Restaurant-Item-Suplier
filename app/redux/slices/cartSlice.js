import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    coupon: "",
    discount: 0,
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    applyCoupon(state, action) {
      state.coupon = action.payload.coupon;
      state.discount = action.payload.discount;
    },
  },
});

export const {
  setCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
