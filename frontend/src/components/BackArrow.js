import { useNavigate, useLocation } from "react-router-dom";
import "./BackArrow.css";

function BackArrow() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide arrow on home page
  if (location.pathname === "/") return null;

  return (
    <div className="back-arrow" onClick={() => navigate(-1)}>
      ←
    </div>
  );
}

export default BackArrow;