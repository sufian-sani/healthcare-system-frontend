import { useState } from "react";
import DoctorDetails from "./DoctorDetails";
import DoctorSchedules from "./DoctorSchedules";
import BookedAppointments from "./BookedAppointments";
import axios from "axios";

export default function DoctorProfile({ user, setUser }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Combined Save (Profile + Schedules)
  const handleSaveProfile = async (updatedProfile) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access");

      const res = await axios.patch(
        "http://127.0.0.1:8000/api/users/profile/",
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully!");
      setUser(res.data); // ✅ Replace with fresh updated data
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <>
      <DoctorDetails
        user={user}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      <BookedAppointments
        alreadyBooked={user.already_booked}
        setUser={setUser}
      />

      <DoctorSchedules
        schedules={user.schedules}
        editMode={editMode}
        setUser={setUser}
      />

      {editMode && (
        <button
          className="btn btn-success w-100 mt-3"
          disabled={saving}
          onClick={() =>
            handleSaveProfile({
              full_name: user.full_name,
              address: user.address,
              doctordetail: user.doctordetail,
              schedules: user.schedules,
            })
          }
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}

      {!editMode && (
        <button
          className="btn btn-warning w-100 mt-3"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}
    </>
  );
}
