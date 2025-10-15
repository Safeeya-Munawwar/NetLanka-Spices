import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLayout from "../../../components/admin/CategoryLayout";
import axios from "axios";
import {
  FaTrash,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaPlus,
  FaImage,
} from "react-icons/fa";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedBlogs = useMemo(() => {
    const sortable = [...blogs];
    if (!sortConfig.key) return sortable;
    return sortable.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === "createdAt" || sortConfig.key === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [blogs, sortConfig]);

  const filteredBlogs = sortedBlogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CategoryLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brown-900">Blog Management</h2>
        <button
          onClick={() => navigate("/admin/contents/blogform")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-yellow-100 rounded-xl shadow-md">
          <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
            <tr>
              {["Image", "Title", "Category", "Date"].map((col) => (
                <th
                  key={col}
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
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-brown-400">
                  Loading blogs...
                </td>
              </tr>
            ) : filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-brown-400">
                  No blogs found.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                >
                  <td className="px-6 py-4">
                    {blog.image ? (
                      <img
                        src={`http://localhost:5000${blog.image}`}
                        alt={blog.title}
                        className="w-14 h-14 rounded-lg object-cover border border-yellow-300"
                      />
                    ) : (
                      <FaImage className="text-yellow-700 text-2xl" />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4">{blog.category}</td>
                  <td className="px-6 py-4">{blog.date}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate("/admin/contents/blogform", { state: { blog } })
                      }
                      className="text-yellow-700 hover:underline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-700 hover:underline"
                    >
                      <FaTrash />
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
