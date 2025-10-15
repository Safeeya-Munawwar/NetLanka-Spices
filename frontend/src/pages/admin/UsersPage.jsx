import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import {
  FaTrash,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const filteredUsers = currentUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeactivate = async (id) => {
    if (id === currentUser?.id) {
      alert("You cannot deactivate your own account");
      return;
    }
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${id}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to deactivate user");
    }
  };

  const handleActivate = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${id}/activate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to activate user");
    }
  };

  const handleSaveEdit = async (updatedUser) => {
    if (updatedUser.id === currentUser?.id && updatedUser.role !== "admin") {
      alert("You cannot remove your own admin role");
      return;
    }
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${updatedUser.id}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [role, setRole] = useState(user?.role || "user");

    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !email || !role) {
        alert("All fields are required");
        return;
      }
      onSave({ id: user.id, name, email, role });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-yellow-100 rounded-2xl shadow-lg border border-yellow-300 w-full max-w-md p-6 relative">
          <h2 className="text-2xl font-bold text-brown-900 mb-4">Edit User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-brown-800 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-yellow-300 rounded-xl px-3 py-2 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-brown-800 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-yellow-300 rounded-xl px-3 py-2 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-brown-800 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-yellow-300 rounded-xl px-3 py-2 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-yellow-200 hover:bg-yellow-300 text-brown-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalRegular = totalUsers - totalAdmins;

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <AdminSidebar />

      <div className="flex-1 p-10 ml-64 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center cursor-pointer">
            <FaUser className="text-3xl mx-auto mb-2 text-yellow-700" />
            <h3 className="text-lg font-semibold text-brown-900">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-yellow-700">{totalUsers}</p>
          </div>

          <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center cursor-pointer">
            <FaShieldAlt className="text-3xl mx-auto mb-2 text-red-600" />
            <h3 className="text-lg font-semibold text-brown-900">Admins</h3>
            <p className="text-3xl font-bold text-red-600">{totalAdmins}</p>
          </div>

          <div className="bg-yellow-100 rounded-2xl p-6 shadow-md border border-yellow-300 text-center cursor-pointer">
            <FaUser className="text-3xl mx-auto mb-2 text-green-600" />
            <h3 className="text-lg font-semibold text-brown-900">
              Regular Users
            </h3>
            <p className="text-3xl font-bold text-green-600">{totalRegular}</p>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-brown-900 mb-6">
          User Management
        </h2>

        {/* Search + Pagination */}
        <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="space-x-2 text-brown-700 text-sm">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
            >
              Next
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
            <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
              <tr>
                {["Name", "Email", "Role", "Status", "Created At"].map(
                  (col, i) => (
                    <th
                      key={i}
                      onClick={() =>
                        handleSort(col.toLowerCase().replace(" ", ""))
                      }
                      className="px-6 py-3 cursor-pointer select-none"
                    >
                      {col}
                      {sortConfig.key === col.toLowerCase().replace(" ", "") ? (
                        sortConfig.direction === "asc" ? (
                          <FaSortUp className="inline ml-1" />
                        ) : (
                          <FaSortDown className="inline ml-1" />
                        )
                      ) : (
                        <FaSort className="inline ml-1" />
                      )}
                    </th>
                  )
                )}
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-brown-900">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-brown-400">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-brown-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                  >
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 flex items-center gap-2 font-semibold capitalize">
                      {user.role === "admin" ? (
                        <>
                          <FaShieldAlt className="text-blue-600" />{" "}
                          {/* Admin icon */}
                          <span className="text-blue-600">Admin</span>
                        </>
                      ) : (
                        <>
                          <FaUser className="text-gray-700" /> {/* User icon */}
                          <span className="text-gray-700">User</span>
                        </>
                      )}
                    </td>

                    <td
                      className={`px-6 py-4 font-semibold cursor-pointer ${
                        user.active ? "text-green-700" : "text-red-700"
                      }`}
                      onClick={() => !user.active && handleActivate(user.id)}
                      title={user.active ? "" : "Click to activate"}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 text-sm text-brown-700">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      {/* Edit */}
                      <button
                        className="text-yellow-700 hover:underline"
                        onClick={() => setEditingUser(user)}
                      >
                        <FaEdit />
                      </button>

                      {/* Delete / deactivate (visible for all except self) */}
                      {user.id !== Number(currentUser?.id) && (
                        <button
                          className="text-red-700 hover:underline"
                          onClick={() => {
                            if (!window.confirm("Mark this user as inactive?"))
                              return;
                            handleDeactivate(user.id);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <EditUserModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
}
