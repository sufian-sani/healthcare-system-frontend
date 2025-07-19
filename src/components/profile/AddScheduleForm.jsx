import { useState } from "react";
import axios from "axios";

export default function AddScheduleForm({ onScheduleAdded }) {
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });
  const [saving, setSaving] = useState(false);

  const addSchedule = async () => {
    if (!newSchedule.date || !newSchedule.start_time || !newSchedule.end_time) {
      alert("Please fill all schedule fields");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("access");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/appointments/doctor/schedules/",
        newSchedule,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Schedule added successfully!");
      onScheduleAdded(res.data); // ✅ Pass the newly added schedule to parent
      setNewSchedule({ date: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("Failed to add schedule");
    }
    setSaving(false);
  };

  return (
    <div className="mt-4">
      <h6>Add New Schedule</h6>
      <input
        type="date"
        className="form-control mb-2"
        value={newSchedule.date}
        onChange={(e) =>
          setNewSchedule({ ...newSchedule, date: e.target.value })
        }
      />
      <input
        type="time"
        className="form-control mb-2"
        value={newSchedule.start_time}
        onChange={(e) =>
          setNewSchedule({ ...newSchedule, start_time: e.target.value })
        }
      />
      <input
        type="time"
        className="form-control mb-2"
        value={newSchedule.end_time}
        onChange={(e) =>
          setNewSchedule({ ...newSchedule, end_time: e.target.value })
        }
      />
      <button
        className="btn btn-primary w-100"
        onClick={addSchedule}
        disabled={saving}
      >
        {saving ? "Adding..." : "Add Schedule"}
      </button>
    </div>
  );
}
