import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [pendingItems, setPendingItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchPending();
    fetchClaims();
    fetchStats();
  }, []);

  const fetchPending = async () => {
    const res = await API.get("/items/pending");
    setPendingItems(res.data);
  };

  const fetchClaims = async () => {
    const res = await API.get("/claims");
    setClaims(res.data);
  };

  const fetchStats = async () => {
    const res = await API.get("/items/stats/overview");
    setStats(res.data);
  };

  const approveItem = async (id) => {
    await API.put(`/items/approve/${id}`);
    fetchPending();
    fetchStats();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchPending();
    fetchStats();
  };

  const approveClaim = async (id) => {
    await API.put(`/claims/approve/${id}`);
    fetchClaims();
    fetchStats();
  };

  const rejectClaim = async (id) => {
    await API.put(`/claims/reject/${id}`);
    fetchClaims();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Dashboard Overview</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Items</h4>
            <p>{stats.totalItems || 0}</p>
          </div>

          <div className="stat-card">
            <h4>Pending Items</h4>
            <p>{stats.pendingItems || 0}</p>
          </div>

          <div className="stat-card">
            <h4>Total Claims</h4>
            <p>{stats.totalClaims || 0}</p>
          </div>

          <div className="stat-card">
            <h4>Total Users</h4>
            <p>{stats.totalUsers || 0}</p>
          </div>
        </div>

        <h3>Pending Items</h3>

        {pendingItems.map((item) => (
          <div key={item._id} className="item-card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p><b>Type:</b> {item.type}</p>
            <p><b>Location:</b> {item.location}</p>

            <button
              className="btn btn-approve"
              onClick={() => approveItem(item._id)}
            >
              Approve
            </button>

            <button
              className="btn btn-delete"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}

        <h3>Claims</h3>

        {claims.map((claim) => (
          <div key={claim._id} className="item-card">
            <p><b>Item:</b> {claim.itemId?.title}</p>
            <p><b>User:</b> {claim.userId?.name}</p>
            <p><b>Status:</b> {claim.status}</p>

            {claim.status === "pending" && (
              <>
                <button
                  className="btn btn-approve"
                  onClick={() => approveClaim(claim._id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-delete"
                  onClick={() => rejectClaim(claim._id)}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;