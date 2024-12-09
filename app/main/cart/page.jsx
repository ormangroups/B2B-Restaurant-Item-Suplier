"use client";

import { useState } from "react";

export default function CartPage() {
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

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

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

    const total = itemTotal + gst - discount;

    return {
      itemTotal,
      savings,
      gst,
      total: total > 0 ? total : 0,
    };
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      setDiscount(100);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
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
                  onClick={() => updateQuantity(item.id, false)}
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, true)}
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => deleteItem(item.id)}
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
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={applyCoupon}
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
