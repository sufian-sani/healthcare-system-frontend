import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/doctors/") // Replace with your backend URL
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <Layout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">
          Welcome to the Healthcare System
        </h2>
        <p className="text-lg text-gray-600">
          Your trusted platform for booking appointments and managing schedules.
        </p>
      </div>

      {/* Doctor List */}
      <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Available Doctors
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition"
          >
            {/* Profile Image */}
            <img
              src={
                doctor.profile_image
                  ? doctor.profile_image
                  : "https://via.placeholder.com/150?text=No+Image"
              }
              alt={doctor.full_name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />

            <h4 className="text-lg font-bold text-gray-800 text-center">
              {doctor.full_name}
            </h4>
            <p className="text-gray-600 text-center capitalize">
              Role: {doctor.role}
            </p>
            <p className="text-gray-600 text-center">
              Mobile: {doctor.mobile_number}
            </p>
            <p className="text-gray-600 text-center">
              Address: {doctor.address}
            </p>

            {/* Doctor Details */}
            {doctor.doctordetail ? (
                <div className="mt-3 text-sm text-gray-700">
                    <p>License: {doctor.doctordetail.license_number}</p>
                    <p>Experience: {doctor.doctordetail.experience_years} years</p>
                    <p>Consultation Fee: {doctor.doctordetail.consultation_fee} BDT</p>
                </div>
            ) : (
                <p className="text-red-500 text-sm mt-2">Doctor details missing</p>
            )}
            

            {/* Schedule (show only first upcoming schedule) */}
            {doctor.schedule && doctor.schedule.length > 0 && (
              <div className="mt-3 text-sm bg-blue-50 p-2 rounded">
                <p className="font-semibold text-blue-700">Next Available:</p>
                <p>Date: {doctor.schedule[0].date}</p>
                <p>
                  Time: {doctor.schedule[0].start_time} -{" "}
                  {doctor.schedule[0].end_time}
                </p>
              </div>
            )}

            <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
