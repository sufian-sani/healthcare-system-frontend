import { useState } from "react";
import axios from "axios";

export default function BookedAppointments({ alreadyBooked, setUser }) {
  const [updating, setUpdating] = useState(null);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setUpdating(appointmentId);
      const token = localStorage.getItem("access");
      await axios.patch(
        `http://127.0.0.1:8000/api/appointments/status/${appointmentId}/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser((prev) => ({
        ...prev,
        already_booked: prev.already_booked.map((appt) =>
          appt.appointment_id === appointmentId
            ? { ...appt, status: newStatus }
            : appt
        ),
      }));
    } catch (err) {
      alert("Failed to update status");
    }
    setUpdating(null);
  };

  return (
    <>
      <hr />
      <h5 className="h6">Already Booked Appointments</h5>
      {alreadyBooked && alreadyBooked.length > 0 ? (
        <div className="list-group text-start">
          {alreadyBooked.map((appt) => (
            <div key={appt.appointment_id} className="list-group-item mb-2">
              <p><strong>Patient:</strong> {appt.patient_name}</p>
              <p><strong>Time:</strong> {appt.appointment_time}</p>
              <select
                className="form-select form-select-sm"
                value={appt.status}
                disabled={updating === appt.appointment_id}
                onChange={(e) => handleStatusChange(appt.appointment_id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No appointments booked yet.</p>
      )}
    </>
  );
}
