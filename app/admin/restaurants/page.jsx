"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminRestaurantManagementPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  // Simulated restaurant data
  useEffect(() => {
    setRestaurants([
      { id: 1, name: "Restaurant A", owner: "Owner A", status: "Active" },
      { id: 2, name: "Restaurant B", owner: "Owner B", status: "Inactive" },
      { id: 3, name: "Restaurant C", owner: "Owner C", status: "Active" },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Management</h1>
        <button
          onClick={() => router.push("/register")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register New Restaurant
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Restaurant Name</th>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{restaurant.name}</td>
                <td className="px-4 py-2 border">{restaurant.owner}</td>
                <td className="px-4 py-2 border">{restaurant.status}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => router.push(`/admin/restaurants/${restaurant.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mx-1"
                  >
                    View & Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRestaurantManagementPage;
