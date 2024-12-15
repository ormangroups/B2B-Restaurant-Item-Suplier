import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice";
import restaurantReducer from "./slices/restaurantSlice"; 

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    user: userReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export default store;
