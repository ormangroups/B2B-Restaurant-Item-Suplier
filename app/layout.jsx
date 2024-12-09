"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="XvGMussni5fBo2gQnzEMZuxGDxRRA_advRe2Kkmhmm0" />
      </head>
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
