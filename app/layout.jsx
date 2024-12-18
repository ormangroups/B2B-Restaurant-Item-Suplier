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
    // Check for cookies on initial page load
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
    const restaurantData = Cookies.get('restaurantData') ? JSON.parse(Cookies.get('restaurantData')) : {};

    if (userData) {
      console.log(userData.username);
console.log(userData.password);
      dispatch(setUserData(userData));
      if(userData.role==="ADMIN"){
        router.push('/admin');
      }else{
        console.log(restaurantData)
        dispatch(setRestaurantDetails(restaurantData));
        router.push('/main'); 
      }
    }
    
  }, [dispatch, router]);

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
