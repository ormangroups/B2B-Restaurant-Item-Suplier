import Link from "next/link";
import React from "react";
import { FaHome, FaUtensils, FaTags, FaClipboardList, FaBell, FaChartPie, FaCog } from "react-icons/fa";

const Sidebar = () => {
  
  return (
    <aside className="w-64  min-h-screen bg-indigo-600 text-white flex flex-col">
      <div className="flex items-center justify-center h-16">
        <i className="fas fa-wave-square text-3xl"></i>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link href="/admin" className="flex items-center px-2 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md">
          <FaHome className="mr-3" />
          Dashboard
        </Link>
        <Link href="/admin/restaurants" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaUtensils className="mr-3" />
          Restaurant Management
        </Link>
        <Link href="/admin/cupons" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaTags className="mr-3" />
          Coupons & Discounts
        </Link>
        <Link href="/admin/orders" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaClipboardList className="mr-3" />
          Orders
        </Link>
        <Link href="/admin/notificaction" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaBell className="mr-3" />
          Notifications
        </Link>
        <Link href="/admin/products" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaChartPie className="mr-3" />
          Product
        </Link>
      </nav>
      <div className="flex-shrink-0 px-2 py-4">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500">
          <FaCog className="mr-3" />
          Settings
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
