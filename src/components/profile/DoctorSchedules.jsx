import { useState } from "react";

export default function DoctorSchedules({ schedules, editMode, setUser }) {
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });

  const addSchedule = () => {
    if (!newSchedule.date || !newSchedule.start_time || !newSchedule.end_time) {
      alert("Please fill all schedule fields");
      return;
    }
    setUser((prev) => ({
      ...prev,
      schedules: [...prev.schedules, { ...newSchedule }],
    }));
    setNewSchedule({ date: "", start_time: "", end_time: "" });
  };

  const removeSchedule = (index) => {
    if (!window.confirm("Are you sure to remove this schedule?")) return;
    setUser((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <hr />
      <h5 className="h6">My Schedules</h5>
      {schedules && schedules.length > 0 ? (
        <div className="list-group text-start">
          {schedules.map((sch, index) => (
            <div key={index} className="list-group-item mb-2">
              {!editMode ? (
                <>
                  <p><strong>Date:</strong> {sch.date}</p>
                  <p><strong>Time:</strong> {sch.start_time} - {sch.end_time}</p>
                </>
              ) : (
                <>
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={sch.date}
                    onChange={(e) => (sch.date = e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control mb-2"
                    value={sch.start_time}
                    onChange={(e) => (sch.start_time = e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control mb-2"
                    value={sch.end_time}
                    onChange={(e) => (sch.end_time = e.target.value)}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeSchedule(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No schedules available.</p>
      )}

      {editMode && (
        <div className="mt-3">
          <h6>Add New Schedule</h6>
          <input
            type="date"
            className="form-control mb-2"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
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
          <button className="btn btn-primary w-100" onClick={addSchedule}>
            Add Schedule
          </button>
        </div>
      )}
    </>
  );
}
