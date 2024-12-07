// layout.jsx
import React from "react";
import Sidebar from "@/components/Admin/SideBar";


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
 