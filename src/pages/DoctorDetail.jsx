import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import SchedulePopup from "../components/SchedulePopup"; // ✅ Import popup

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/doctors/${id}/`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.error("Error fetching doctor detail:", err));
  }, [id]);

  console.log(doctor);
  

  const handleBook = async (schedule, selectedSlot) => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/appointments/book/",
        {
          doctor: doctor.id,
          schedule: schedule.id,
          date: schedule.date,
          appointment_time: selectedSlot
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Appointment booked successfully at ${selectedSlot}`);
      setSelectedSchedule(null);
    } catch (err) {
      alert("Failed to book appointment");
      console.error(err);
    }
  };

  if (!doctor) return <Layout>Loading doctor details...</Layout>;

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-3">{doctor.full_name}</h2>
        <p className="text-gray-700">Mobile: {doctor.mobile_number}</p>
        <p className="text-gray-700">Address: {doctor.address}</p>

        {/* ✅ Schedule List */}
        <div className="mt-3">
          <h3 className="text-lg font-semibold">Schedules</h3>
          {doctor.schedules && doctor.schedules.length > 0 ? (
            doctor.schedules.map((s) => (
              <div
                key={s.id}
                className="border p-2 rounded mt-2 bg-blue-50 text-sm cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedSchedule(s)}
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
      </div>

      {/* ✅ Reusable Popup Component */}
      <SchedulePopup
        schedule={selectedSchedule}
        doctor={doctor}
        onClose={() => setSelectedSchedule(null)}
        onBook={handleBook}
      />
    </Layout>
  );
}
