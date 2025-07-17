export default function DoctorDetails({ user, editMode, setEditMode }) {
  return (
    <>
      <hr />
      <h5 className="h6">Doctor Details</h5>
      {!editMode ? (
        <>
          <p><strong>License:</strong> {user.doctordetail?.license_number}</p>
          <p><strong>Experience:</strong> {user.doctordetail?.experience_years} years</p>
          <p><strong>Consultation Fee:</strong> {user.doctordetail?.consultation_fee} BDT</p>
        </>
      ) : (
        <>
          <input
            type="text"
            className="form-control mb-2"
            value={user.full_name}
            onChange={(e) => (user.full_name = e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            value={user.address || ""}
            onChange={(e) => (user.address = e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            value={user.doctordetail.license_number}
            onChange={(e) => (user.doctordetail.license_number = e.target.value)}
          />
          <input
            type="number"
            className="form-control mb-2"
            value={user.doctordetail.experience_years}
            onChange={(e) =>
              (user.doctordetail.experience_years = parseInt(e.target.value))
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            value={user.doctordetail.consultation_fee}
            onChange={(e) =>
              (user.doctordetail.consultation_fee = parseInt(e.target.value))
            }
          />
        </>
      )}
    </>
  );
}
