import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { full_name, email, mobile_number, address, password, confirm_password } = formData;

    if (!full_name || !email || !mobile_number || !address || !password || !confirm_password) {
      alert("All fields are required!");
      return false;
    }

    // ✅ Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    // ✅ Mobile Number Validation (Bangladesh Format Example)
    const mobilePattern = /^\+8801[3-9]\d{8}$/;
    if (!mobilePattern.test(mobile_number)) {
      alert("Please enter a valid Bangladeshi mobile number (e.g., +8801311223344)");
      return false;
    }

    // ✅ Password Strength Validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    // ✅ Confirm Password
    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/register/", {
        full_name: formData.full_name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        address: formData.address,
        password: formData.password,
      });

      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Registration failed! Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="h4 fw-bold text-center mb-3">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="form-control mb-2"
            value={formData.full_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number (e.g., +8801710000000)"
            className="form-control mb-2"
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control mb-2"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={formData.confirm_password}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center small mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-success text-decoration-underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
