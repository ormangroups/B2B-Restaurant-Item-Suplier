"use client";
import React, { useState } from "react";

const PaymentPage = ({ params }) => {
  const { id } = params; // Restaurant ID
  const [pendingAmount, setPendingAmount] = useState(1500); // Initial pending amount
  const [settlements, setSettlements] = useState([
    { id: 1, amount: 500, date: "2024-12-01" },
    { id: 2, amount: 300, date: "2024-12-05" },
  ]);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: "",
  });

  const handleAddPayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(newPayment.amount);
    const date = newPayment.date;

    if (!amount || !date) {
      alert("Please fill in both the amount and date.");
      return;
    }

    if (amount > pendingAmount) {
      alert("Payment amount exceeds the pending amount.");
      return;
    }

    // Update settlements and pending amount
    setSettlements((prev) => [
      ...prev,
      { id: prev.length + 1, amount, date },
    ]);
    setPendingAmount((prev) => prev - amount);

    // Clear the form
    setNewPayment({ amount: "", date: "" });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-gray-800">
        Payment Settlement for Restaurant {id}
      </h1>

      {/* Pending Amount */}
      <div className="bg-red-100 text-red-800 font-bold text-lg px-6 py-4 rounded-lg shadow">
        Pending Amount: ${pendingAmount.toFixed(2)}
      </div>

      {/* Add New Payment */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Payment</h2>
        <form onSubmit={handleAddPayment} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg"
              value={newPayment.amount}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              value={newPayment.date}
              onChange={(e) =>
                setNewPayment({ ...newPayment, date: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Add Payment
          </button>
        </form>
      </div>

      {/* Previous Settlements */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Previous Settlements
        </h2>
        {settlements.length > 0 ? (
          <ul className="space-y-4">
            {settlements.map((settlement) => (
              <li
                key={settlement.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div>
                  <h3 className="font-bold text-gray-800">${settlement.amount.toFixed(2)}</h3>
                  <span className="text-gray-500 text-sm">{settlement.date}</span>
                </div>
                <span className="text-green-600 font-medium">Paid</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No settlements yet.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
