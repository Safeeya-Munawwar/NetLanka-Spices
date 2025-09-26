import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import CategoryLayout from "../../components/admin/CategoryLayout"; // Could be AdminLayout
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (id) => setOpenMenu(openMenu === id ? null : id);

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
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <CategoryLayout>
      <div className="bg-yellow-100 text-brown-900 shadow-md rounded-2xl p-6 w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          <button
            onClick={() => navigate("/admin/products/form")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl transition"
          >
            + Add Product
          </button>
        </div>

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
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
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
                    className="hover:bg-yellow-200 transition-colors border-b border-yellow-300"
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
                        <span className="text-green-700 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-700 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button
                        onClick={() => toggleMenu(prod.id)}
                        className="p-2 rounded-full hover:bg-yellow-300"
                      >
                        <FaEllipsisV />
                      </button>

                      {openMenu === prod.id && (
                        <div className="absolute right-4 mt-2 w-40 bg-yellow-100 border border-yellow-300 rounded-xl shadow-lg z-10">
                          <ul className="py-2 text-sm text-brown-900">
                            <li>
                              <button
                                onClick={() => {
                                  handleDelete(prod.id);
                                  setOpenMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-400 hover:text-white"
                              >
                                <FaTrash /> Delete
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  navigate(`/admin/products/form`, {
                                    state: { product: prod },
                                  });
                                  setOpenMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 hover:text-white"
                              >
                                <FaEdit /> Edit
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CategoryLayout>
  );
}
