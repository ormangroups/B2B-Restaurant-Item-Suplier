"use client";

import { useEffect, useState } from "react";
//import axios from "axios";

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all restaurants
  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("/api/admin/restaurants");
  //       setRestaurants(response.data);
  //     } catch (error) {
  //       console.error("Error fetching restaurants:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRestaurants();
  // }, []);

  // Select a restaurant to view details
  const viewDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/restaurants/${id}`);
      setSelectedRestaurant(response.data);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send payment reminder
  const sendReminder = async (id) => {
    try {
      await axios.post(`/api/admin/restaurants/${id}/reminder`);
      alert("Payment reminder sent successfully!");
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  // Toggle restaurant status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`/api/admin/restaurants/${id}/status`, {
        status: !currentStatus,
      });
      alert("Restaurant status updated successfully!");
      // Refresh the restaurant list
      const response = await axios.get("/api/admin/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Restaurant Management</h1>

      {/* Restaurant List */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Registered Restaurants</h2>
        {loading && <p>Loading...</p>}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Outstanding Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="border p-2">{restaurant.name}</td>
                <td className="border p-2">{restaurant.email}</td>
                <td className="border p-2">{restaurant.outstandingAmount}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => viewDetails(restaurant.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => sendReminder(restaurant.id)}
                  >
                    Send Reminder
                  </button>
                  <button
                    className={`${
                      restaurant.active ? "bg-red-500" : "bg-gray-500"
                    } text-white px-4 py-2 rounded`}
                    onClick={() =>
                      toggleStatus(restaurant.id, restaurant.active)
                    }
                  >
                    {restaurant.active ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restaurant Details */}
      {selectedRestaurant && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">
            Details for {selectedRestaurant.name}
          </h2>
          <p>
            <strong>Email:</strong> {selectedRestaurant.email}
          </p>
          <p>
            <strong>Outstanding Amount:</strong> $
            {selectedRestaurant.outstandingAmount}
          </p>
          <p>
            <strong>Orders:</strong> {selectedRestaurant.orders.length}
          </p>
          {/* Add more details as needed */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => setSelectedRestaurant(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;
