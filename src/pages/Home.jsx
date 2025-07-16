import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; 

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/doctors/")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

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

      {/* Doctor List */}
      <h3 className="h4 fw-bold text-primary mb-3 text-center">
        Available Doctors
      </h3>

      <div className="row gy-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                {/* Profile Image */}
                <img
                  src={
                    doctor.profile_image
                      ? doctor.profile_image
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={doctor.full_name}
                  className="rounded-circle mb-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />

                <h5 className="fw-bold">{doctor.full_name}</h5>
                <p className="text-capitalize text-secondary">
                  Role: {doctor.role}
                </p>
                <p className="text-secondary">Mobile: {doctor.mobile_number}</p>
                <p className="text-secondary">Address: {doctor.address}</p>

                {/* Doctor Details */}
                {doctor.doctordetail ? (
                  <div className="mt-3 small text-start">
                    <p>License: {doctor.doctordetail.license_number}</p>
                    <p>
                      Experience: {doctor.doctordetail.experience_years} years
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

                {/* Schedule */}
                {doctor.schedule && doctor.schedule.length > 0 && (
                  <div className="mt-3 bg-light p-2 rounded">
                    <p className="fw-semibold text-primary">Next Available:</p>
                    <p>Date: {doctor.schedule[0].date}</p>
                    <p>
                      Time: {doctor.schedule[0].start_time} -{" "}
                      {doctor.schedule[0].end_time}
                    </p>
                  </div>
                )}

                <button 
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
