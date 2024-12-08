// layout.jsx
import React from "react";
import Sidebar from "@/components/Admin/SideBar";


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 min-h-screen overflow-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
 