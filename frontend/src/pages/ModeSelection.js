import { useNavigate } from "react-router-dom";

function ModeSelection() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "150px" }}>
      <h1>Lost & Found Portal</h1>
      <h3>Select Mode</h3>

      <button
        style={{ padding: "10px 20px", margin: "20px" }}
        onClick={() => navigate("/admin-login")}
      >
        Admin Mode
      </button>

      <button
  style={{ padding: "10px 20px", margin: "20px" }}
  onClick={() => navigate("/user-mode")}
>
  User Mode
</button>
    </div>
  );
}

export default ModeSelection;