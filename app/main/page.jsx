"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "@/components/CatagorySection";
import api from "../api/mainapi";
import { setCategories, setLoading, setError } from "../redux/slices/categorySlice"; // Import actions
import { FaSpinner } from 'react-icons/fa'; // For loading spinner

const MainSection = () => {
  const dispatch = useDispatch();
  
  // Ensure the state is defined with a fallback
  const categoryState = useSelector((state) => state.category || { categories: [], loading: false, error: null });

  const { categories, loading, error } = categoryState;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true)); // Set loading state to true
      try {
        const products = await api.getAllProducts();

        // Group products by category
        const categoryMap = {};
        products.forEach((product) => {
          if (product.category) {
            if (!categoryMap[product.category]) {
              categoryMap[product.category] = {
                title: product.category,
                constantPrice: product.isCategoryPriceConstant ? product.price : null,
                products: [],
              };
            }
            categoryMap[product.category].products.push(product);
          }
        });

        // Dispatch the setCategories action to store the categories in Redux
        dispatch(setCategories(Object.values(categoryMap)));
        dispatch(setLoading(false)); // Set loading state to false
      } catch (error) {
        dispatch(setError("Error fetching products"));
        dispatch(setLoading(false)); // Set loading state to false
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSeeAll = (categoryTitle) => {
    // Replace this with a navigation or other useful action
    console.log(`See all clicked for ${categoryTitle}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="animate-spin" size={30} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (categories.length === 0 && !loading) {
    return <div>No categories available at the moment.</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Categories</h1>
      {categories.map((category) => (
        <CategorySection
          key={category.title} // Using category title as the key
          title={category.title}
          constantPrice={category.constantPrice}
          products={category.products}
          onSeeAll={() => handleSeeAll(category.title)}
        />
      ))}
    </div>
  );
};

export default MainSection;
