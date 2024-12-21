"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategorySection } from "@/components/CatagorySection";
import api from "../api/mainapi";
import { setProducts, setLoading, setError } from "../redux/slices/productSlice"; // Redux actions
import { FaSpinner } from "react-icons/fa"; // Loading spinner

const MainSection = () => {
  const dispatch = useDispatch();

  // Select productsByCategory, loading, and error from Redux store
  const { productsByCategory, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    // Fetch products and categorize them
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const products = await api.getAllProducts(); // Fetch products from API
        console.log("Fetched Products:", products); // Log for debugging

        // Dispatch the setProducts action to store categorized products in Redux
        dispatch(setProducts(products));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setError("Failed to fetch products."));
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSeeAll = (categoryTitle) => {
    console.log(`See all clicked for ${categoryTitle}`); // Placeholder action
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white "> <div className="flex flex-col items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div> <h2 className="text-center text-lg font-semibold">Loading...</h2> <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p> </div> </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // No categories available
  if (Object.keys(productsByCategory).length === 0) {
    return <div>No categories available at the moment.</div>;
  }

  // Render categories
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Categories</h1>
      {Object.keys(productsByCategory).map((category) => {
        const { products, constantPrice } = productsByCategory[category];
        return (
          <CategorySection
            key={category}
            title={category}
            constantPrice={constantPrice}
            products={products}
            onSeeAll={() => handleSeeAll(category)}
          />
        );
      })}
    </div>
  );
};

export default MainSection;

