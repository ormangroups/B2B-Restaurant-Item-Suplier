import React from "react";

const CouponTable = ({ coupons, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
            <th className="border border-gray-300 px-4 py-2">Validity</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Usage Count</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="border border-gray-300 px-4 py-2">{coupon.code}</td>
              <td className="border border-gray-300 px-4 py-2">{coupon.type}</td>
              <td className="border border-gray-300 px-4 py-2">{coupon.value}</td>
              <td className="border border-gray-300 px-4 py-2">
                {coupon.startDate} - {coupon.endDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-2 py-1 rounded ${
                    coupon.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => onToggleStatus(coupon.id)}
                >
                  {coupon.status}
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {coupon.usageCount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  onClick={() => onEdit(coupon)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => onDelete(coupon.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
