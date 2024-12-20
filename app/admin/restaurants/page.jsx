"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setRestaurantsList,
  deleteRestaurant,
} from "../../redux/slices/restaurantSlice";
import api from "@/app/api/mainapi";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const AdminRestaurantManagementPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    const fetchRestaurants = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.getAllRestaurants();
        if (Array.isArray(response)) {
          dispatch(setRestaurantsList(response));
        } else {
          console.error("Invalid response data format", response);
        }
        dispatch(setLoading(false));
      } catch (err) {
        console.error("Error fetching restaurants:", err.message);
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    };

    fetchRestaurants();
  }, [dispatch]);

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleManageClick = (id) => {
    router.push(`/admin/restaurants/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      dispatch(setLoading(true));
      await api.deleteRestaurant(`${id}`);
      dispatch(deleteRestaurant(id));
      dispatch(setLoading(false));
    } catch (err) {
      console.error("Error deleting restaurant:", err.message);
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-screen-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 text-center md:text-left">
          Restaurant Management
        </h1>
        <button
          onClick={handleRegisterClick}
          className="flex items-center bg-red-600 text-white px-4 py-2 mt-4 md:mt-0 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <AiOutlinePlus className="mr-2 text-xl" /> Register New Restaurant
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">Error: {error}</div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <table className="hidden md:table min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Restaurant Name</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(restaurants) && restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 border-b text-gray-800">
                        {restaurant.restaurantName}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-800">
                        {restaurant.contactNumber}
                      </td>
                      <td className="px-6 py-4 border-b text-gray-800">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            restaurant.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {restaurant.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b text-center">
                        <button
                          onClick={() => handleManageClick(restaurant.id)}
                          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mx-1"
                        >
                          <AiOutlineEdit className="inline-block text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(restaurant.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 mx-1"
                        >
                          <MdDelete className="inline-block text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No restaurants available. Click "Register New Restaurant" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Card Layout for Smaller Screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {Array.isArray(restaurants) && restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="mb-2">
                      <strong>Restaurant Name:</strong> {restaurant.restaurantName}
                    </div>
                    <div className="mb-2">
                      <strong>Contact:</strong> {restaurant.contactNumber}
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                          restaurant.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {restaurant.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleManageClick(restaurant.id)}
                        className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                      >
                        <AiOutlineEdit className="inline-block text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(restaurant.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      >
                        <MdDelete className="inline-block text-xl" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  No restaurants available. Click "Register New Restaurant" to add one.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminRestaurantManagementPage;
