import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import {
  FaSort, FaSortUp, FaSortDown, FaBoxOpen, FaHourglassHalf, FaCheckCircle,
  FaTruck, FaClipboardCheck, FaTimesCircle
} from "react-icons/fa";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 10;
  const token = localStorage.getItem("token");

  // Compute totals
  const computeOrderTotal = (order, currency = "LKR") =>
    order.items?.reduce((sum, item) => {
      if (currency === "LKR") return sum + (item.totalPriceLKR || item.priceLKR * item.quantity || 0);
      return sum + (item.totalPriceUSD || item.priceUSD * item.quantity || 0);
    }, 0) || 0;

  // Fetch orders
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

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // // Delete order permanently
  // const handleDelete = async (orderId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to permanently delete this order?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
  //     alert("Order deleted successfully!");
  //     // Remove deleted order from state
  //     setOrders((prev) => prev.filter((order) => order.id !== orderId));
  //   } catch (err) {
  //     console.error("Failed to delete order:", err);
  //     alert("Failed to delete order.");
  //   }
  // };

  // Sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filtering
  const handleFilterClick = (status) => { setStatusFilter(status); setCurrentPage(1); };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(prev => prev.map(o => o.id === orderId ? res.data : o));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // Filter + search + sort
  const filteredOrders = (statusFilter === "all" ? orders : orders.filter(o => o.status?.toLowerCase() === statusFilter))
    .filter(o =>
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
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

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status?.toLowerCase() === "pending").length;
  const confirmedOrders = orders.filter(o => o.status?.toLowerCase() === "confirmed").length;
  const shippedOrders = orders.filter(o => o.status?.toLowerCase() === "shipped").length;
  const deliveredOrders = orders.filter(o => o.status?.toLowerCase() === "delivered").length;
  const cancelledOrders = orders.filter(o => o.status?.toLowerCase() === "cancelled").length;

  const openModal = (order) => { setSelectedOrder(order); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setSelectedOrder(null); };

  return (
    <div className="flex min-h-screen bg-yellow-50">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-64 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {[
            { icon: <FaBoxOpen />, label: "Total", count: totalOrders, color: "text-yellow-700", key: "all" },
            { icon: <FaHourglassHalf />, label: "Pending", count: pendingOrders, color: "text-red-600", key: "pending" },
            { icon: <FaCheckCircle />, label: "Confirmed", count: confirmedOrders, color: "text-blue-600", key: "confirmed" },
            { icon: <FaTruck />, label: "Shipped", count: shippedOrders, color: "text-purple-600", key: "shipped" },
            { icon: <FaClipboardCheck />, label: "Delivered", count: deliveredOrders, color: "text-green-600", key: "delivered" },
            { icon: <FaTimesCircle />, label: "Cancelled", count: cancelledOrders, color: "text-red-700", key: "cancelled" },
          ].map(stat => (
            <div key={stat.key} onClick={() => handleFilterClick(stat.key)} className={`bg-yellow-100 rounded-2xl p-6 shadow-md border cursor-pointer text-center ${statusFilter === stat.key ? "ring-2 ring-yellow-500" : ""}`}>
              <div className={`text-3xl mx-auto mb-2 ${stat.color}`}>{stat.icon}</div>
              <h3 className="text-lg font-semibold text-brown-900">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Search + Pagination */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by order ID, user name, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500"
          />
          <div className="text-sm text-brown-700 space-x-2">
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300">Prev</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300">Next</button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-yellow-100 rounded-xl shadow-md">
            <thead className="bg-yellow-200 uppercase text-sm text-brown-900">
              <tr>
                {["Order ID", "User", "Total Price (LKR)", "Total Price (USD)", "Status", "Created At", "Actions"].map((col, i) => (
                  <th key={i} onClick={() => handleSort(col.toLowerCase().replace(/[^a-z]/g, ""))} className="px-6 py-3 cursor-pointer select-none">
                    {col}
                    {sortConfig.key === col.toLowerCase().replace(/[^a-z]/g, "") ? (
                      sortConfig.direction === "asc" ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                    ) : <FaSort className="inline ml-1" />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center py-6">Loading orders...</td></tr>
              ) : currentOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-6">No orders found.</td></tr>
              ) : currentOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-yellow-200 transition">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.user ? `${order.user.name} (${order.user.email})` : "Unknown"}</td>
                  <td className="px-6 py-4 font-bold">LKR {computeOrderTotal(order, "LKR").toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold">USD ${computeOrderTotal(order, "USD").toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select value={order.status.toLowerCase()} onChange={(e) => handleStatusUpdate(order.id, e.target.value)} className="border px-2 py-1 rounded bg-yellow-50">
                      {["pending","confirmed","shipped","delivered","cancelled"].map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => openModal(order)} className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400" title="View Details">👁️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {modalOpen && selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300"
            onClick={closeModal}
          >
            <div
              className="bg-yellow-50 rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn border border-gray-200"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-red-500 transition">✕</button>
              <h2 className="text-2xl font-semibold text-yellow-900 mb-6 text-center border-b pb-3">Order Details</h2>

              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>User:</strong> {selectedOrder.user?.name || "Unknown"} ({selectedOrder.user?.email || "-"})</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Placed At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  {selectedOrder.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name} ({item.weightKg}kg × {item.quantity}) - LKR {(item.totalPriceLKR || item.priceLKR * item.quantity).toLocaleString()} / USD ${(item.totalPriceUSD || item.priceUSD * item.quantity).toFixed(2)}
                    </p>
                  ))}
                </div>

                <p className="mt-4 font-bold text-lg text-right">
                  Total: LKR {computeOrderTotal(selectedOrder, "LKR").toLocaleString()} / USD ${computeOrderTotal(selectedOrder, "USD").toFixed(2)}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                {selectedOrder.user?.email && (
                  <a href={`mailto:${selectedOrder.user.email}`} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 transition">📧 Email</a>
                )}
                <button onClick={closeModal} className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-gray-300 transition">❌ Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
