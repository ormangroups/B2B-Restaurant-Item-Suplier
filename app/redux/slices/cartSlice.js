import { createSlice } from "@reduxjs/toolkit";

// Initial state holds an array of cart items (each containing a product and quantity)
const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set the cart items with the list of full cart objects (each containing a product and quantity)
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    // Add a product along with quantity to the cart
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
      if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Otherwise, add the new item
        state.items.push(action.payload);
      }
    },
    // Update the quantity of an existing item in the cart
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity; // Update quantity if valid
      }
    },
    // Remove an item from the cart (if needed)
    removeCartItem: (state, action) => {
      // Filter items based on the id directly from the payload
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartItems, addToCart, updateCartItemQuantity, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
