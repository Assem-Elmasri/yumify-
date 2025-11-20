import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FoodDetails from "./pages/FoodDetails";
import Register from "./pages/Regsiter";
import Login from "./pages/Login";

// Owner Portal imports
// OwnerAuthProvider wraps the entire app to provide authentication context
import { OwnerAuthProvider } from "./features/owner/context/OwnerAuthProvider.jsx";
// OwnerRoutes handles all /owner/* routes (login and protected routes)
import OwnerRoutes from "./features/owner/routes.jsx";

function App() {
  return (
    <OwnerAuthProvider>
      <Routes>
        {/* Main customer-facing app routes */}
        {/* Home page has a "Log in as Owner" button linking to /owner/login */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path=":foodid" element={<FoodDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Owner portal routes - all /owner/* routes are handled here */}
        {/* OwnerRoutes includes: /owner/login (public) and /owner/* (protected) */}
        <Route path="/owner/*" element={<OwnerRoutes />} />
      </Routes>
    </OwnerAuthProvider>
  );
}

export default App;