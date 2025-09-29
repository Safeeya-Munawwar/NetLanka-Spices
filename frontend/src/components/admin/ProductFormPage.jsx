import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";
import axios from "axios";

export default function ProductFormPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingProduct = state?.product || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data.map((c) => ({ id: c.id, title: c.title })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title || "");
      setDescription(editingProduct.description || "");
      setPrice(editingProduct.price || "");
      setQuantity(editingProduct.quantity || "");
      setCategoryId(editingProduct.categoryId || "");
      setImagePreview(editingProduct.image || "");
      setActive(editingProduct.active ?? true);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) return alert("Select a category.");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("categoryId", categoryId);
    formData.append("active", active);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingProduct) {
        if (!imageFile && editingProduct?.image) {
          formData.append("existingImage", editingProduct.image);
        }
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save product. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryLayout>
      <div className="flex justify-center items-start">
        <div className="bg-yellow-100 rounded-2xl p-6 w-full max-w-2xl shadow-lg border border-yellow-300">
          <h2 className="text-2xl font-bold text-brown-900 mb-6">
            {editingProduct ? "Edit Product" : "New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-brown-800 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-brown-800 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brown-800 mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-brown-800 mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-brown-800 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
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
                className="w-full text-brown-800"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg border border-yellow-300"
                />
              )}
            </div>

            {/* Active */}
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
                ? editingProduct
                  ? "Updating..."
                  : "Creating..."
                : editingProduct
                ? "Update Product"
                : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}
