import React from "react";

export default function AppointmentsList({ appointments, onStatusChange }) {
  if (!appointments || appointments.length === 0) {
    return <p className="text-muted">No appointments found.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title">All Appointments</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.id}</td>
                  <td>{appt.patient_name}</td>
                  <td>{appt.doctor_name}</td>
                  <td>{appt.date}</td>
                  <td>{appt.appointment_time}</td>
                  <td>
                    <span
                      className={`badge ${
                        appt.status === "pending"
                          ? "bg-warning text-dark"
                          : appt.status === "confirmed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={appt.status}
                      onChange={(e) => onStatusChange(appt.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
