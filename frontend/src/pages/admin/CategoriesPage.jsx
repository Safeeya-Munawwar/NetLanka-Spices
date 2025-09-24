import React, { useState } from "react";
import { categories as mockCategories } from "../../data/categories";
import AdminCard from "../../components/admin/AdminCard";

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories);

  const handleDelete = (id) => setCategories(categories.filter(c => c.id !== id));

  const handleAdd = () => {
    const newCat = {
      id: Date.now(),
      name: "New Category",
      image: "/images/categories-header.jpg",
    };
    setCategories([...categories, newCat]);
  };

  return (
    <div>
      <div
        className="w-full h-64 md:h-80 bg-center bg-cover flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/12.jpg')" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Manage Categories</h1>
      </div>

      <div className="container mx-auto px-6 py-12">
        <button
          onClick={handleAdd}
          className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Add Category
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(c => (
            <AdminCard
              key={c.id}
              title={c.name}
              image={c.image}
              actions={
                <>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
