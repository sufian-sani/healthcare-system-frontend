import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        name,
        email,
        password,
        role,
      });
      alert("Registered successfully! Please log in.");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="h4 fw-bold text-center mb-3">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="form-select mb-3"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center small mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-success text-decoration-underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
