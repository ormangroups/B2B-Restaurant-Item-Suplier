"use client";
import { use } from "react";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi"; // Assuming Axios instance is in this file

const PaymentPage = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const { id } = params; // Restaurant ID
  const [restaurant, setRestaurant] = useState(null);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");

  // Fetch restaurant by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.getRestaurantById(id); // Assuming you have an API endpoint to get the restaurant by ID
        if (response) {
          setRestaurant(response);
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleAddPayment = async (e) => {
    e.preventDefault();
    const amountPaid = parseFloat(newPayment.amount);
    const transactionDate = `${newPayment.date}T00:00:00`; // Adding time portion to match LocalDateTime

    if (!amountPaid || !transactionDate) {
      setError("Please fill in both the amount and date.");
      return;
    }

    const pendingAmount = restaurant?.payment?.pendingAmount || 0;

    if (amountPaid > pendingAmount) {
      setError("Payment amount exceeds the pending amount.");
      return;
    }

    try {
      const paymentTransaction = { amountPaid, transactionDate };

      // Call the API to create the payment transaction
      await api.createPaymentTransaction(id, paymentTransaction);

      // Update restaurant payment details
      setRestaurant((prevRestaurant) => ({
        ...prevRestaurant,
        payment: {
          ...prevRestaurant.payment,
          pendingAmount: prevRestaurant.payment.pendingAmount - amountPaid,
          paidAmount: prevRestaurant.payment.paidAmount + amountPaid,
          pastSettlements: [
            ...prevRestaurant.payment.pastSettlements,
            paymentTransaction,
          ],
        },
      }));

      // Clear error and form
      setError("");
      setNewPayment({ amount: "", date: "" });

      
    } catch (error) {
      console.error("Error adding payment:", error);
      setError("Failed to add payment.");
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-2 space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Payment Settlement for Restaurant 
      </h1>

      {/* Display error if any */}
      {error && (
        <div className="bg-red-100 text-red-800 font-bold text-lg px-6 py-4 rounded-lg shadow">
          {error}
        </div>
      )}

      {/* Pending Amount */}
      <div className="bg-red-100 text-red-800 font-bold text-lg px-6 py-4 rounded-lg shadow">
        Pending Amount: ₹‎{restaurant.payment.pendingAmount}
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
        {restaurant?.payment?.pastSettlements?.length > 0 ? (
          <ul className="space-y-4">
            {restaurant.payment.pastSettlements.map((settlement, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div>
                  <h3 className="font-bold text-gray-800">₹ {settlement.amountPaid}</h3>
                  <span className="text-gray-500 text-sm">
                    {settlement.transactionDate}
                  </span>
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
