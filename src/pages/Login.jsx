import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        mobile_number: mobileNumber,
        password: password,
      });

      // Save token and role in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      res.data.role === "doctor"
        ? navigate("/doctor/dashboard")
        : navigate("/");
    } catch (err) {
      alert("Invalid credentials or server error");
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "360px" }}>
        <h2 className="h4 fw-bold text-center mb-3">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Mobile Number"
            className="form-control mb-2"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center small mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary text-decoration-underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
