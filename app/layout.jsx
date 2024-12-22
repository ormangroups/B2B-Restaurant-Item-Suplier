"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import Cookies from 'js-cookie';
import { setUserData } from './redux/slices/userSlice';
import { setRestaurantDetails } from './redux/slices/restaurantSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

// Separate component for the layout content
function LayoutContent({ children }) {
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
      <Navbar isLoggedIn={true} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {/* Render content only after Provider is available */}
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </Provider>
  );
}
