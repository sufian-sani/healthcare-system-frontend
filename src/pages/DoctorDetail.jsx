import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/doctors/${id}/`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error("Error fetching doctor detail:", err));
  }, [id]);
  console.log("Doctor Detail:", doctor);
  
  if (!doctor) return <Layout>Loading doctor details...</Layout>;

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-3">{doctor.full_name}</h2>
        <p className="text-gray-700">Mobile: {doctor.mobile_number}</p>
        <p className="text-gray-700">Address: {doctor.address}</p>

        <div className="mt-3">
          <h3 className="text-lg font-semibold">Doctor Details</h3>
          <p>License: {doctor.doctordetail?.license_number}</p>
          <p>Experience: {doctor.doctordetail?.experience_years} years</p>
          <p>Consultation Fee: {doctor.doctordetail?.consultation_fee} BDT</p>
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-semibold">Schedules</h3>
          {doctor.schedules && doctor.schedules.length > 0 ? (
            doctor.schedules.map((s) => (
              <div
                key={s.id}
                className="border p-2 rounded mt-2 bg-blue-50 text-sm"
              >
                <p>Date: {s.date}</p>
                <p>
                  Time: {s.start_time} - {s.end_time}
                </p>
              </div>
            ))
          ) : (
            <p>No schedules available</p>
          )}
        </div>

        {/* <button className="btn btn-success w-100 mt-4">Confirm Appointment</button> */}
      </div>
    </Layout>
  );
}
