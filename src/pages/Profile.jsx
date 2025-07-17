import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    doctordetail: {
      license_number: "",
      experience_years: "",
      consultation_fee: "",
    },
    schedules: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.role === "doctor") {
          setFormData({
            full_name: res.data.full_name,
            address: res.data.address || "",
            doctordetail: {
              license_number: res.data.doctordetail?.license_number || "",
              experience_years: res.data.doctordetail?.experience_years || "",
              consultation_fee: res.data.doctordetail?.consultation_fee || "",
            },
            schedules: res.data.schedules || [],
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  /** ✅ Update Doctor Profile */
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.patch("http://127.0.0.1:8000/api/users/profile/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setEditMode(false);

      setUser((prev) => ({
        ...prev,
        ...formData,
      }));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  /** ✅ Change Appointment Status */
  const handleStatusChange = async (appointmentId, newStatus) => {
    if (!newStatus) return;
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

      alert(`Status updated to "${newStatus}"`);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
    setUpdating(null);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index][field] = value;
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [
        ...formData.schedules,
        { date: "", start_time: "", end_time: "" },
      ],
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading profile...</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="alert alert-danger text-center">
          Failed to load profile
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <img
              src={
                user.profile_image
                  ? user.profile_image
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h3 className="h5">{user.full_name}</h3>
            <p className="text-muted">{user.role.toUpperCase()}</p>

            <hr />
            {!editMode ? (
              <>
                <p>
                  <strong>Mobile:</strong> {user.mobile_number}
                </p>
                <p>
                  <strong>Address:</strong> {user.address || "Not provided"}
                </p>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {user.role === "doctor" && (
              <>
                <hr />
                <h5 className="h6">Doctor Details</h5>
                {!editMode ? (
                  <>
                    <p>
                      <strong>License:</strong>{" "}
                      {user.doctordetail?.license_number}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {user.doctordetail?.experience_years} years
                    </p>
                    <p>
                      <strong>Consultation Fee:</strong>{" "}
                      {user.doctordetail?.consultation_fee} BDT
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="form-label">License Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.doctordetail.license_number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            doctordetail: {
                              ...formData.doctordetail,
                              license_number: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Experience (years)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.doctordetail.experience_years}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            doctordetail: {
                              ...formData.doctordetail,
                              experience_years: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Consultation Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.doctordetail.consultation_fee}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            doctordetail: {
                              ...formData.doctordetail,
                              consultation_fee: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </>
                )}

                {/* ✅ Already Booked Appointments */}
                <hr />
                <h5 className="h6">Already Booked Appointments</h5>
                {user.already_booked && user.already_booked.length > 0 ? (
                  <div className="list-group text-start">
                    {user.already_booked.map((appt) => (
                      <div
                        key={appt.appointment_id}
                        className="list-group-item list-group-item-action mb-2"
                      >
                        <p className="mb-1">
                          <strong>Patient:</strong> {appt.patient_name}
                        </p>
                        <p className="mb-1">
                          <strong>Time:</strong> {appt.appointment_time}
                        </p>
                        {appt.notes && (
                          <p className="mb-1">
                            <strong>Notes:</strong> {appt.notes}
                          </p>
                        )}
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          <select
                            className="form-select form-select-sm"
                            value={appt.status}
                            disabled={updating === appt.appointment_id}
                            onChange={(e) =>
                              handleStatusChange(
                                appt.appointment_id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No appointments booked yet.</p>
                )}

                {/* ✅ Upcoming Schedules */}
                <hr />
                <h5 className="h6">My Schedules</h5>
                {!editMode ? (
                  user.schedules.length > 0 ? (
                    <div className="list-group text-start">
                      {user.schedules.map((sch) => (
                        <div
                          key={sch.id}
                          className="list-group-item list-group-item-action mb-2"
                        >
                          <p>
                            <strong>Date:</strong> {sch.date}
                          </p>
                          <p>
                            <strong>Time:</strong> {sch.start_time} -{" "}
                            {sch.end_time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No schedules available.</p>
                  )
                ) : (
                  <>
                    {formData.schedules.map((sch, idx) => (
                      <div
                        key={idx}
                        className="border p-2 mb-2 rounded bg-light"
                      >
                        <div className="mb-1">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={sch.date}
                            onChange={(e) =>
                              handleScheduleChange(idx, "date", e.target.value)
                            }
                          />
                        </div>
                        <div className="mb-1">
                          <label className="form-label">Start Time</label>
                          <input
                            type="time"
                            className="form-control"
                            value={sch.start_time}
                            onChange={(e) =>
                              handleScheduleChange(
                                idx,
                                "start_time",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="mb-1">
                          <label className="form-label">End Time</label>
                          <input
                            type="time"
                            className="form-control"
                            value={sch.end_time}
                            onChange={(e) =>
                              handleScheduleChange(
                                idx,
                                "end_time",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={addSchedule}
                    >
                      + Add Schedule
                    </button>
                  </>
                )}

                <div className="mt-3">
                  {!editMode ? (
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      className="btn btn-success w-100"
                      onClick={handleProfileUpdate}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ✅ Patient Section (unchanged) */}
            {user.role === "patient" && (
              <>
                <hr />
                <h5 className="h6">My Booked Appointments</h5>
                {user.booked_appointments &&
                user.booked_appointments.length > 0 ? (
                  <div className="list-group text-start">
                    {user.booked_appointments.map((appt) => (
                      <div
                        key={appt.id}
                        className="list-group-item list-group-item-action mb-2"
                      >
                        <p className="mb-1">
                          <strong>Date:</strong> {appt.date}
                        </p>
                        <p className="mb-1">
                          <strong>Time:</strong> {appt.appointment_time}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          <span
                            className={`badge ${
                              appt.status === "pending"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </p>
                        {appt.notes && (
                          <p className="mb-1">
                            <strong>Notes:</strong> {appt.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No appointments booked yet.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
