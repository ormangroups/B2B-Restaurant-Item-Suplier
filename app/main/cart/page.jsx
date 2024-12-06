"use client";

import { useState } from "react";

export default function CartPage() {
  // Mock Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eastmade - Kashmiri Chilli Powder, 500 gm",
      image: "/images/item1.png",
      description: "1 pack",
      price: 245.75,
      savings: 361,
      quantity: 1,
      tax: 5,
    },
    {
      id: 2,
      name: "Best Fresh - Cling Film Roll, 1.4 Kg",
      image: "/images/item2.png",
      description: "1 pc",
      price: 229.77,
      savings: 61,
      quantity: 1,
      tax: 18,
    },
    {
      id: 3,
      name: "Bhagwati - Rectangle Container 14-750 ml",
      image: "/images/item3.png",
      description: "Pack of 50",
      price: 360.64,
      savings: 23,
      quantity: 1,
      tax: 18,
    },
  ]);

  const calculateSummary = () => {
    const itemTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const savings = cartItems.reduce(
      (total, item) => total + item.savings * item.quantity,
      0
    );
    const gst = cartItems.reduce(
      (total, item) => total + (item.price * item.tax * item.quantity) / 100,
      0
    );

    return {
      itemTotal,
      savings,
      gst,
      total: itemTotal + gst,
    };
  };

  const updateQuantity = (id, increment) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const summary = calculateSummary();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{cartItems.length} items in cart</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm text-gray-700">
                  ₹{item.price.toFixed(2)}{" "}
                  <span className="text-green-500">(Savings ₹{item.savings})</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded text-red-500"
                onClick={() => updateQuantity(item.id, false)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded text-red-500"
                onClick={() => updateQuantity(item.id, true)}
              >
                +
              </button>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteItem(item.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Right Section: Summary */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <div className="text-sm bg-green-100 text-green-700 p-2 rounded mb-4">
          Saving ₹{summary.savings.toFixed(2)} on this order
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Item total</span>
          <span>₹{summary.itemTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Product discount</span>
          <span className="text-green-500">-₹{summary.savings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>GST + Cess</span>
          <span>₹{summary.gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
          <span>Total</span>
          <span>₹{summary.total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-red-500 text-white py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
}
