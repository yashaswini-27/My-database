import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="title">Lost & Found Portal</h1>
        <p className="subtitle">
          Securely report and recover lost items with ease
        </p>

        <div className="button-group">
          <button
            className="btn btn-admin"
            onClick={() => navigate("/admin-login")}
          >
            Admin Dashboard
          </button>

          <button
            className="btn btn-user"
            onClick={() => navigate("/user-mode")}
          >
            User Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;