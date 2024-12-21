"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { setCartItems, removeCartItem } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "@/app/api/mainapi";
import { AiOutlineDelete } from "react-icons/ai";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.cart.coupon);
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await api.getCartItems(restaurantId);
        if (data && Array.isArray(data)) {
          const formattedItems = data.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            category: item.product.category,
            description: item.product.description,
            price: item.product.price || 0,
            quantity: item.quantity,
            totalPrice: (item.product.price || 0) * item.quantity,
            image: item.product.image || "/placeholder.jpg",
          }));
          dispatch(setCartItems(formattedItems));
        } else {
          console.error("Cart data is not in the expected format:", data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [dispatch, restaurantId]);

  // Calculate summary (item total, savings, and final amount)
  useEffect(() => {
    const calculateSummary = () => {
      const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

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
  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          }
        : item
    );

    dispatch(setCartItems(updatedItems));
  }, [cartItems, dispatch]);

  // Handle remove item from cart
  const handleRemoveFromCart = useCallback(async (item) => {
    try {
      await api.removeFromCart(restaurantId, item.id);
      dispatch(removeCartItem(item.id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }, [dispatch, restaurantId]);

  // Place Order
  const handlePlaceOrder = useCallback(async () => {
    setIsPlacingOrder(true);
    const order = {
      items: cartItems.map((item) => ({
        product: {
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          price: item.price,
          image: item.image,
        },
        quantity: item.quantity,
        price: item.totalPrice,
      })),
      restaurantID: restaurantId,
      totalPrice: cartItems.reduce((total, item) => total + item.totalPrice, 0),
      finalAmount,
      orderDate: new Date(),
      status: "Pending",
    };

    try {
      await api.createOrder(restaurantId, order);
      dispatch(setCartItems([]));
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  }, [cartItems, finalAmount, restaurantId, dispatch]);

  const totalItems = useMemo(() => cartItems.length, [cartItems]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div>
          <h2 className="text-center text-lg font-semibold">Loading...</h2>
          <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 bg-gray-50">
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        {totalItems > 0 ? (
          <>
            <h1 className="text-xl md:text-2xl font-bold mb-6">
              {totalItems} {totalItems > 1 ? "items" : "item"} in your cart
            </h1>
            <div className="space-y-6">
  {cartItems.map((item) => (
    <div
      key={item.id}  // Ensure each child has a unique key prop
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


          </>
        ) : (
          <div className="text-center text-gray-500">
            <h1 className="text-xl md:text-2xl font-bold mb-6">Your cart is empty</h1>
            <p>Browse our products and add some items to your cart.</p>
          </div>
        )}
      </div>

      {/* Right Section: Summary */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 space-y-6">
        {totalItems > 0 && (
          <>
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
              className={`w-full py-3 rounded-lg font-semibold ${
                isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
