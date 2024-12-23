"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";
import { useSelector } from "react-redux";

const DailyOrders = () => {
  const [products, setProducts] = useState([]);
  const [scheduledProducts, setScheduledProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [quantities, setQuantities] = useState({}); // State to manage quantities
  const [loading, setLoading] = useState(true); // Loading state
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch all products
        const productsData = await api.getAllProducts();
        setProducts(productsData);

        // Group products by category
        const categorizedProducts = productsData.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setCategories(categorizedProducts);

        // Initialize quantities for all products
        const initialQuantities = productsData.reduce((acc, product) => {
          acc[product.id] = 1; // Default quantity to 1
          return acc;
        }, {});
        setQuantities(initialQuantities);

        // Fetch scheduled products
        const scheduledData = await api.getDailyScheduledOrders(restaurantId);
        setScheduledProducts(scheduledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const addProductToSchedule = async (product) => {
    const quantity = quantities[product.id];
    if (quantity > 0) {
      const newScheduledProduct = {
        product,
        quantity,
        price: product.price * quantity,
      };

      try {
        await api.addToDailyScheduledOrders(restaurantId, newScheduledProduct);
        setScheduledProducts([...scheduledProducts, newScheduledProduct]);
      } catch (error) {
        console.error("Error adding to schedule:", error);
      }
    }
  };

  const removeProductFromSchedule = async (productId) => {
    try {
      await api.removeFromDailyScheduledOrders(restaurantId, productId);
      setScheduledProducts(
        scheduledProducts.filter((p) => p.product.id !== productId)
      );
    } catch (error) {
      console.error("Error removing from schedule:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-10 md:mb-11">
      <h1 className="text-2xl font-bold mb-4">Daily Scheduled Orders</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p> // Show loading indicator
      ) : Object.keys(categories).length === 0 ? (
        <p className="text-gray-600">No products available. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categories).map(([categoryName, products]) => (
            <div key={categoryName} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{categoryName}</h2>
              <div className="space-y-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{product.name}</span>
                      <span className="text-gray-500"> - ₹{product.price}</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="border p-1 w-16 mr-2"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(product.id, Number(e.target.value))
                        }
                      />
                      <button
                        onClick={() => addProductToSchedule(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-bold mt-6">Scheduled Products</h2>
      {loading ? (
         <div className="fixed inset-0 flex items-center justify-center bg-white "> <div className="flex flex-col items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-16 w-16 mb-4"></div> <h2 className="text-center text-lg font-semibold">Loading...</h2> <p className="w-1/2 text-center text-gray-500">Please wait while we prepare everything for you.</p> </div> </div>// Show loading indicator for scheduled products
      ) : scheduledProducts.length === 0 ? (
        <p className="text-gray-600">No scheduled products yet.</p>
      ) : (
        <ul className="list-disc ml-6">
          {scheduledProducts.map((item) => (
            <li key={item.product.id} className="flex items-center justify-between p-2 border-b">
              <div>
                <span className="font-semibold">{item.product.name}</span>
                <span className="text-gray-500"> - {item.quantity}</span>
              </div>
              <button
                onClick={() => removeProductFromSchedule(item.product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyOrders;
