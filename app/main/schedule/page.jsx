"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";
import { useSelector } from "react-redux";

const DailyOrders = () => {
  const [products, setProducts] = useState([]);
  const [scheduledProducts, setScheduledProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const restaurantId = useSelector((state) => state.restaurant.restaurant?.id);

  useEffect(() => {
    const fetchData = async () => {
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

        // Fetch scheduled products
        const scheduledData = await api.getDailyScheduledOrders(restaurantId);
        setScheduledProducts(scheduledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const addProductToSchedule = async (product, quantity) => {
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
      setScheduledProducts(scheduledProducts.filter((p) => p.product.id !== productId));
    } catch (error) {
      console.error("Error removing from schedule:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-10">
      <h1 className="text-2xl font-bold mb-4">Daily Scheduled Orders</h1>

      {Object.keys(categories).length === 0 ? (
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
                        defaultValue={1}
                        id={`quantity-₹{product.id}`}
                      />
                      <button
                        onClick={() =>
                          addProductToSchedule(
                            product,
                            Number(document.getElementById(`quantity-₹{product.id}`).value)
                          )
                        }
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
      {scheduledProducts.length === 0 ? (
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
