import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";
import {
  FaTrash,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateCreated",
    direction: "desc",
  });
  const productsPerPage = 10;

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
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedProducts = useMemo(() => {
    const sortable = [...products];
    if (!sortConfig.key) return sortable;
    return sortable.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "active") {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }

      if (sortConfig.key === "dateCreated") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [products, sortConfig]);

  const filteredProducts = useMemo(
    () =>
      sortedProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.category?.title.toLowerCase().includes(search.toLowerCase())
      ),
    [sortedProducts, search]
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <CategoryLayout>
      {/* --- Top Stats with Icons --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <FaBoxOpen className="text-3xl mx-auto mb-2 text-yellow-700" />
          <h3 className="text-lg font-semibold text-brown-900">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-yellow-700">
            {products.length}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <FaCheckCircle className="text-3xl mx-auto mb-2 text-green-600" />
          <h3 className="text-lg font-semibold text-brown-900">
            Active Products
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {products.filter((p) => p.active).length}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <FaTimesCircle className="text-3xl mx-auto mb-2 text-red-600" />
          <h3 className="text-lg font-semibold text-brown-900">
            Inactive Products
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((p) => !p.active).length}
          </p>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-brown-900 mb-6">
        Product Management
      </h2>

      {/* Header + Search + Add */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-64 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
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
        {[
          "Image",
          "Title",
          "Category",
          "Price (LKR)",
          "Price (USD)",
          "Quantity",
          "Active",
        ].map((col, i) => (
          <th
            key={i}
            className="px-6 py-3 cursor-pointer select-none"
            onClick={() => handleSort(col.toLowerCase())}
          >
            {col}
            {sortConfig.key === col.toLowerCase() ? (
              sortConfig.direction === "asc" ? (
                <FaSortUp className="inline ml-1" />
              ) : (
                <FaSortDown className="inline ml-1" />
              )
            ) : (
              <FaSort className="inline ml-1" />
            )}
          </th>
        ))}
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>

    <tbody className="text-brown-900">
      {loading ? (
        <tr>
          <td colSpan="8" className="text-center py-6 text-brown-400">
            Loading products...
          </td>
        </tr>
      ) : currentProducts.length === 0 ? (
        <tr>
          <td colSpan="8" className="text-center py-6 text-brown-400">
            No products found.
          </td>
        </tr>
      ) : (
        currentProducts.map((prod) => (
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
            <td className="px-6 py-4 font-semibold text-yellow-700">
              Rs. {prod.priceLKR?.toLocaleString() ?? "—"}
            </td>
            <td className="px-6 py-4 font-semibold text-yellow-700">
              ${prod.priceUSD ?? "—"}
            </td>
            <td className="px-6 py-4">{prod.quantity}</td>
            <td
              className={`px-6 py-4 font-semibold ${
                prod.active ? "text-green-700" : "text-red-700"
              }`}
            >
              {prod.active ? "Active" : "Inactive"}
            </td>
            <td className="px-6 py-4 flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  navigate(`/admin/products/form`, {
                    state: { product: prod },
                  })
                }
                className="text-yellow-700 hover:underline flex items-center justify-center h-6 w-6"
              >
                <FaEdit className="text-lg mt-1" />
              </button>
              <button
                onClick={() => handleDelete(prod.id)}
                className="text-red-700 hover:underline flex items-center justify-center h-6 w-6"
              >
                <FaTrash className="text-lg mt-1" />
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

{/* Pagination Controls */}
<div className="flex justify-center mt-6 gap-3">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`px-4 py-2 rounded-xl border ${
      currentPage === 1
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-yellow-600 text-white hover:bg-yellow-700"
    }`}
  >
    Prev
  </button>

  <span className="px-3 py-2 text-brown-900">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`px-4 py-2 rounded-xl border ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-yellow-600 text-white hover:bg-yellow-700"
    }`}
  >
    Next
  </button>
</div>

    </CategoryLayout>
  );
}
