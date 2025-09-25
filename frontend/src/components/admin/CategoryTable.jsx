import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import CategoryLayout from "../../components/admin/CategoryLayout";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => setOpenMenu(openMenu === id ? null : id);

  return (
    <CategoryLayout>
      <div className="bg-yellow-100 text-brown-900 shadow-md rounded-2xl p-6 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-brown-700 text-sm border-b border-yellow-300">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category Image</th>
                <th className="py-3 px-4">Active</th>
                <th className="py-3 px-4">Date Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-yellow-200 transition-colors border-b border-yellow-300"
                >
                  <td className="py-3 px-4 font-medium">{cat.title}</td>
                  <td className="py-3 px-4">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {cat.active ? (
                      <span className="text-green-700 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-700 font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{cat.dateCreated}</td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      onClick={() => toggleMenu(cat.id)}
                      className="p-2 rounded-full hover:bg-yellow-300"
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenu === cat.id && (
                      <div className="absolute right-4 mt-2 w-40 bg-yellow-100 border border-yellow-300 rounded-xl shadow-lg z-10">
                        <ul className="py-2 text-sm text-brown-900">
                          <li>
                            <button
                              onClick={() => {
                                onDelete(cat.id);
                                setOpenMenu(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-red-400 hover:text-white"
                            >
                              Delete
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                onEdit(cat);
                                setOpenMenu(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-yellow-400 hover:text-white"
                            >
                              Edit
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CategoryLayout>
  );
}
