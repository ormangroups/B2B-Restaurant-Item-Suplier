import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaHome,
  FaUtensils,
  FaTags,
  FaClipboardList,
  FaBell,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = ({ setIsSidebarOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname; // Get the current path
  const [activePath, setActivePath] = useState(currentPath); // State to manage active link

  useEffect(() => {
    setActivePath(currentPath);
  }, [currentPath]);

  // Logout function: clear cookies and redirect to home page
  const handleLogout = () => {
    Cookies.remove("userData"); // Clear the cookie (replace "userData" with your cookie name)
    router.push("/"); // Redirect to home page
  };

  // Function to determine active link styling
  const isActive = (path) =>
    activePath === path ? "text-red-600 bg-red-100" : "text-gray-700 hover:bg-red-100 hover:text-red-600";

  // Handle link click
  const handleLinkClick = (path) => {
    setActivePath(path);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside className="h-full bg-white shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <img
          src="https://i.imgur.com/nCjPRTB.png"
          alt="Orman logo"
          className="h-12 transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/admin">
          <div
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive("/admin")}`}
            onClick={() => handleLinkClick("/admin")}
          >
            <FaHome className="mr-3" />
            Dashboard
          </div>
        </Link>
        <Link href="/admin/restaurants">
          <div
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive("/admin/restaurants")}`}
            onClick={() => handleLinkClick("/admin/restaurants")}
          >
            <FaUtensils className="mr-3" />
            Restaurant Management
          </div>
        </Link>
        <Link href="/admin/orders">
          <div
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive("/admin/orders")}`}
            onClick={() => handleLinkClick("/admin/orders")}
          >
            <FaClipboardList className="mr-3" />
            Orders
          </div>
        </Link>
        <Link href="/admin/notificaction">
          <div
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive("/admin/notification")}`}
            onClick={() => handleLinkClick("/admin/notificaction")}
          >
            <FaBell className="mr-3" />
            Notifications
          </div>
        </Link>
        <Link href="/admin/products">
          <div
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive("/admin/products")}`}
            onClick={() => handleLinkClick("/admin/products")}
          >
            <FaChartPie className="mr-3" />
            Products
          </div>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="flex-shrink-0 px-4 py-6 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
