import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/user-dashboard");
    } catch {
      alert("Login Failed");
    }
  };
  <NavigationButtons backPath="/user-register" nextPath="/user-dashboard" />

  return (
    <div className="container">
      <div className="card">
        <h2>User Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit}>Login</button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/user-register")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default UserLogin;