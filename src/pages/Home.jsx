import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch Doctors (All or Filtered)
  const fetchDoctors = async (spec = "", loc = "") => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users/doctors/", {
        params: {
          specialization: spec || undefined,
          location: loc || undefined,
        },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  // ✅ Load All Doctors on Page Load
  useEffect(() => {
    fetchDoctors(); // <-- Load all doctors when page loads
  }, []);

  const handleSearch = () => {
    fetchDoctors(specialization, location);
  };

  return (
    <Layout>
      <div className="text-center mb-4">
        <h2 className="h3 fw-bold text-primary mb-3">
          Welcome to the Healthcare System
        </h2>
        <p className="fs-5 text-secondary">
          Your trusted platform for booking appointments and managing schedules.
        </p>
      </div>

      {/* ✅ Search Bar */}
      <div className="d-flex justify-content-center mb-4 gap-2">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Specialization (e.g., Cardiologist)"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <input
          type="text"
          className="form-control w-25"
          placeholder="Location (e.g., Dhaka)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSpecialization("");
            setLocation("");
            fetchDoctors(); // Reset to all doctors
          }}
        >
          Reset
        </button>
      </div>

      {/* ✅ Doctor List */}
      <h3 className="h4 fw-bold text-primary mb-3 text-center">
        Available Doctors
      </h3>

      <div className="row gy-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => {
            const isIncomplete =
              !doctor.doctordetail?.license_number ||
              !doctor.doctordetail?.experience_years ||
              !doctor.doctordetail?.consultation_fee;

            return (
              <div key={doctor.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <img
                      src={
                        doctor.profile_image ||
                        "https://via.placeholder.com/150?text=No+Image"
                      }
                      alt={doctor.full_name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold">{doctor.full_name}</h5>
                    <p className="text-capitalize text-secondary">
                      Role: {doctor.role}
                    </p>
                    <p className="text-secondary">
                      Mobile: {doctor.mobile_number}
                    </p>
                    <p className="text-secondary">Address: {doctor.address}</p>
                    <p className="text-secondary">
                      Specialization: {doctor.specialization || "Not provided"}
                    </p>
                    <p className="text-secondary">
                      Location: {doctor.location || "Not provided"}
                    </p>

                    {doctor.doctordetail ? (
                      <div className="mt-3 small text-start">
                        <p>License: {doctor.doctordetail.license_number}</p>
                        <p>
                          Experience: {doctor.doctordetail.experience_years}{" "}
                          years
                        </p>
                        <p>
                          Consultation Fee:{" "}
                          {doctor.doctordetail.consultation_fee} BDT
                        </p>
                      </div>
                    ) : (
                      <p className="text-danger small mt-2">
                        Doctor details missing
                      </p>
                    )}

                    <button
                      className={`btn w-100 mt-3 ${
                        isIncomplete ? "btn-secondary" : "btn-primary"
                      }`}
                      disabled={isIncomplete}
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                    >
                      {isIncomplete
                        ? "Booking Unavailable (Incomplete Profile)"
                        : "Book Appointment"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">No doctors found.</p>
        )}
      </div>
    </Layout>
  );
}
