import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import { FaBoxOpen, FaPhone, FaEnvelope, FaUser, FaBuilding, FaSortAmountUp, FaWeight, FaCommentAlt, FaCalendar } from "react-icons/fa";

export default function BulkOrdersPage() {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("token");

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const fetchBulkOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/bulk-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBulkOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch bulk orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBulkOrders();
  }, [fetchBulkOrders]);

  const searchedOrders = bulkOrders.filter(
    (o) =>
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/bulk-orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setBulkOrders((prev) =>
        prev.map((o) => (o.id === orderId ? res.data : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };
  

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <AdminSidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold text-brown-900 mb-6">
          Bulk Order Requests
        </h2>

        {/* Search Box */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, email or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-brown-700 font-medium">
            Total Requests: {bulkOrders.length}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
            <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Weight per Product</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
                <th className="px-6 py-3">Status</th> {/* New header */}

              </tr>
            </thead>
            <tbody className="text-brown-900">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-brown-400">
                    Loading bulk orders...
                  </td>
                </tr>
              ) : searchedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-brown-400">
                    No bulk order requests found.
                  </td>
                </tr>
              ) : (
                searchedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                  >
                    <td className="px-6 py-4 font-medium">{order.name}</td>
                    <td className="px-6 py-4">{order.email}</td>
                    <td className="px-6 py-4">{order.company || "-"}</td>
                    <td className="px-6 py-4">{order.quantity || "-"}</td>
                    <td className="px-6 py-4">{order.weight || "-"}</td>
                    <td className="px-6 py-4 text-sm text-brown-700">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal(order)}
                        className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                        title="View Details"
                      >
                        👁️
                      </button>
                    </td>
                    <td className="px-6 py-4">
  <select
    value={order.status?.toLowerCase() || "pending"}
    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
    className="border px-2 py-1 rounded bg-yellow-50"
  >
    <option value="pending">Pending</option>
    <option value="confirmed">Confirmed</option>
    <option value="delivered">Delivered</option>
    <option value="cancelled">Cancelled</option>
  </select>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            onClick={closeModal}
          >
            <div
              className="bg-yellow-50 rounded-2xl shadow-xl w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-brown-900">
                  Bulk Order Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-brown-900 text-xl font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-brown-800">
                <p>
                  <FaUser className="inline mr-2 text-yellow-600" />
                  <strong>Name:</strong> {selectedOrder.name}
                </p>
                <p>
                  <FaEnvelope className="inline mr-2 text-yellow-600" />
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <FaPhone className="inline mr-2 text-yellow-600" />
                  <strong>Phone:</strong> {selectedOrder.phone || "-"}
                </p>
                <p>
                  <FaBuilding className="inline mr-2 text-yellow-600" />
                  <strong>Company:</strong> {selectedOrder.company || "-"}
                </p>
                {selectedOrder.productList && (
                  <p>
                    <FaBoxOpen className="inline mr-2 text-yellow-600" />
                    <strong>Requested Products:</strong>{" "}
                    {selectedOrder.productList}
                  </p>
                )}
                {selectedOrder.quantity && (
                  <p>
                    <FaSortAmountUp className="inline mr-2 text-yellow-600" />
                    <strong>Quantity:</strong> {selectedOrder.quantity}
                  </p>
                )}
                {selectedOrder.weight && (
                  <p>
                    <FaWeight className="inline mr-2 text-yellow-600" />
                    <strong>Weight per Product:</strong>{" "}
                    {selectedOrder.weight}
                  </p>
                )}
                <p>
                <FaCommentAlt className="inline mr-2 text-yellow-600" />
                  <strong>Message:</strong>
                  <br />
                  {selectedOrder.message || "-"}
                </p>
                <p className="text-sm text-brown-600">
                <FaCalendar className="inline mr-2 text-yellow-600" />
                  <strong>Submitted on:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex gap-4">
  {selectedOrder.email && (
    <a
      href={`mailto:${selectedOrder.email}`}
      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
    >
      📧 Email
    </a>
  )}
  {selectedOrder.phone && (
    <a
      href={`tel:${selectedOrder.phone}`}
      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center gap-2"
    >
      📞 Call
    </a>
  )}
</div>

              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-yellow-300 rounded-xl hover:bg-yellow-400 font-medium"
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
