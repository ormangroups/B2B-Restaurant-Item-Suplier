"use client";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import api from "@/app/api/mainapi";


const ProductManager = () => {
  const router = useReducer
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
    isAvailable: true,
    isCategoryPriceConstant: true,
  });
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.fetchCategories("/api/categories");
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.getAllProducts("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await axios.post("/api/products/create", newProduct);
      setProducts((prev) => [...prev, createdProduct.data]);
      setShowAddProductModal(false);
      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
        isAvailable: true,
        isCategoryPriceConstant: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await axios.put(`/api/products/${editingProduct.id}`, editingProduct);
      setProducts(products.map((product) =>
        product.id === updatedProduct.data.id ? updatedProduct.data : product
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditModal = (product) => {
    setEditingProduct(product);
    setShowAddProductModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600"
          onClick={() => setShowAddProductModal(true)}
        >
          Add Product
        </button>
      </div>

      {/* Filter and Categories */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push(`/admin/products?category=${category.id}`)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg">${product.price}</span>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, name: e.target.value })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, category: e.target.value })
                      : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct ? editingProduct.price : newProduct.price}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, price: e.target.value })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, description: e.target.value })
                      : setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowAddProductModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
