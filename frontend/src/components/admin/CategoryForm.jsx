import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";

export default function CategoryFormPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingCategory = state?.cat || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setTitle(editingCategory.title || "");
      setDescription(editingCategory.description || "");
      setImagePreview(editingCategory.image || "");
      setActive(editingCategory.active ?? true);
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("active", active);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:5000/api/categories/${editingCategory.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/categories");
    } catch (err) {
      console.error(
        "Error submitting category:",
        err.response?.data || err.message
      );
      alert("Failed to save category. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-center items-start">
        <div className="bg-yellow-100 rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            {editingCategory ? "Edit Category" : "New Category"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-brown-800 mb-2">
                Category Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type the category title"
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-2">
                Category Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type the category description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-2">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
                className="block w-full text-brown-800"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-20 h-20 rounded-full object-cover border border-yellow-300"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-brown-800">Active</label>
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
                className="w-5 h-5 accent-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
              {loading
                ? editingCategory
                  ? "Updating..."
                  : "Creating..."
                : editingCategory
                ? "Update Category"
                : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}
