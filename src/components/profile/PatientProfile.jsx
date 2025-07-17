import { useState } from "react";
import axios from "axios";

export default function PatientProfile({ user, setUser }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user.full_name,
    address: user.address || "",
    profile_image: user.profile_image || "",
  });

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access");

      const body = {
        full_name: formData.full_name,
        address: formData.address,
        profile_image: formData.profile_image ? formData.profile_image : null
      };

      const res = await axios.patch(
        "http://127.0.0.1:8000/api/users/profile/",
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully!");
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating patient profile:", err.response?.data || err);
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <div className="mt-3 text-start">
      <h5 className="h6">Update Profile</h5>

      {!editMode ? (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      ) : (
        <>
          <input
            type="text"
            className="form-control mb-2"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Profile Image URL (Optional)"
            value={formData.profile_image}
            onChange={(e) =>
              setFormData({ ...formData, profile_image: e.target.value })
            }
          />

          <button
            className="btn btn-success btn-sm w-100 mb-2"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="btn btn-secondary btn-sm w-100"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
