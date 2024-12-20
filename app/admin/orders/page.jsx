"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import api from "@/app/api/mainapi"; // Replace with your Axios instance.

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      let response;
      if (statusFilter === "ALL") {
        response = await api.getAllOrders(); // Fetch all orders
      } else {
        response = await api.getOrdersByStatus(statusFilter); // Fetch orders by status
      }

      if (response) {
        setOrders(response);
        setFilteredOrders(response);
      } else {
        setOrders([]);
        setFilteredOrders([]);
      }
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]); // Fetch orders when statusFilter changes

  useEffect(() => {
    if (searchQuery) {
      const filtered = orders.filter((order) =>
        order.restaurantID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Reset to all orders if searchQuery is empty
    }
  }, [searchQuery, orders]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const updatedOrder = { ...selectedOrder, status: newStatus }; // Include the full order
      await api.updateOrder(orderId, updatedOrder); // Send the updated order to the backend
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSelectedOrder(null); // Close the modal after updating
    } catch (err) {
      setError("Failed to update order status.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Orders
      </h1>

      <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter("PENDING")}
            className={`px-4 py-2 rounded ${
              statusFilter === "PENDING"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 rounded ${
              statusFilter === "ALL"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All Orders
          </button>
        </div>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by Restaurant ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full border rounded"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500" />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              {["Order ID", "Restaurant ID", "Order Date", "Total Price", "Final Amount", "Status", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-2 border text-left text-gray-700 font-semibold"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.restaurantID}</td>
                  <td className="px-4 py-2 border">{order.orderDate}</td>
                  <td className="px-4 py-2 border">{order.totalPrice}</td>
                  <td className="px-4 py-2 border">{order.finalAmount}</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-red-500 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Selected Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Restaurant ID:</strong> {selectedOrder.restaurantID}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Total Price:</strong> {selectedOrder.totalPrice}</p>
            <p><strong>Discount:</strong> {selectedOrder.discountAmount}</p>
            <p><strong>Final Amount:</strong> {selectedOrder.finalAmount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <h3 className="text-xl font-bold mt-4">Order Items</h3>
            <ul>
              {selectedOrder.items?.map((item, index) => (
                <li key={index} className="border-t py-2">
                  <p>
                    <strong>Product:</strong>{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setSelectedProduct(item?.product)}
                    >
                      {item?.product?.name || "N/A"}
                    </span>
                  </p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Shipped")}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Delivered")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
