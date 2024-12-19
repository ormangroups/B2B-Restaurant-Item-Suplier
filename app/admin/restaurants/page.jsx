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
  const { restaurants, loading, error } = useSelector((state) => {
    console.log("Redux State:", state.restaurant); // Debug log
    return state.restaurant;
  });
  useEffect(() => {
    const fetchRestaurants = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.getAllRestaurants();
        console.log("API Response from Axios:", response); // Debug log
  
        // Assuming response.data contains the list of restaurants
        if (Array.isArray(response)) {
          dispatch(setRestaurantsList(response)); // Correctly dispatch the list
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
      // Dispatch loading state to show the user that an action is being processed
      dispatch(setLoading(true));
      
      // Call the API to delete the restaurant
      await api.deleteRestaurant(`${id}`);
      console.log(`Restaurant with id ${id} deleted successfully`);
      
      // Dispatch the action to remove it from the store
      dispatch(deleteRestaurant(id));
      
      // After successful deletion, set loading to false
      dispatch(setLoading(false));
    } catch (err) {
      console.error("Error deleting restaurant:", err.message);
      dispatch(setError(err.message));  // Dispatch error state
      dispatch(setLoading(false));
    }
    
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Restaurant Management</h1>
        <button
          onClick={handleRegisterClick}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
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
          <table className="min-w-full table-auto border-collapse">
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
              restaurant.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
        )}
      </div>
    </div>
  );
};

export default AdminRestaurantManagementPage;
