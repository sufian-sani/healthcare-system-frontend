export default function PatientAppointments({ bookedAppointments }) {
  return (
    <>
      <hr />
      <h5 className="h6">My Booked Appointments</h5>
      {bookedAppointments && bookedAppointments.length > 0 ? (
        <div className="list-group text-start">
          {bookedAppointments.map((appt) => (
            <div key={appt.id} className="list-group-item mb-2">
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.appointment_time}</p>
              <span className={`badge ${
                appt.status === "pending" ? "bg-warning text-dark" : "bg-success"
              }`}>
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No appointments booked yet.</p>
      )}
    </>
  );
}
