import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ownerApi from "../../../api/client.js";
import OrderCard from "../components/OrderCard.jsx";

// Primary accent color: #FF7A18
const PRIMARY_COLOR = "#FF7A18";

/**
 * Dashboard Page
 * Shows overview statistics and recent orders
 */
const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    ordersToday: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  // Fetch orders and calculate stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allOrders = await ownerApi.getOrders();

        // Calculate today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Filter orders from today
        const ordersToday = allOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= today && orderDate < tomorrow;
        });

        // Calculate stats
        const pendingOrders = allOrders.filter(
          (order) => order.status === "pending"
        ).length;

        // Calculate revenue from completed orders today
        const revenue = ordersToday
          .filter((order) => order.status === "completed")
          .reduce((sum, order) => sum + order.total, 0);

        setStats({
          ordersToday: ordersToday.length,
          pendingOrders,
          revenue,
        });

        // Get top 3 most recent orders
        const recentOrders = allOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setOrders(recentOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ownerApi.updateOrderStatus(orderId, newStatus);
      // Refresh data
      const allOrders = await ownerApi.getOrders();
      const recentOrders = allOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setOrders(recentOrders);

      // Recalculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const ordersToday = allOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today && orderDate < tomorrow;
      });

      const pendingOrders = allOrders.filter(
        (order) => order.status === "pending"
      ).length;

      const revenue = ordersToday
        .filter((order) => order.status === "completed")
        .reduce((sum, order) => sum + order.total, 0);

      setStats({
        ordersToday: ordersToday.length,
        pendingOrders,
        revenue,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your restaurant</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Orders Today Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.ordersToday}
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${PRIMARY_COLOR}20` }}
            >
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Orders
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.pendingOrders}
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${PRIMARY_COLOR}20` }}
            >
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p
                className="text-3xl font-bold mt-2"
                style={{ color: PRIMARY_COLOR }}
              >
                ${stats.revenue.toFixed(2)}
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${PRIMARY_COLOR}20` }}
            >
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Orders
          </h2>
          <Link
            to="/owner/orders"
            className="text-sm font-medium hover:underline"
            style={{ color: PRIMARY_COLOR }}
          >
            View All →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No recent orders</p>
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
      </div>
    </div>
  );
};

export default Dashboard;

