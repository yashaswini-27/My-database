import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 15, background: "#1f2937", color: "white" }}>
      <Link to="/" style={{ color: "white", marginRight: 15 }}>Home</Link>
      <Link to="/report" style={{ color: "white", marginRight: 15 }}>Report</Link>
      <Link to="/claims" style={{ color: "white", marginRight: 15 }}>Claims</Link>

      {token ? (
        <button onClick={logout} style={{ marginLeft: 20 }}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", marginRight: 15 }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;