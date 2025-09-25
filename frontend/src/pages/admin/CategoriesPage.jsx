import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brown-900">Categories</h2>
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
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Date Created</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-brown-900">
            {categories.map((cat) => (
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
                <td className="px-6 py-4">
                  {cat.active ? (
                    <span className="text-green-700 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-700 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {new Date(cat.dateCreated).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/categories/edit/${cat.id}`, {
                        state: { cat },
                      })
                    }
                    className="text-yellow-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-brown-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CategoryLayout>
  );
}
