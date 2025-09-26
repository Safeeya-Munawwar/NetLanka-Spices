import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateCreated",
    direction: "desc",
  });
  const categoriesPerPage = 10;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Sorting ---
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCategories = useMemo(() => {
    const sortable = [...categories];
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
  }, [categories, sortConfig]);

  const filteredCategories = useMemo(
    () =>
      sortedCategories.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          (c.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
      ),
    [sortedCategories, search]
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  // Stats
  const totalCategories = categories.length;
  const totalActive = categories.filter((c) => c.active).length;
  const totalInactive = totalCategories - totalActive;

  return (
    <CategoryLayout>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <h3 className="text-lg font-semibold text-brown-900">
            Total Categories
          </h3>
          <p className="text-3xl font-bold text-yellow-700">
            {totalCategories}
          </p>
        </div>
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <h3 className="text-lg font-semibold text-brown-900">Active</h3>
          <p className="text-3xl font-bold text-green-600">{totalActive}</p>
        </div>
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center">
          <h3 className="text-lg font-semibold text-brown-900">Inactive</h3>
          <p className="text-3xl font-bold text-red-600">{totalInactive}</p>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-brown-900 mb-6">
        Category Management
      </h2>

      {/* Header + Search + Add */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="w-full md:w-64 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={() => navigate("/admin/categories/new")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl transition"
        >
          + New Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
          <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("title")}
              >
                Title
                {sortConfig.key === "title" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline ml-1" />
                  ) : (
                    <FaSortDown className="inline ml-1" />
                  )
                ) : (
                  <FaSort className="inline ml-1" />
                )}
              </th>
              <th className="px-6 py-3">Description</th>
              <th
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("active")}
              >
                Active
                {sortConfig.key === "active" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline ml-1" />
                  ) : (
                    <FaSortDown className="inline ml-1" />
                  )
                ) : (
                  <FaSort className="inline ml-1" />
                )}
              </th>
              <th
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("dateCreated")}
              >
                Date Created
                {sortConfig.key === "dateCreated" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline ml-1" />
                  ) : (
                    <FaSortDown className="inline ml-1" />
                  )
                ) : (
                  <FaSort className="inline ml-1" />
                )}
              </th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-brown-900">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-brown-400">
                  Loading categories...
                </td>
              </tr>
            ) : currentCategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-brown-400">
                  No categories found.
                </td>
              </tr>
            ) : (
              currentCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-12 h-12 rounded-lg object-cover border border-yellow-300"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{cat.title}</td>
                  <td className="px-6 py-4">{cat.description}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      cat.active ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {cat.active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4 text-sm text-brown-700">
                    {new Date(cat.dateCreated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex items-end justify-center gap-3 h-full">
                    <button
                      onClick={() =>
                        navigate(`/admin/categories/edit/${cat.id}`, {
                          state: { cat },
                        })
                      }
                      className="text-yellow-700 hover:underline flex items-center justify-center h-6 w-6"
                    >
                      <FaEdit className="text-lg mt-1" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-2 text-brown-700 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
          >
            Next
          </button>
        </div>
      )}
    </CategoryLayout>
  );
}
