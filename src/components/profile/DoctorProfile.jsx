import { useState } from "react";
import DoctorDetails from "./DoctorDetails";
import DoctorSchedulesManager from "./DoctorSchedulesManager"; // ✅ Separate Schedule Manager
import BookedAppointments from "./BookedAppointments";
import axios from "axios";

export default function DoctorProfile({ user, setUser }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Save Only Profile Details (NOT schedules)
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access");

      const updatedProfile = {
        full_name: user.full_name,
        address: user.address,
        doctordetail: user.doctordetail, // ✅ Only doctor details
      };

      const res = await axios.patch(
        "http://127.0.0.1:8000/api/users/profile/",
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully!");
      setUser((prev) => ({
        ...prev,
        ...res.data,
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <>
      {/* ✅ Doctor Basic Details */}
      <DoctorDetails
        user={user}
        editMode={editMode}
        setEditMode={setEditMode}
        setUser={setUser}
      />

            {/* ✅ Profile Edit Buttons */}
      {editMode ? (
        <button
          className="btn btn-success w-100 mt-3"
          disabled={saving}
          onClick={handleSaveProfile}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      ) : (
        <button
          className="btn btn-warning w-100 mt-3"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}

      {/* ✅ Booked Appointments */}
      <BookedAppointments
        alreadyBooked={user.already_booked}
        setUser={setUser}
      />

      {/* ✅ Completely Separate Schedule Manager */}
      <DoctorSchedulesManager />
    </>
  );
}
