import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState({ id: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ id: "", name: "" });
  const [selectedThana, setSelectedThana] = useState({ id: "", name: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch all divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      const res = await fetch("https://bdapi.vercel.app/api/v.1/division");
      const data = await res.json();
      setDivisions(data.data);
    };
    fetchDivisions();
  }, []);

  // ✅ Fetch districts based on selected division
  useEffect(() => {
    if (!selectedDivision.id) return;
    const fetchDistricts = async () => {
      const res = await fetch(
        `https://bdapi.vercel.app/api/v.1/district/${selectedDivision.id}`
      );
      const data = await res.json();
      setDistricts(data.data);
      setThanas([]);
      setSelectedDistrict({ id: "", name: "" });
      setSelectedThana({ id: "", name: "" });
    };
    fetchDistricts();
  }, [selectedDivision.id]);

  // ✅ Fetch upazilas (Thanas) based on selected district
  useEffect(() => {
    if (!selectedDistrict.id) return;
    const fetchThanas = async () => {
      const res = await fetch(
        `https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict.id}`
      );
      const data = await res.json();
      setThanas(data.data);
      setSelectedThana({ id: "", name: "" });
    };
    fetchThanas();
  }, [selectedDistrict.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { full_name, email, mobile_number, password, confirm_password } =
      formData;

    if (
      !full_name ||
      !email ||
      !mobile_number ||
      !password ||
      !confirm_password ||
      !selectedDivision.name ||
      !selectedDistrict.name ||
      !selectedThana.name
    ) {
      alert("All fields are required!");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    const mobilePattern = /^\+8801[3-9]\d{8}$/;
    if (!mobilePattern.test(mobile_number)) {
      alert(
        "Please enter a valid Bangladeshi mobile number (e.g., +8801710000000)"
      );
      return false;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return false;
    }

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

      // ✅ Merge Address as Names
      const fullAddress = `${selectedDivision.name}, ${selectedDistrict.name}, ${selectedThana.name}`;

      await axios.post("http://127.0.0.1:8000/api/users/register/", {
        full_name: formData.full_name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        address: fullAddress,
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
      <div
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: "400px" }}
      >
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

          {/* ✅ Division Dropdown */}
          <select
            className="form-control mb-2"
            value={selectedDivision.id}
            onChange={(e) => {
              const selected = divisions.find((d) => d.id === e.target.value);
              setSelectedDivision({ id: selected.id, name: selected.name });
            }}
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>

          {/* ✅ District Dropdown */}
          <select
            className="form-control mb-2"
            value={selectedDistrict.id}
            onChange={(e) => {
              const selected = districts.find((d) => d.id === e.target.value);
              setSelectedDistrict({ id: selected.id, name: selected.name });
            }}
            disabled={!selectedDivision.id}
          >
            <option value="">Select District</option>
            {districts.map((dis) => (
              <option key={dis.id} value={dis.id}>
                {dis.name}
              </option>
            ))}
          </select>

          {/* ✅ Thana (Upazila) Dropdown */}
          <select
            className="form-control mb-2"
            value={selectedThana.id}
            onChange={(e) => {
              const selected = thanas.find((t) => t.id === e.target.value);
              setSelectedThana({ id: selected.id, name: selected.name });
            }}
            disabled={!selectedDistrict.id}
          >
            <option value="">Select Thana / Upazila</option>
            {thanas.map((thana) => (
              <option key={thana.id} value={thana.id}>
                {thana.name}
              </option>
            ))}
          </select>

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
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center small mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-success text-decoration-underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
