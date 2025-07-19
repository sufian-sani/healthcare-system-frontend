import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function AdminReports() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("07");
  const [selectedYear, setSelectedYear] = useState("2025");

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) =>
    (2020 + i).toString()
  ); // ✅ 2020 to 2029

  const fetchReports = async (month = selectedMonth, year = selectedYear) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/admin-panel/reports/",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { month, year },
        }
      );
      setReport(res.data.monthly_report || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReport([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = () => {
    fetchReports(selectedMonth, selectedYear);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading reports...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-4">Monthly Admin Reports</h2>

        {/* ✅ Month & Year Picker */}
        <div className="d-flex justify-content-center mb-4 gap-2">
          <select
            className="form-select w-auto"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            className="form-select w-auto"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={handleChange}>
            Show Report
          </button>
        </div>

        {/* ✅ Monthly Report Table */}
        {report.length > 0 ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Monthly Report ({report[0].month})
              </h5>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Total Patient Visits</th>
                    <th>Total Appointments</th>
                    <th>Total Earned (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((r, index) => (
                    <tr key={index}>
                      <td>{r.doctor_name}</td>
                      <td>{r.total_patient_visits}</td>
                      <td>{r.total_appointments}</td>
                      <td>{r.total_earned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">
            No reports available for this month.
          </p>
        )}
      </div>
    </Layout>
  );
}
