"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <html lang="en">
      <body>
        <Navbar isLoggedIn={isLoggedIn}/>
        <div className="mt-20 min-h-screen">
        {children}
        </div>
        
        <Footer/>
      </body>
    </html>
  );
}
