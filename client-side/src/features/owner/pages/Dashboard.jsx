import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ownerApi from "../../../api/client.js";
import OrderCard from "../components/OrderCard.jsx";
import Sparkline from "../components/Sparkline.jsx";
import BarChart from "../components/BarChart.jsx";

import { 
  Home, ShoppingCart, Bell, Users, Settings, LogOut, Menu, ChevronLeft, ChevronRight, MessageCircle, Truck,
  ScrollText, ShoppingBag
} from "lucide-react"; 

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

  const [ordersByHour, setOrdersByHour] = useState([]); // 12 points
  const [revenueByDay, setRevenueByDay] = useState([]); // 7 points
  const [revenueLabels, setRevenueLabels] = useState([]); // 7 labels
  const [topItems, setTopItems] = useState([]); // top 5

  // New blocks state
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [typeCounts, setTypeCounts] = useState({ delivery: 0, pickup: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [staffOnDuty, setStaffOnDuty] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);

  // Fetch orders and calculate stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allOrders, inventory, staff, feedback] = await Promise.all([
          ownerApi.getOrders(),
          ownerApi.getInventory().catch(() => []),
          ownerApi.getStaff().catch(() => []),
          ownerApi.getFeedback().catch(() => []),
        ]);

        // Calculate today's date range
        const now = new Date();
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
        const pendingOrders = allOrders.filter((o) => o.status === "pending").length;
        const revenue = ordersToday
          .filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + o.total, 0);
        setStats({ ordersToday: ordersToday.length, pendingOrders, revenue });

        // Avg Order Value (today)
        const aov = ordersToday.length ? ordersToday.reduce((s, o) => s + o.total, 0) / ordersToday.length : 0;
        setAvgOrderValue(Number(aov.toFixed(2)));

        // Orders by type (today)
        const delivery = ordersToday.filter((o) => o.orderType === "delivery").length;
        const pickup = ordersToday.filter((o) => o.orderType === "pickup").length;
        setTypeCounts({ delivery, pickup });

        // Low stock preview (top 5 low_stock/out_of_stock)
        const low = (inventory || [])
          .filter((i) => i.status === "low_stock" || i.status === "out_of_stock")
          .sort((a, b) => (a.status === "out_of_stock" ? -1 : 1))
          .slice(0, 5);
        setLowStock(low);

        // Staff on duty (rough)
        const hour = now.getHours();
        const onDuty = (staff || []).filter((s) => {
          if (s.status !== "active") return false;
          if (s.shift === "full_day" || s.shift === "flexible") return true;
          if (s.shift === "morning") return hour >= 6 && hour < 15;
          if (s.shift === "evening") return hour >= 15 && hour < 24;
          return false;
        }).length;
        setStaffOnDuty(onDuty);

        // Recent feedback (latest 5)
        const latestFeedback = (feedback || []).slice(0, 3);
        setRecentFeedback(latestFeedback);

        // Recent orders (top 3)
        const recentOrders = allOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setOrders(recentOrders);

        // Orders by hour (sparkline - 12 values)
        const byHour = Array.from({ length: 24 }, () => 0);
        ordersToday.forEach((o) => {
          const h = new Date(o.createdAt).getHours();
          byHour[h] += 1;
        });
        const last12 = [];
        for (let i = 11; i >= 0; i--) {
          const h = (now.getHours() - i + 24) % 24;
          last12.push(byHour[h]);
        }
        setOrdersByHour(last12);

        // Revenue by day (last 7 days)
        const byDay = Array.from({ length: 7 }, () => 0);
        const labels = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          d.setHours(0, 0, 0, 0);
          const next = new Date(d);
          next.setDate(d.getDate() + 1);
          const label = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
          labels.push(label);
          const dayRevenue = allOrders
            .filter((o) => {
              const t = new Date(o.createdAt);
              return t >= d && t < next && o.status === "completed";
            })
            .reduce((s, o) => s + o.total, 0);
          byDay[6 - i] = Math.round(dayRevenue);
        }
        setRevenueByDay(byDay);
        setRevenueLabels(labels);

        // Top items (by quantity)
        const itemCount = new Map();
        allOrders.slice(0, 300).forEach((o) => {
          (o.items || []).forEach((it) => {
            itemCount.set(it.name, (itemCount.get(it.name) || 0) + (it.quantity || 1));
          });
        });
        const top = Array.from(itemCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, qty]) => ({ name, qty }));
        setTopItems(top);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
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
      // Refresh data (lightweight): recent orders + stats
      const allOrders = await ownerApi.getOrders();
      const recentOrders = allOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setOrders(recentOrders);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const ordersToday = allOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today && orderDate < tomorrow;
      });

      const pendingOrders = allOrders.filter((order) => order.status === "pending").length;
      const revenue = ordersToday
        .filter((order) => order.status === "completed")
        .reduce((sum, order) => sum + order.total, 0);

      setStats({ ordersToday: ordersToday.length, pendingOrders, revenue });
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

  const renderStars = (rating) => "⭐".repeat(Math.max(0, Math.min(5, rating || 0)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your restaurant</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Orders Today</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.ordersToday}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Revenue (Today)</p>
          <p className="text-3xl font-bold mt-2" style={{ color: PRIMARY_COLOR }}>${stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* One graph per row */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-600">Orders (last 12 hours)</p>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <Sparkline data={ordersByHour} width={600} height={120} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-600">Revenue (last 7 days)</p>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <BarChart data={revenueByDay} labels={revenueLabels} height={160} color={PRIMARY_COLOR} />
          </div>
        </div>
      </div>

      {/* Additional blocks (consistent widths) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Avg Order Value (Today)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">${avgOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Order Type (Today)</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="text-xl"> <Truck size={24} color="#ff7a18" /> </span><span className="font-semibold">{typeCounts.delivery} Delivery</span></div>
            <div className="flex items-center gap-2"><span className="text-xl"> <ShoppingBag size={22} color="#ff7a18" /> </span><span className="font-semibold">{typeCounts.pickup} Pickup</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Staff On Duty (Now)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{staffOnDuty}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Low Stock</h3>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-600">All good — no low stock</p>
          ) : (
            <ul className="space-y-2">
              {lowStock.map((i) => (
                <li key={i.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-800">{i.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${i.status === "out_of_stock" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"}`}>{i.status.replace("_", " ")}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Top Items</h3>
          {topItems.length === 0 ? (
            <p className="text-sm text-gray-600">No items yet</p>
          ) : (
            <ul className="space-y-2">
              {topItems.map((it) => (
                <li key={it.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-800">{it.name}</span>
                  <span className="text-gray-600">× {it.qty}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Ratings</h3>
          {recentFeedback.length === 0 ? (
            <p className="text-sm text-gray-600">No recent feedback</p>
          ) : (
            <ul className="space-y-2">
              {recentFeedback.map((fb) => (
                <li key={fb.id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{fb.customerName}</span>
                    <span className="text-yellow-500">{renderStars(fb.rating)}</span>
                  </div>
                  {fb.comment && (
                    <p className="text-gray-600 truncate">{fb.comment}</p>
                  )}
                  <p className="text-xs text-gray-500">{new Date(fb.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 text-right">
            <Link to="/owner/feedback" className="text-blue-600 hover:underline text-sm">View all</Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          <Link to="/owner/orders" className="text-sm font-medium hover:underline" style={{ color: PRIMARY_COLOR }}>
            View All →
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500"><p>No recent orders</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

