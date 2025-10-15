import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../../components/admin/CategoryLayout";
import axios from "axios";

export default function ServiceForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingService = state?.service || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setDescription(editingService.description);
      setImagePreview(`http://localhost:5000${editingService.image}`);
    }
  }, [editingService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingService) {
        await axios.put(
          `http://localhost:5000/api/services/${editingService.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/services", formData);
      }
      navigate("/admin/contents/services");
    } catch (err) {
      console.error("Failed to save service:", err);
      alert("Error saving service. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-center items-start">
        <div className="bg-yellow-100 rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            {editingService ? "Edit Service" : "Add New Service"}
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
              <label className="block text-brown-800 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
                ? editingService
                  ? "Updating..."
                  : "Creating..."
                : editingService
                ? "Update Service"
                : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}
