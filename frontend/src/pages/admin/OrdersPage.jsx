import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaBoxOpen,
  FaHourglassHalf,
  FaCheckCircle,
  FaTruck,
  FaClipboardCheck,
  FaTimesCircle,
} from "react-icons/fa";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const ordersPerPage = 10;
  const token = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "pending"
  ).length;
  const confirmedOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "confirmed"
  ).length;
  const shippedOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "cancelled"
  ).length;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredByStatus =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === statusFilter);

  const searchedOrders = filteredByStatus.filter(
    (o) =>
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const sortedOrders = [...searchedOrders].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.map((o) => (o.id === orderId ? res.data : o)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <AdminSidebar />
      <div className="flex-1 p-10">
        {/* Stats Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "all" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("all")}
          >
            <FaBoxOpen className="text-3xl mx-auto mb-2 text-yellow-700" />
            <h3 className="text-lg font-semibold text-brown-900">Total</h3>
            <p className="text-3xl font-bold text-yellow-700">{totalOrders}</p>
          </div>

          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "pending" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("pending")}
          >
            <FaHourglassHalf className="text-3xl mx-auto mb-2 text-red-600" />
            <h3 className="text-lg font-semibold text-brown-900">Pending</h3>
            <p className="text-3xl font-bold text-red-600">{pendingOrders}</p>
          </div>

          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "confirmed" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("confirmed")}
          >
            <FaCheckCircle className="text-3xl mx-auto mb-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-brown-900">Confirmed</h3>
            <p className="text-3xl font-bold text-blue-600">
              {confirmedOrders}
            </p>
          </div>

          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "shipped" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("shipped")}
          >
            <FaTruck className="text-3xl mx-auto mb-2 text-purple-600" />
            <h3 className="text-lg font-semibold text-brown-900">Shipped</h3>
            <p className="text-3xl font-bold text-purple-600">
              {shippedOrders}
            </p>
          </div>

          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "delivered" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("delivered")}
          >
            <FaClipboardCheck className="text-3xl mx-auto mb-2 text-green-600" />
            <h3 className="text-lg font-semibold text-brown-900">Delivered</h3>
            <p className="text-3xl font-bold text-green-600">
              {deliveredOrders}
            </p>
          </div>
          <div
            className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${
              statusFilter === "cancelled" ? "ring-2 ring-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("cancelled")}
          >
            <FaTimesCircle className="text-3xl mx-auto mb-2 text-red-700" />
            <h3 className="text-lg font-semibold text-brown-900">Cancelled</h3>
            <p className="text-3xl font-bold text-red-700">{cancelledOrders}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-brown-900 mb-6">
          Order Management
        </h2>
        {/* Search + Pagination */}
        <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <input
            type="text"
            placeholder="Search by order ID, user name, or email..."
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
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-yellow-100 rounded-xl shadow-md">
            <thead className="bg-yellow-200 text-brown-900 uppercase text-sm">
              <tr>
                {[
                  "Order ID",
                  "User",
                  "Total Price",
                  "Status",
                  "Created At",
                  "Actions",
                ].map((col, i) => (
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
                ))}
              </tr>
            </thead>
            <tbody className="text-brown-900">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-brown-400">
                    Loading orders...
                  </td>
                </tr>
              ) : currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-brown-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-yellow-300 hover:bg-yellow-200 transition"
                  >
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      {order.user
                        ? `${order.user.name} (${order.user.email})`
                        : "Unknown User"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      LKR {order.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status.toLowerCase()}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                        className="border px-2 py-1 rounded bg-yellow-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
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
                  Order Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-brown-900 text-xl font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 text-brown-800">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>User:</strong>{" "}
                  {selectedOrder.user
                    ? `${selectedOrder.user.name} (${selectedOrder.user.email})`
                    : "Unknown User"}
                </p>
                <p>
                  <strong>Total Price:</strong> LKR {selectedOrder.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              {selectedOrder.items?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-brown-900 mb-2">Items:</h4>
                  <ul className="list-disc ml-6 space-y-1 text-brown-700">
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - Quantity: {item.quantity} - Price: LKR{" "}
                        {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
