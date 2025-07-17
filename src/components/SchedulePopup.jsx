import { useEffect, useState } from "react";
import axios from "axios";

export default function SchedulePopup({ schedule, doctor, onClose, onBook }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!schedule || !doctor) return;

    const fetchAvailableSlots = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/appointments/${doctor.id}/available-slots/${schedule.id}/`
        );
        setAvailableSlots(res.data.available_slots);
      } catch (err) {
        console.error("Error fetching available slots:", err);
        setAvailableSlots([]);
      }
      setLoading(false);
    };

    fetchAvailableSlots();
  }, [schedule, doctor]);

  if (!schedule) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "350px" }}>
        <h3 className="h5 fw-bold mb-3">Schedule Details</h3>
        <p className="fw-semibold mb-1">{doctor.full_name}</p>
        <p className="mb-1">Date: {schedule.date}</p>
        <p className="mb-3">
          Time: {schedule.start_time} - {schedule.end_time}
        </p>

        {/* ✅ Slot Selection */}
        <div>
          <h4 className="h6 fw-semibold mb-2">Available Slots</h4>
          {loading ? (
            <p>Loading available slots...</p>
          ) : availableSlots.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`btn btn-sm ${
                    selectedSlot === slot ? "btn-success" : "btn-primary"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-danger small">No available slots</p>
          )}
        </div>

        {/* ✅ Notes Input & Confirm Button (only show after selecting a slot) */}
        {selectedSlot && (
          <div className="mt-3">
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Add notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              onClick={() => onBook(schedule, selectedSlot, notes)}
              className="btn btn-success w-100"
            >
              Confirm Appointment at {selectedSlot}
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="btn btn-secondary w-100 mt-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
