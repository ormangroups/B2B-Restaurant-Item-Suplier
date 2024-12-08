"use client";
import React, { useState } from "react";
import {
  FaDollarSign,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";

const PaymentSettlement = () => {
  // Payment history data
  const [paymentHistory] = useState([
    { id: 1, date: "2024-12-01", amount: 500, status: "Paid" },
    { id: 2, date: "2024-12-05", amount: 1200, status: "Pending" },
    { id: 3, date: "2024-12-07", amount: 800, status: "Paid" },
    { id: 4, date: "2024-12-10", amount: 950, status: "Pending" },
  ]);

  // Calculate pending and paid totals
  const totalPaid = paymentHistory
    .filter((payment) => payment.status === "Paid")
    .reduce((acc, payment) => acc + payment.amount, 0);

  const totalPending = paymentHistory
    .filter((payment) => payment.status === "Pending")
    .reduce((acc, payment) => acc + payment.amount, 0);

  // Simulate settlement request
  const handleRequestSettlement = () => {
    alert("Settlement request sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Payment Settlement
        </h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Paid Section */}
          <div className="bg-green-100 rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <FaDollarSign className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold text-gray-700">Total Paid</h2>
                <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
              </div>
            </div>
          </div>

          {/* Pending Section */}
          <div className="bg-yellow-100 rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <FaExclamationCircle className="text-yellow-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  Total Pending
                </h2>
                <p className="text-2xl font-bold text-yellow-600">
                  ${totalPending}
                </p>
              </div>
            </div>
            <button
              onClick={handleRequestSettlement}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 w-full"
            >
              Request Settlement
            </button>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <h2 className="bg-gray-100 p-4 text-lg font-bold text-gray-700">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-2 text-gray-600">Date</th>
                  <th className="px-4 py-2 text-gray-600">Amount ($)</th>
                  <th className="px-4 py-2 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{payment.date}</td>
                    <td className="px-4 py-3">${payment.amount}</td>
                    <td className="px-4 py-3">
                      {payment.status === "Paid" ? (
                        <span className="flex items-center text-green-600 font-medium">
                          <FaCheckCircle className="mr-2" /> {payment.status}
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-600 font-medium">
                          <FaExclamationCircle className="mr-2" />{" "}
                          {payment.status}
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
    </div>
  );
};

export default PaymentSettlement;
