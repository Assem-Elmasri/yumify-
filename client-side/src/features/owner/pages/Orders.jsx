import { useState, useEffect } from "react";
import ownerApi from "../../../api/client.js";
import OrderCard from "../components/OrderCard.jsx";

// Primary accent color: #FF7A18
const PRIMARY_COLOR = "#FF7A18";

/**
 * Orders Page
 * Displays all orders with filters and status management
 */
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Filter options
  const filters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Placed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
  ];

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const filterParams =
          filter === "all" ? {} : { status: filter };
        const fetchedOrders = await ownerApi.getOrders(filterParams);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ownerApi.updateOrderStatus(orderId, newStatus);
      // Refresh orders list
      const filterParams =
        filter === "all" ? {} : { status: filter };
      const fetchedOrders = await ownerApi.getOrders(filterParams);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track all orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === filterOption.value
                  ? "text-white"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
              style={
                filter === filterOption.value
                  ? { backgroundColor: PRIMARY_COLOR }
                  : {}
              }
              aria-label={`Filter orders by ${filterOption.label}`}
              aria-pressed={filter === filterOption.value}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mt-2">
            {filter === "all"
              ? "You don't have any orders yet"
              : `No orders with status "${filters.find((f) => f.value === filter)?.label}"`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}

      {/* Orders Count */}
      {orders.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default Orders;

