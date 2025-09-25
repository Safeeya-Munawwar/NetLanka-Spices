import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brown-900">Products</h2>
        <button
          onClick={() => navigate("/admin/products/form")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
          <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-brown-900">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-brown-400">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-brown-400">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr
                  key={prod.id}
                  className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                >
                  <td className="px-6 py-4">
                    {prod.image && (
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-12 rounded-lg object-cover border border-yellow-300"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{prod.title}</td>
                  <td className="px-6 py-4">{prod.category?.title || "—"}</td>
                  <td className="px-6 py-4">${prod.price}</td>
                  <td className="px-6 py-4">{prod.quantity}</td>
                  <td className="px-6 py-4">
                    {prod.active ? (
                      <span className="text-green-700 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-700 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/form`, {
                          state: { product: prod },
                        })
                      }
                      className="text-yellow-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CategoryLayout>
  );
}
