"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "@/app/api/mainapi"; // Ensure correct API import path
import {
  setCartItems,
  updateCartItem,
  removeCartItem,
  applyCoupon,
} from "../../redux/slices/cartSlice"; // Ensure this path matches your Redux slice location

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, discount, coupon } = useSelector((state) => state.cart);
  const restaurantId = "123"; // Replace with dynamic restaurant ID if needed

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await api.getCartItems(restaurantId);
        if (Array.isArray(data)) {
          dispatch(setCartItems(data));
        } else {
          console.error("API did not return an array:", data);
          dispatch(setCartItems([])); // Default to an empty array
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        dispatch(setCartItems([])); // Handle API errors gracefully
      }
    };
    fetchCartItems();
  }, [dispatch, restaurantId]);
  

  // Calculate summary (item total, savings, GST, and final total)
  const calculateSummary = () => {
    const itemTotal = (cartItems || []).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const savings = (cartItems || []).reduce(
      (total, item) => total + item.savings * item.quantity,
      0
    );
    const gst = (cartItems || []).reduce(
      (total, item) => total + (item.price * item.tax * item.quantity) / 100,
      0
    );
  
    const total = itemTotal + gst - discount;
  
    return {
      itemTotal,
      savings,
      gst,
      total: total > 0 ? total : 0,
    };
  };
  

  // Update item quantity
  const handleUpdateQuantity = async (id, increment) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = increment
      ? item.quantity + 1
      : Math.max(item.quantity - 1, 1);

    dispatch(updateCartItem({ id, quantity: newQuantity }));

    try {
      await api.addToCart(restaurantId, { ...item, quantity: newQuantity });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Delete item from cart
  const handleDeleteItem = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    dispatch(removeCartItem(id));

    try {
      await api.removeFromCart(restaurantId, item);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      dispatch(applyCoupon({ coupon, discount: 100 }));
    } else {
      alert("Invalid coupon code");
      dispatch(applyCoupon({ coupon: "", discount: 0 }));
    }
  };

  const summary = calculateSummary();

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 bg-gray-50">
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          {cartItems.length} items in your cart
        </h1>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm text-gray-700">
                    ₹{item.price.toFixed(2)}{" "}
                    <span className="text-green-500">
                      (Savings ₹{item.savings})
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => handleUpdateQuantity(item.id, false)}
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => handleUpdateQuantity(item.id, true)}
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDeleteItem(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Summary & Coupon */}
      <div className="w-full mb-10 lg:mb-0 lg:w-1/3 bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="bg-green-100 text-green-800 text-sm p-3 rounded-lg">
          You're saving ₹{summary.savings.toFixed(2)} on this order!
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Item Total</span>
            <span>₹{summary.itemTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Product Discount</span>
            <span className="text-green-500">-₹{summary.savings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>GST + Cess</span>
            <span>₹{summary.gst.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Coupon Discount</span>
              <span className="text-green-500">-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-900 font-bold text-lg">
            <span>Total</span>
            <span>₹{summary.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => dispatch(applyCoupon({ coupon: e.target.value, discount }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleApplyCoupon}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Apply Coupon
          </button>
        </div>

        <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}