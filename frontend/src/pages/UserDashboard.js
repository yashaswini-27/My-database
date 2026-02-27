import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../user.css";

function UserDashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [claimData, setClaimData] = useState({
    name: "",
    usn: "",
    message: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  const openForm = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const submitClaim = async () => {
    if (!claimData.name || !claimData.usn || !claimData.message) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/claims", {
        itemId: selectedItem._id,
        name: claimData.name,
        usn: claimData.usn,
        message: claimData.message,
      });

      alert("Request Submitted Successfully");
      setShowForm(false);
      setClaimData({ name: "", usn: "", message: "" });
    } catch {
      alert("Submission Failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="user-container">

      <div className="user-header">
        <h2>User Dashboard</h2>

        <div className="user-actions">
          <button
            className="btn-report"
            onClick={() => navigate("/report-item")}
          >
            Report Item
          </button>

          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {filteredItems.map((item) => (
        <div key={item._id} className="item-card-user">

          {item.image && (
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt="item"
              style={{ width: "180px", borderRadius: "8px" }}
            />
          )}

          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <p><b>Type:</b> {item.type}</p>
          <p><b>Location:</b> {item.location}</p>

          <button
            className="btn-claim"
            onClick={() => openForm(item)}
          >
            Raise Request
          </button>
        </div>
      ))}

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Raise Request</h3>

            <input
              placeholder="Your Name"
              value={claimData.name}
              onChange={(e) =>
                setClaimData({ ...claimData, name: e.target.value })
              }
            />

            <input
              placeholder="USN"
              value={claimData.usn}
              onChange={(e) =>
                setClaimData({ ...claimData, usn: e.target.value })
              }
            />

            <textarea
              placeholder="Explain why this belongs to you"
              value={claimData.message}
              onChange={(e) =>
                setClaimData({ ...claimData, message: e.target.value })
              }
            />

            <button onClick={submitClaim}>Submit</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserDashboard;