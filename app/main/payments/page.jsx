"use client"
import React, { useState } from "react";
import { FaDollarSign, FaSyncAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentSettlement = () => {
  // Example payment history data
  const [paymentHistory] = useState([
    { id: 1, date: "2024-12-01", amount: 500, status: "Paid" },
    { id: 2, date: "2024-12-05", amount: 1200, status: "Pending" },
    { id: 3, date: "2024-12-07", amount: 800, status: "Paid" },
    { id: 4, date: "2024-12-10", amount: 950, status: "Pending" },
  ]);

  // Calculate the total settlement
  const totalAmount = paymentHistory.reduce((acc, payment) => acc + payment.amount, 0);

  // Simulate settlement request action
  const handleRequestSettlement = () => {
    alert("Settlement request sent successfully!");
    // Add logic to trigger settlement API here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Settlement</h1>

        {/* Total Settlement Section */}
        <div className="mb-6 flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center">
            <FaDollarSign className="text-green-500 text-2xl mr-4" />
            <p className="text-lg text-gray-800 font-medium">
              Total Settlement Amount:{" "}
              <span className="text-green-500 font-bold">${totalAmount}</span>
            </p>
          </div>
          <button
            onClick={handleRequestSettlement}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
          >
            Request Settlement
          </button>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Amount ($)</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{payment.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {payment.status === "Paid" ? (
                      <span className="flex items-center text-green-500">
                        <FaCheckCircle className="mr-2" /> {payment.status}
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-500">
                        <FaSyncAlt className="mr-2" /> {payment.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettlement;
