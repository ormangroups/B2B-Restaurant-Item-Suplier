"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import api from "@/app/api/mainapi"; // Replace with your Axios instance.

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]); // Ensure orders is an empty array by default
  const [filteredOrders, setFilteredOrders] = useState([]); // Ensure filteredOrders is an empty array by default
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState("PENDING"); // Default to "Pending"
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrdersByStatus(statusFilter); // Fetch by status
        if (response && response) {
          setOrders(response); // Ensure data exists before setting state
          setFilteredOrders(response); // Set the filtered orders
        } else {
          setOrders([]); // In case response.data is empty or undefined
          setFilteredOrders([]);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error("Error:", err);
      }
    };

    fetchOrders();
  }, [statusFilter]);

  // Search handler
  useEffect(() => {
    if (orders && orders.length > 0) {
      const filtered = orders.filter((order) =>
        order.restaurantID?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  // Handle status updates
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {/* Status Filter */}
      <div className="flex mb-4">
        <button
          onClick={() => setStatusFilter("PENDING")}
          className={`mr-4 px-4 py-2 rounded ${
            statusFilter === "PENDING"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-4 py-2 rounded ${
            statusFilter === "ALL" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Orders
        </button>
      </div>

      {/* Search */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Restaurant ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
        <FaSearch className="ml-2 text-xl text-gray-500" />
      </div>

      {/* Orders Table */}
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Restaurant ID</th>
            <th className="px-4 py-2 border">Order Date</th>
            <th className="px-4 py-2 border">Total Price</th>
            <th className="px-4 py-2 border">Final Amount</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.restaurantID}</td>
                <td className="px-4 py-2 border">{order.orderDate}</td>
                <td className="px-4 py-2 border">{order.totalPrice}</td>
                <td className="px-4 py-2 border">{order.finalAmount}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-blue-500"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-2/3 max-h-[80vh] overflow-y-auto p-6 rounded shadow-lg relative">
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

            {/* Order Items */}
            <h3 className="text-xl font-bold mt-4">Order Items</h3>
            <ul className="max-h-40 overflow-y-auto">
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

            {/* Status Update Buttons */}
            <div className="mt-4">
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, "Shipped")}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedOrder.id, "Delivered")
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/3 p-6 rounded shadow-lg">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <p><strong>Product Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
