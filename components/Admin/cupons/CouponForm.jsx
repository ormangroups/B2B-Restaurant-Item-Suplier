import React, { useState } from "react";

const CouponForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      code: "",
      type: "percentage",
      value: 0,
      startDate: "",
      endDate: "",
      usageLimit: 0,
      assignedRestaurants: [],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <div className="mb-4">
        <label className="block font-bold mb-1">Coupon Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Discount Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Discount Value</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Validity Period</label>
        <div className="flex space-x-2">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Usage Limit</label>
        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default CouponForm;
