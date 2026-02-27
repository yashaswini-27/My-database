import { useNavigate } from "react-router-dom";
import "./UserMode.css";

function UserMode() {
  const navigate = useNavigate();

  return (
    <div className="user-container">
      <div className="user-card">
        <h2>User Mode</h2>
        <p className="subtitle">
          Access your account or create a new one
        </p>

        <div className="btn-group">
          <button
            className="user-btn signin"
            onClick={() => navigate("/user-login")}
          >
            Sign In
          </button>

          <button
            className="user-btn signup"
            onClick={() => navigate("/user-register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMode;