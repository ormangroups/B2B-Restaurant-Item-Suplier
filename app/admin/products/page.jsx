"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";
import "../../../styles/global.css";

const ProductManager = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
    available: true,
    unit: "", // New field
  });
  const [newCategory, setNewCategory] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.fetchCategories();
        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.getAllProducts();
        setProducts(response || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const categoryPayload = newCategory || newProduct.category;

    if (!categoryPayload) {
      setNewProduct((prevProduct) => ({ ...prevProduct, category: "" }));
      return;
    }

    const productPayload = { ...newProduct, category: categoryPayload };

    try {
      const createdProduct = await api.createProduct(productPayload);
      setProducts((prev) => [...prev, createdProduct]);

      setShowAddProductModal(false);
      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
        available: true,
        unit: "",
      });
      setNewCategory("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = await api.updateProduct(
        `${editingProduct.id}`,
        editingProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setEditingProduct(null);
      setShowAddProductModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.deleteProduct(`${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditModal = (product) => {
    setEditingProduct(product);
    setShowAddProductModal(true);
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setNewProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600"
          onClick={() => {
            setEditingProduct(null);
            setShowAddProductModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts[category].map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={
                    product.image
                      ? product.image
                      : "/path/to/default/image.jpg"
                  }
                  alt={product.name || "Product Image"}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">Unit: {product.unit}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">₹{product.price}</span>
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
        </div>
      ))}

      {showAddProductModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={
                    editingProduct
                      ? editingProduct.category
                      : newProduct.category
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                        })
                      : setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={
                    editingProduct
                      ? editingProduct.description
                      : newProduct.description
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      : setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={
                    editingProduct ? editingProduct.price : newProduct.price
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={
                    editingProduct ? editingProduct.image : newProduct.image
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          image: e.target.value,
                        })
                      : setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Unit</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.unit : newProduct.unit}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          unit: e.target.value,
                        })
                      : setNewProduct({ ...newProduct, unit: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., kg, liter, pack"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      editingProduct
                        ? editingProduct.available
                        : newProduct.available
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            available: isChecked,
                          })
                        : setNewProduct({
                            ...newProduct,
                            available: isChecked,
                          });
                    }}
                    className="mr-2"
                  />
                  Available
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowAddProductModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
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
