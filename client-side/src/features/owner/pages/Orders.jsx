import { useState, useEffect } from "react";
import ownerApi from "../../../api/client.js";
import OrderCard from "../components/OrderCard.jsx";
import Pagination from "../components/Pagination.jsx";
import SkeletonList from "../components/SkeletonList.jsx";

// Primary accent color: #FF7A18
const PRIMARY_COLOR = "#FF7A18";

/**
 * Orders Page
 * Displays all orders with filters and status management
 */
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);

  // Filter options
  const filters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Placed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
  ];

  const refetch = async () => {
    try {
      setLoading(true);
      const filterParams = {
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(dateFrom ? { dateFrom } : {}),
        ...(dateTo ? { dateTo } : {}),
      };
      const fetched = await ownerApi.getOrders(filterParams);
      setTotal(fetched.length);
      const start = (page - 1) * pageSize;
      const paged = fetched.slice(start, start + pageSize);
      setOrders(paged);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search, dateFrom, dateTo, page, pageSize]);

  // Real-time refresh on events
  useEffect(() => {
    const unsubscribe = ownerApi.subscribe((event) => {
      if (event.type === "new_order" || event.type === "order_status_changed") {
        refetch();
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search, dateFrom, dateTo, page, pageSize]);

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ownerApi.updateOrderStatus(orderId, newStatus);
      // Local refresh; subscribe will also handle external updates
      refetch();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track all orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
          {/* Status Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  statusFilter === opt.value
                    ? "text-white"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
                style={
                  statusFilter === opt.value ? { backgroundColor: PRIMARY_COLOR } : {}
                }
                aria-label={`Filter orders by ${opt.label}`}
                aria-pressed={statusFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order # or customer name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": PRIMARY_COLOR }}
            />
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": PRIMARY_COLOR }}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": PRIMARY_COLOR }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SkeletonList rows={6} />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mt-2">
            Adjust your filters or date range and try again
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
          <div className="pt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;

