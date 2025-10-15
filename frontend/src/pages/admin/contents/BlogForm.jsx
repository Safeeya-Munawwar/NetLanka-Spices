import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../../components/admin/CategoryLayout";
import axios from "axios";

export default function BlogForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingBlog = state?.blog || null;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setCategory(editingBlog.category);
      setDate(editingBlog.date);
      setDescription(editingBlog.description);
      setImagePreview(`http://localhost:5000${editingBlog.image}`);
    }
  }, [editingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingBlog) {
        await axios.put(
          `http://localhost:5000/api/blogs/${editingBlog.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/blogs", formData);
      }
      navigate("/admin/contents/blogs");
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Error saving blog. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-center items-start">
        <div className="bg-yellow-100 rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            {editingBlog ? "Edit Blog" : "Add New Blog"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-brown-800 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files[0];
                  setImageFile(f);
                  if (f) setImagePreview(URL.createObjectURL(f));
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg border border-yellow-300"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
              {loading
                ? editingBlog
                  ? "Updating..."
                  : "Creating..."
                : editingBlog
                ? "Update Blog"
                : "Create Blog"}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}
