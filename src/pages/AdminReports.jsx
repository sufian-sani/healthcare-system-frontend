import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function AdminReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/admin-panel/reports/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading reports...</div>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <div className="alert alert-danger text-center">Failed to load reports</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-4">Admin Reports</h2>

        {/* ✅ Total Revenue */}
        <div className="card bg-success text-white text-center mb-4">
          <div className="card-body">
            <h4>Total Revenue</h4>
            <h2>{report.total_revenue} BDT</h2>
          </div>
        </div>

        {/* ✅ Appointments Per Doctor */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Appointments Per Doctor</h5>
            {report.appointments_per_doctor.length > 0 ? (
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Total Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {report.appointments_per_doctor.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.doctor__full_name}</td>
                      <td>{doc.total_appointments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No appointment data available.</p>
            )}
          </div>
        </div>

        {/* ✅ Booked Appointment Details */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Booked Appointment Details</h5>
            {report.booked_details.length > 0 ? (
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Notes</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.booked_details.map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.doctor__full_name}</td>
                      <td>{appt.patient__full_name}</td>
                      <td>{appt.schedule__date}</td>
                      <td>{appt.appointment_time}</td>
                      <td>{appt.notes || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            appt.status === "completed"
                              ? "bg-success"
                              : appt.status === "pending"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No booked details available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
