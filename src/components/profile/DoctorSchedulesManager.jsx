import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorSchedulesManager() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch schedules on mount
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(res.data.schedules || []);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
      setLoading(false);
    };

    fetchSchedules();
  }, []);

  // ✅ Add new schedule
  const addSchedule = async () => {
    if (!newSchedule.date || !newSchedule.start_time || !newSchedule.end_time) {
      alert("Please fill all schedule fields");
      return;
    }
    try {
      setSaving(true);
      const token = localStorage.getItem("access");
      const updatedSchedules = [...schedules, { ...newSchedule }];

      await axios.patch(
        "http://127.0.0.1:8000/api/users/profile/",
        { schedules: updatedSchedules },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSchedules(updatedSchedules);
      setNewSchedule({ date: "", start_time: "", end_time: "" });
      alert("Schedule added successfully!");
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("Failed to add schedule");
    }
    setSaving(false);
  };

  // ✅ Delete schedule
  const removeSchedule = async (index) => {
    if (!window.confirm("Are you sure to remove this schedule?")) return;

    try {
      setSaving(true);
      const token = localStorage.getItem("access");
      const updatedSchedules = schedules.filter((_, i) => i !== index);

      await axios.patch(
        "http://127.0.0.1:8000/api/users/profile/",
        { schedules: updatedSchedules },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSchedules(updatedSchedules);
      alert("Schedule removed successfully!");
    } catch (error) {
      console.error("Error removing schedule:", error);
      alert("Failed to remove schedule");
    }
    setSaving(false);
  };

  if (loading) return <p>Loading schedules...</p>;

  return (
    <div className="mt-4">
      <h5 className="h6">Manage My Schedules</h5>

      {schedules.length > 0 ? (
        <div className="list-group text-start">
          {schedules.map((sch, index) => (
            <div key={index} className="list-group-item mb-2">
              <p><strong>Date:</strong> {sch.date}</p>
              <p><strong>Time:</strong> {sch.start_time} - {sch.end_time}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeSchedule(index)}
                disabled={saving}
              >
                {saving ? "Removing..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No schedules available.</p>
      )}

      <div className="mt-3">
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
          {saving ? "Saving..." : "Add Schedule"}
        </button>
      </div>
    </div>
  );
}
