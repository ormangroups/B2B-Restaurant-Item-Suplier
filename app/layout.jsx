"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Navbar isLoggedIn={true} />
          <div className="mt-20 min-h-screen">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
