import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import UsersList from "../components/admin/UsersList";
import DoctorsList from "../components/admin/DoctorsList";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, doctorsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/admin-panel/users/", { headers }),
          axios.get("http://127.0.0.1:8000/api/admin-panel/doctors/", { headers }),
        ]);

        setUsers(usersRes.data);
        setDoctors(doctorsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading admin data...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <UsersList users={users} setUsers={setUsers} /> {/* ✅ New */}
        <DoctorsList doctors={doctors} setDoctors={setDoctors} />
      </div>
    </Layout>
  );
}
