import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryLayout from "../../components/admin/CategoryLayout";

export default function CategoryFormPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingCategory = state?.cat || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (editingCategory) {
      setTitle(editingCategory.title);
      setDescription(editingCategory.description);
      setImage(editingCategory.image);
      setActive(editingCategory.active);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: editingCategory ? editingCategory.id : Date.now(),
      title,
      description,
      image: image || "/1.jpeg",
      active,
      dateCreated: editingCategory
        ? editingCategory.dateCreated
        : new Date().toLocaleDateString(),
    };

    navigate("/admin/categories", {
      state: { newCategory, editing: !!editingCategory },
    });
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
              <label className="block text-brown-800 mb-2">Category Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type the category title"
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-2">Category Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type the category description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-yellow-50 text-brown-900 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-brown-800 mb-2">Category Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="block w-full text-brown-800"
              />
              {image && (
                <img
                  src={image}
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
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl transition"
            >
              {editingCategory ? "Update Category" : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </CategoryLayout>
  );
}