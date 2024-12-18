import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice";
import restaurantReducer from "./slices/restaurantSlice"; 
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    restaurant: restaurantReducer,
    user: userReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export default store;
