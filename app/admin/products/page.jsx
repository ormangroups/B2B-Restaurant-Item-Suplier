"use client"
import React, { useState } from "react";

const AdminProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    constantPrice: false,
    price: 0,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    price: 0,
  });

  // Handle Add Category
  const addCategory = () => {
    if (!newCategory.name) return alert("Category name is required!");
    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategory.name,
        constantPrice: newCategory.constantPrice,
        price: newCategory.constantPrice ? newCategory.price : null,
      },
    ]);
    setNewCategory({ name: "", constantPrice: false, price: 0 });
  };

  // Handle Add Product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.categoryId)
      return alert("Product name and category are required!");
    const category = categories.find((cat) => cat.id === newProduct.categoryId);
    if (!category) return alert("Invalid category!");

    if (category.constantPrice) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProduct.name,
          categoryId: category.id,
          price: category.price,
        },
      ]);
    } else {
      if (!newProduct.price)
        return alert("Price is required for products in this category!");
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProduct.name,
          categoryId: category.id,
          price: newProduct.price,
        },
      ]);
    }
    setNewProduct({ name: "", categoryId: "", price: 0 });
  };

  // Toggle Product Availability
  const toggleProductAvailability = (productId) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, available: !prod.available } : prod
      )
    );
  };

  // Notify Customers for Restock
  const notifyRestock = (productName) => {
    alert(`Notification sent for restock of ${productName}!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>

      {/* Add Category */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Category</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="p-2 border rounded"
          />
          <div className="flex items-center">
            <label className="mr-2">Constant Price for All Products:</label>
            <input
              type="checkbox"
              checked={newCategory.constantPrice}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  constantPrice: e.target.checked,
                  price: 0,
                })
              }
            />
          </div>
          {newCategory.constantPrice && (
            <input
              type="number"
              placeholder="Price"
              value={newCategory.price}
              onChange={(e) =>
                setNewCategory({ ...newCategory, price: e.target.value })
              }
              className="p-2 border rounded"
            />
          )}
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Add Product */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border rounded"
          />
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {!categories.find(
            (cat) =>
              cat.id === newProduct.categoryId && cat.constantPrice
          ) && (
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="p-2 border rounded"
            />
          )}
          <button
            onClick={addProduct}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="space-y-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-bold">{prod.name}</div>
                <div className="text-gray-600">
                  Category:{" "}
                  {
                    categories.find((cat) => cat.id === prod.categoryId)?.name
                  }
                </div>
                <div>Price: ${prod.price}</div>
              </div>
              <div>
                <button
                  onClick={() => toggleProductAvailability(prod.id)}
                  className={`py-2 px-4 rounded ${
                    prod.available
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {prod.available ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => notifyRestock(prod.name)}
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Notify Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;
