import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../../components/admin/CategoryLayout";
import axios from "axios";

export default function BeyondForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingItem = state?.item || null;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setSubtitle(editingItem.subtitle || "");
      setDescription(editingItem.description || "");
      setImagePreviews(editingItem.images.map(img => `http://localhost:5000${img}`));
    }
  }, [editingItem]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFiles.length && !editingItem) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (subtitle) formData.append("subtitle", subtitle);
    if (description) formData.append("description", description);
    imageFiles.forEach(file => formData.append("images", file));

    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/beyondTradition/${editingItem.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/beyondTradition", formData);
      }
      navigate("/admin/contents/beyondTradition");
    } catch (err) {
      console.error(err);
      alert("Error saving entry. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-center items-start">
        <div className="bg-yellow-100 rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            {editingItem ? "Edit Entry" : "Add New Entry"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-brown-800 mb-1">Title (Optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Subtitle (Optional)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-1">Images (Required)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                required={!editingItem} // required only when adding new
              />
              <div className="flex gap-2 mt-2">
                {imagePreviews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="w-24 h-24 object-cover rounded-lg border border-yellow-300"
                    alt={`Preview ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
              {loading ? (editingItem ? "Updating..." : "Creating...") : (editingItem ? "Update Entry" : "Create Entry")}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}
