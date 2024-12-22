"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Cookies from "js-cookie";
import { setUserData } from "./redux/slices/userSlice";
import { setRestaurantDetails } from "./redux/slices/restaurantSlice";
import { useRouter } from "next/navigation";

function LayoutContent({ children, isLoggedIn, setIsLoggedIn, loginRole, setLoginRole }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null;
    const restaurantData = Cookies.get("restaurantData") ? JSON.parse(Cookies.get("restaurantData")) : {};

    if (userData) {
      dispatch(setUserData(userData));
      setIsLoggedIn(true);

      if (userData.role === "ADMIN") {
        setLoginRole("ADMIN");
        router.push("/admin");
      } else {
        setLoginRole("RESTAURANT");
        dispatch(setRestaurantDetails(restaurantData));
        router.push("/main");
      }
    } else {
      setIsLoggedIn(false);
      setLoginRole(null);
    }
  }, [dispatch, router, setIsLoggedIn, setLoginRole]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginRole={loginRole} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRole, setLoginRole] = useState(null);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <LayoutContent
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            loginRole={loginRole}
            setLoginRole={setLoginRole}
          >
            {children}
          </LayoutContent>
        </body>
      </html>
    </Provider>
  );
}
