import { useNavigate } from "react-router-dom";
import "./NavigationButtons.css";

function NavigationButtons({ backPath, nextPath }) {
  const navigate = useNavigate();

  return (
    <div className="nav-buttons">
      {backPath && (
        <button
          className="nav-btn back-btn"
          onClick={() => navigate(backPath)}
        >
          ⬅ Back
        </button>
      )}

      {nextPath && (
        <button
          className="nav-btn next-btn"
          onClick={() => navigate(nextPath)}
        >
          Next ➡
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;