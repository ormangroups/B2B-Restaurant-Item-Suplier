"use client";
import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Cookies from 'js-cookie';
import { setUserData } from './redux/slices/userSlice';
import { setRestaurantDetails } from './redux/slices/restaurantSlice';
import { useRouter } from 'next/navigation';

// Separate component for the layout content
function LayoutContent({ children, isLoggedIn, setIsLoggedIn ,loginRole,setLoginRole}) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Check for cookies on initial page load
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
    const restaurantData = Cookies.get('restaurantData') ? JSON.parse(Cookies.get('restaurantData')) : {};
    const hasRedirected = localStorage.getItem('hasRedirected');

    if (userData && !hasRedirected) {
      dispatch(setUserData(userData));
      localStorage.setItem('hasRedirected', 'true');
      setIsLoggedIn(true);

      if (userData.role === "ADMIN") {
        setLoginRole("ADMIN");
        router.push('/admin');
        
      } else {
        dispatch(setRestaurantDetails(restaurantData));
        router.push('/main');
      }
    } else if (userData) {
      // If the user data is present but the user has already been redirected, just update the state without redirecting
      dispatch(setUserData(userData));
      setIsLoggedIn(true);
      if (userData.role !== "ADMIN") {
        dispatch(setRestaurantDetails(restaurantData));
      }
    }

  }, [dispatch, router, setIsLoggedIn]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {/* Render content only after Provider is available */}
          <LayoutContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>{children}</LayoutContent>
        </body>
      </html>
    </Provider>
  );
}