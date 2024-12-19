"use client";

import { useState, useEffect } from "react";
import { setCartItems, removeCartItem } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "@/app/api/mainapi"; // Ensure correct API import path
import { AiOutlineDelete } from "react-icons/ai"; // Import React Icon for Remove Button

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, coupon } = useSelector((state) => state.cart);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await api.getCartItems(restaurantId); // Fetch cart items
        if (data && Array.isArray(data)) {
          const formattedItems = data.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            category: item.product.category,
            description: item.product.description,
            price: item.product.price || 0, // Ensure price is a number
            quantity: item.quantity, // Directly using the quantity from the API response
            totalPrice: (item.product.price || 0) * item.quantity, // Calculate total price based on quantity
            image: item.product.image || "/placeholder.jpg", // Fallback image
          }));
          dispatch(setCartItems(formattedItems)); // Update Redux state with the fetched items
        } else {
          console.error("Cart data is not in the expected format:", data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [dispatch, restaurantId]);

  // Calculate summary (item total, savings, and final amount)
  useEffect(() => {
    const calculateSummary = () => {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.totalPrice, // Use the pre-calculated totalPrice per item
        0
      );

      let discount = 0;
      if (
        coupon?.isActive &&
        coupon.validFrom <= new Date() &&
        coupon.validUntil >= new Date()
      ) {
        discount = Math.min(
          (totalPrice * coupon.discountPercentage) / 100,
          coupon.maxDiscountAmount
        );
      }

      setDiscountAmount(discount);
      setFinalAmount(totalPrice - discount);
    };

    calculateSummary();
  }, [cartItems, coupon]);

  // Handle quantity change for a product
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity below 1

    // Update totalPrice based on new quantity
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price, // Recalculate total price
          }
        : item
    );

    dispatch(setCartItems(updatedItems)); // Update Redux state
  };

  // Handle remove item from cart
  const handleRemoveFromCart = async (item) => {
    try {
      await api.removeFromCart(restaurantId, item.id); // Remove item from backend cart
      dispatch(removeCartItem(item.id)); // Remove item from Redux state
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Place Order
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    const order = {
      items: cartItems.map((item) => ({
        product: {
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          price: item.price,
        },
        quantity: item.quantity,
        price: item.totalPrice, // Use the pre-calculated totalPrice
      })),
      restaurantID: restaurantId,
      totalPrice: cartItems.reduce(
        (total, item) => total + item.totalPrice, // Use the pre-calculated totalPrice per item
        0
      ),
      finalAmount,
      orderDate: new Date(),
      status: "Pending",
      
    };

    try {
      console.log(order)
      await api.createOrder(restaurantId,order); // Send the order to the backend
      // Clear the cart in the backend
       // Clear the Redux state
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

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
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="flex items-center gap-4 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex flex-col w-full">
                  <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-700">
                    ₹{(item.price || 0).toFixed(2)} x {item.quantity} = ₹{(item.totalPrice || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="px-3 py-1 text-red-600"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Summary */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Discount</span>
            <span className="text-green-500">-₹{(discountAmount || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Total Price</span>
            <span>₹{(finalAmount || 0).toFixed(2)}</span>
          </div>
        </div>
        <button
          className={`w-full py-3 rounded-lg font-semibold ${isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
