import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ModeSelection from "./pages/ModeSelection";
import UserMode from "./pages/UserMode";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ReportItem from "./pages/ReportItem";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import BackArrow from "./components/BackArrow";

function App() {
  return (
    <Router>

      {/* ✅ Global Back Arrow (Visible on all pages except "/") */}
      <BackArrow />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Mode Selection */}
        <Route path="/mode-selection" element={<ModeSelection />} />

        {/* User Flow */}
        <Route path="/user-mode" element={<UserMode />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Report Item */}
        <Route
          path="/report-item"
          element={
            <ProtectedRoute role="user">
              <ReportItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;