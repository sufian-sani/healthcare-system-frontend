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
    license_number: "",
    experience_years: "",
    consultation_fee: "",
    specialization: "",
    location: "",
    role: "doctor", // ✅ Default doctor role
  });

  const [timeslots, setTimeslots] = useState([
    { date: "", start_time: "", end_time: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeslotChange = (index, field, value) => {
    const updated = [...timeslots];
    updated[index][field] = value;
    setTimeslots(updated);
  };

  const addTimeslot = () => {
    setTimeslots([...timeslots, { date: "", start_time: "", end_time: "" }]);
  };

  const removeTimeslot = (index) => {
    setTimeslots(timeslots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        password: formData.password,
        address: formData.address,
        license_number: formData.license_number,
        experience_years: parseInt(formData.experience_years),
        consultation_fee: parseFloat(formData.consultation_fee),
        specialization: formData.specialization,
        location: formData.location,
        available_timeslots: timeslots.filter(
          (t) => t.date && t.start_time && t.end_time
        ),
        role: "doctor",
      };

      await axios.post("http://127.0.0.1:8000/api/users/register/", payload);

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
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-4">Register as Doctor</h2>
        <form className="card shadow p-4" onSubmit={handleSubmit}>
          {/* ✅ Basic Info */}
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

          {/* ✅ Doctor Details */}
          <div className="mb-3">
            <label className="form-label">License Number</label>
            <input
              type="text"
              name="license_number"
              className="form-control"
              value={formData.license_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              name="experience_years"
              className="form-control"
              value={formData.experience_years}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Consultation Fee (BDT)</label>
            <input
              type="number"
              name="consultation_fee"
              className="form-control"
              value={formData.consultation_fee}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              name="specialization"
              className="form-control"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Available Timeslots */}
          <h6 className="mt-3">Available Timeslots</h6>
          {timeslots.map((slot, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <input
                    type="date"
                    className="form-control"
                    value={slot.date}
                    onChange={(e) =>
                      handleTimeslotChange(index, "date", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="time"
                    className="form-control"
                    value={slot.start_time}
                    onChange={(e) =>
                      handleTimeslotChange(index, "start_time", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="time"
                    className="form-control"
                    value={slot.end_time}
                    onChange={(e) =>
                      handleTimeslotChange(index, "end_time", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={() => removeTimeslot(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={addTimeslot}
          >
            + Add Timeslot
          </button>

          {/* ✅ Password */}
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
