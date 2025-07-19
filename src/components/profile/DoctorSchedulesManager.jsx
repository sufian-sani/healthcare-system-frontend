import { useEffect, useState } from "react";
import axios from "axios";
import AddScheduleForm from "./AddScheduleForm"; // ✅ Import new component

export default function DoctorSchedulesManager() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
              <p>
                <strong>Date:</strong> {sch.date}
              </p>
              <p>
                <strong>Time:</strong> {sch.start_time} - {sch.end_time}
              </p>
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

      {/* ✅ Add New Schedule Section */}
      <AddScheduleForm
        onScheduleAdded={(newSchedule) =>
          setSchedules((prev) => [...prev, newSchedule])
        }
      />
    </div>
  );
}
