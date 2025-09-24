import React, { useState } from "react";
import { users as mockUsers } from "../../data/users";
import AdminCard from "../../components/admin/AdminCard";

export default function Users() {
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <div>
      <div
        className="w-full h-64 md:h-80 bg-center bg-cover flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/12.jpg')" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Manage Users</h1>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(u => (
            <AdminCard
              key={u.id}
              title={u.name}
              details={`Email: ${u.email}`}
              actions={
                <button
                  onClick={() => handleDelete(u.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
