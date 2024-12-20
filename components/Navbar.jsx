"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaBell, FaUser, FaTimes, FaBars, FaWallet, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import "../styles/global.css";
import Cookies from "js-cookie";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("shop"); // Default active button
  const [cartQuantity, setCartQuantity] = useState(4); // Example cart quantity
  const [hasNotifications, setHasNotifications] = useState(true); // Example notification state
  const router = useRouter();

  // Get role and user data from Redux store
  const role = useSelector((state) => state.user.role);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setMenuOpen(false); // Close menu when a button is clicked
  };

  const handleLogin = () => router.push("/login");
  const openCart = () => router.push("/main/cart");
  const goToMain = () => router.push("/main");
  const openFavorite = () => router.push("/main/favorities");
  const openNotification = () => router.push("/main/notifications");

  // If role is ADMIN, don't render the Navbar
  if (role === "ADMIN") return null;

  // If user is not logged in, render only login button
  if (role === null) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-30 flex justify-between items-center px-6 py-4">
        <Link href="/">
          <img
            src="https://i.imgur.com/nCjPRTB.png"
            alt="Orman logo"
            className="h-9 md:h-9 lg:h-10 max-w-full transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </Link>
        <button
          onClick={handleLogin}
          className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Login
        </button>
      </div>
    );
  }

  // Render Navbar for Logged-In Users
  return (
    <div className="relative">
      {/* Navbar for All Devices */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Left: Brand Logo or Name */}
          <div>
            <Link href="/">
              <img
                src="https://i.imgur.com/nCjPRTB.png"
                alt="Orman logo"
                className="h-9 md:h-9 lg:h-10 max-w-full transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </Link>
          </div>

          <div className="hidden lg:flex space-x-8">
            {/* Navigation Buttons */}
            <button
              onClick={() => {
                handleButtonClick("shop");
                goToMain();
              }}
              className={`flex items-center space-x-2 ${activeButton === "shop" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
            >
              <FaShoppingCart className="text-xl" />
              <span>Shop</span>
            </button>
            <button
              onClick={() => {
                handleButtonClick("favorite");
                openFavorite();
              }}
              className={`flex items-center space-x-2 ${activeButton === "favorite" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
            >
              <FaHeart className="text-xl" />
              <span>Favorite</span>
            </button>
            <button
              onClick={() => {
                handleButtonClick("notification");
                openNotification();
              }}
              className={`relative flex items-center space-x-2 ${activeButton === "notification" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
            >
              <FaBell className="text-xl relative">
                {hasNotifications && <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>}
              </FaBell>
              <span>Notify</span>
            </button>
            <button
              onClick={() => {
                handleButtonClick("cart");
                openCart();
              }}
              className={`relative flex items-center space-x-2 ${activeButton === "cart" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
            >
              <div className="relative">
                <FaShoppingCart className="text-xl" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                    {cartQuantity}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>
            <button onClick={toggleMenu} className="text-gray-700 hover:text-red-500">
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Menu for Smaller Screens */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center">
          <div className="relative bg-white w-4/5 h-4/5 md:w-1/2 md:h-3/4 rounded-lg shadow-lg overflow-hidden">
            <button className="absolute top-4 right-4 text-gray-700" onClick={toggleMenu}>
              <FaTimes className="text-3xl hover:text-red-500 transition duration-200" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                <span className="text-red-500">Quick</span> Menu
              </h2>
              <ul className="space-y-6">
                <li>
                  <Link href="/main/profile" className="flex items-center text-gray-700 hover:text-red-500">
                    <FaUser className="mr-4 text-xl" /> Outlet Information
                  </Link>
                </li>
                <li>
                  <Link href="/main/payments" className="flex items-center text-gray-700 hover:text-red-500">
                    <FaWallet className="mr-4 text-xl" /> Payment Settlement
                  </Link>
                </li>
                <li>
                  <Link href="/main/orders" className="flex items-center text-gray-700 hover:text-red-500">
                    <FaHistory className="mr-4 text-xl" /> Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex items-center text-gray-700 hover:text-red-500"
                    onClick={() => {
                      Cookies.remove("userData");
                      Cookies.remove("restaurantData");
                      router.push("/");
                    }}
                  >
                    <FaSignOutAlt className="mr-4 text-xl" /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navbar for Small Screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around items-center px-4 py-2 lg:hidden">
        <button
          onClick={() => {
            handleButtonClick("shop");
            goToMain();
          }}
          className={`flex flex-col items-center ${activeButton === "shop" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
        >
          <FaShoppingCart className="text-xl" />
          <span className="text-xs">Shop</span>
        </button>
        <button
          onClick={() => {
            handleButtonClick("favorite");
            openFavorite();
          }}
          className={`flex flex-col items-center ${activeButton === "favorite" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
        >
          <FaHeart className="text-xl" />
          <span className="text-xs">Favorite</span>
        </button>
        <button
          onClick={() => {
            handleButtonClick("notification");
            openNotification();
          }}
          className={`relative flex flex-col items-center ${activeButton === "notification" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
        >
          <FaBell className="text-xl" />
          {hasNotifications && <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>}
          <span className="text-xs">Notify</span>
        </button>
        <button
          onClick={() => {
            handleButtonClick("cart");
            openCart();
          }}
          className={`relative flex flex-col items-center ${activeButton === "cart" ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
        >
          <div className="relative">
            <FaShoppingCart className="text-xl" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                {cartQuantity}
              </span>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </button>
        <button onClick={toggleMenu} className="flex flex-col items-center text-gray-700 hover:text-red-500">
          <FaBars className="text-xl" />
          <span className="text-xs">Menu</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
