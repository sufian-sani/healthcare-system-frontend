import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    address: "",
    role: "doctor", // ✅ Default doctor role
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/users/register/", formData);
      alert("Doctor registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="text-center text-primary mb-4">Register as Doctor</h2>
        <form className="card shadow p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              className="form-control"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile_number"
              className="form-control"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              className="form-control"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Doctor"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
