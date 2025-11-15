import { Routes, Route } from "react-router-dom";
import OwnerRoute from "./OwnerRoute.jsx";
import OwnerLayout from "./OwnerLayout.jsx";

// TODO: Create these page components in src/features/owner/pages/
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Notifications from "./pages/Notifications.jsx";
import Inventory from "./pages/Inventory.jsx";
import Staff from "./pages/Staff.jsx";
import Feedback from "./pages/Feedback.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Settings from "./pages/Settings.jsx";

/**
 * OwnerRoutes Component
 * Defines all routes for the owner portal
 * 
 * Route structure:
 * - /owner/login (public) - Login page
 * - /owner (protected) - Wrapped by OwnerRoute (auth guard) and OwnerLayout (sidebar/topbar)
 *   - /owner (index) -> Dashboard
 *   - /owner/dashboard -> Dashboard
 *   - /owner/orders -> Orders list
 *   - /owner/orders/:id -> Order details
 *   - /owner/notifications -> Notifications
 *   - /owner/inventory -> Inventory
 *   - /owner/staff -> Staff management
 *   - /owner/feedback -> Customer feedback
 *   - /owner/suppliers -> Suppliers
 *   - /owner/settings -> Settings
 */
const OwnerRoutes = () => {
  return (
    <Routes>
      {/* Public owner login route */}
      <Route path="login" element={<Login />} />

      {/* Protected owner routes - OwnerRoute checks auth, OwnerLayout provides UI structure */}
      <Route path="" element={<OwnerRoute />}>
        <Route element={<OwnerLayout />}>
          {/* Dashboard routes */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Orders routes */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />

          {/* Other owner pages */}
          <Route path="notifications" element={<Notifications />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default OwnerRoutes;

