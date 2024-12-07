"use client";

import React, { useState } from "react";
import CouponTable from "@/components/Admin/cupons/CouponTable";

import CouponForm from "@/components/Admin/cupons/CouponForm";

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleAddCoupon = (coupon) => {
    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === editingCoupon.id ? { ...coupon, id: c.id } : c))
      );
    } else {
      setCoupons((prev) => [...prev, { ...coupon, id: Date.now() }]);
    }
    setEditingCoupon(null);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
  };

  const handleDeleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coupon Management</h1>
      <CouponForm onSubmit={handleAddCoupon} initialData={editingCoupon} />
      <div className="mt-6">
        <CouponTable
          coupons={coupons}
          onEdit={handleEditCoupon}
          onDelete={handleDeleteCoupon}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
};

export default AdminCouponsPage;
