"use client";
import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";

import {
  FaDollarSign,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import api from "@/app/api/mainapi"; // Import the API instance

const PaymentSettlement = () => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [totalPending, setTotalPending] = useState(0);
  const [pastSettlements, setPastSettlements] = useState([]);
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id); // Replace with dynamic ID if needed

  // Fetch restaurant details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get restaurant details by ID
        const response = await api.getRestaurantById(restaurantId);
        setRestaurantDetails(response);

        // Get payment details
        const { payment } = response;
        setTotalPending(payment.pendingAmount);
        setPastSettlements(payment.pastSettlements);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  if (!restaurantDetails) {
    return(     <div className="fixed inset-0 flex items-center justify-center bg-white z-50"> <div className="flex flex-col items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div> <h2 className="text-center text-lg font-semibold">Loading...</h2> <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p> </div> </div>); // Loading state while the data is being fetched
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Payment Settlement
        </h1>

        {/* Restaurant Info Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Restaurant Details</h2>
          <p className="text-lg text-gray-600">Name: {restaurantDetails.restaurantName}</p>
          <p className="text-lg text-gray-600">Address: {restaurantDetails.restaurantAddress}</p>
          <p className="text-lg text-gray-600">Contact: {restaurantDetails.contactNumber}</p>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Pending Section */}
          <div className="bg-yellow-100 rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <FaExclamationCircle className="text-yellow-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold text-gray-700">Total Pending</h2>
                <p className="text-2xl font-bold text-yellow-600">
                ₹‎{totalPending}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Past Settlements Section */}
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <h2 className="bg-gray-100 p-4 text-lg font-bold text-gray-700">
            Past Settlements
          </h2>
          {pastSettlements.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-2 text-gray-600">Transaction Date</th>
                    <th className="px-4 py-2 text-gray-600">Amount Paid ($)</th>
                    <th className="px-4 py-2 text-gray-600">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {pastSettlements.map((settlement) => (
                    <tr
                      key={settlement.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{settlement.transactionDate}</td>
                      <td className="px-4 py-3">${settlement.amountPaid}</td>
                      <td className="px-4 py-3">{settlement.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-4 py-3 text-gray-600">No past settlements available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettlement;
