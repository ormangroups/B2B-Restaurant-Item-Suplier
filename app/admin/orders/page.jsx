"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaEdit, FaTimes, FaCheckCircle } from "react-icons/fa";


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  

  // Fetch orders from the server or mock data
  useEffect(() => {
    // Mock data for orders
    const fetchedOrders = [
      { id: 1, customer: "John Doe", total: "$45.00", status: "Pending" },
      { id: 2, customer: "Jane Smith", total: "$60.00", status: "Shipped" },
      { id: 3, customer: "Alice Johnson", total: "$100.00", status: "Delivered" },
    ];
    setOrders(fetchedOrders);
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle order status update
  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle opening order details
  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Handle closing order details
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Admin Page Title */}
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          className="p-2 border rounded w-1/3"
          placeholder="Search by customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="ml-2 text-xl text-gray-500" />
      </div>

      {/* Orders List */}
      <div className="bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.customer}</td>
                <td className="px-4 py-2 border">{order.total}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleOpenOrderDetails(order)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseOrderDetails}
              className="absolute top-4 right-4 text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Total:</strong> {selectedOrder.total}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>

            {/* Manage Order Status */}
            <div className="mt-4">
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Shipped")}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Delivered")}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Cancelled")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
