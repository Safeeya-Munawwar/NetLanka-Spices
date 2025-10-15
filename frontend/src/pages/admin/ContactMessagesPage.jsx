import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";

export default function ContactMessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchContacts = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const searchedContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete contact");
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-64 overflow-y-auto">
        <h2 className="text-2xl font-bold text-brown-900 mb-6">
          Contact Messages
        </h2>

        {/* Search Box */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-brown-700 font-medium">
            Total Messages: {contacts.length}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
            <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-brown-900">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-brown-400">
                    Loading messages...
                  </td>
                </tr>
              ) : searchedContacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-brown-400">
                    No messages found.
                  </td>
                </tr>
              ) : (
                searchedContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                  >
                    <td className="px-6 py-4 font-medium">{contact.name}</td>
                    <td className="px-6 py-4">{contact.email}</td>
                    <td className="px-6 py-4">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm text-brown-700">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => openModal(contact)}
                        className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="px-3 py-1 bg-red-400 rounded hover:bg-red-500 text-white"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && selectedContact && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-red-500"
              >
                ✕
              </button>
              <h2 className="text-2xl font-semibold text-yellow-900 mb-6 text-center border-b pb-3">
                Message Details
              </h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Phone:</strong> {selectedContact.phone}</p>
                {selectedContact.message && (
                  <p className="border border-gray-200 bg-gray-50 p-3 rounded-lg">
                    <strong>Message:</strong> <br />
                    {selectedContact.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Submitted: {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
