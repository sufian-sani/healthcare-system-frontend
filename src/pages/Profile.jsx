import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorProfile from "../components/profile/DoctorProfile";
import PatientProfile from "../components/profile/PatientProfile";
import PatientAppointments from "../components/profile/PatientAppointments";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

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
            {/* Profile Image */}
            <img
              src={
                user.profile_image || "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />

            {/* Basic Info */}
            <h3 className="h5">{user.full_name}</h3>
            <p className="text-muted">{user.role.toUpperCase()}</p>
            <hr />
            <p><strong>Mobile:</strong> {user.mobile_number}</p>
            <p><strong>Address:</strong> {user.address || "Not provided"}</p>

            {/* ✅ Role Based Rendering */}
            {user.role === "doctor" ? (
              <DoctorProfile user={user} setUser={setUser} />
            ) : (
              <>
                <PatientProfile user={user} setUser={setUser} />
                <PatientAppointments bookedAppointments={user.booked_appointments} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
