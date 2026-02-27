import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./UserRegister.css";
import NavigationButtons from "../components/NavigationButtons";

function UserRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    // Basic validation
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert("Registration Successful");
      navigate("/user-login");

    } catch (err) {
      console.log("Registration Error:", err.response?.data);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="user-register-container">
      <div className="user-register-box">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button onClick={submit}>Register</button>

        {/* Navigation Buttons */}
        <NavigationButtons backPath="/" nextPath="/user-login" />
      </div>
    </div>
  );
}

export default UserRegister;