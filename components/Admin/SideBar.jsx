import Link from "next/link";

import React from "react";
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

const Sidebar = () => {
  const router = useRouter();

  // Logout function: clear cookies and redirect to home page
  const handleLogout = () => {
    Cookies.remove("userData"); // Clear the cookie (replace "userData" with your cookie name)
    router.push("/"); // Redirect to home page
  };

  return (
    <aside className="h-full text-white flex flex-col">
      <div className="flex items-center ml-3 h-16 ">
      <img
              src="https://i.imgur.com/nCjPRTB.png"
              alt="Orman logo"
              className="h-9 md:h-9 lg:h-10 max-w-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link
          href="/admin"
          className="flex items-center px-2 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md"
        >
          <FaHome className="mr-3" />
          Dashboard
        </Link>
        <Link
          href="/admin/restaurants"
          className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
        >
          <FaUtensils className="mr-3" />
          Restaurant Management
        </Link>
        {/* <Link
          href="/admin/cupons"
          className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
        >
          <FaTags className="mr-3" />
          Coupons & Discounts
        </Link> */}
        <Link
          href="/admin/orders"
          className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
        >
          <FaClipboardList className="mr-3" />
          Orders
        </Link>
        <Link
          href="/admin/notificaction"
          className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
        >
          <FaBell className="mr-3" />
          Notifications
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
        >
          <FaChartPie className="mr-3" />
          Products
        </Link>
      </nav>
      <div className="flex-shrink-0 px-2 py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-red-500"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
