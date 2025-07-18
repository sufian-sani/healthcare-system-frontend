import { useState } from "react";
import axios from "axios";

export default function DoctorsList({ doctors, setDoctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    if (!selectedDoctor) return;
    try {
      setUpdating(true);
      const token = localStorage.getItem("access");
      await axios.patch(
        `http://127.0.0.1:8000/api/admin-panel/admin/doctors/${selectedDoctor.id}/status/`,
        { is_active: !selectedDoctor.is_active }, // ✅ Toggle active status
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update UI instantly
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === selectedDoctor.id
            ? { ...doc, is_active: !selectedDoctor.is_active }
            : doc
        )
      );

      alert(
        `Doctor ${selectedDoctor.full_name} is now ${
          !selectedDoctor.is_active ? "ACTIVE" : "INACTIVE"
        }`
      );
      setSelectedDoctor(null);
    } catch (err) {
      console.error("Error updating doctor status:", err);
      alert("Failed to update status");
    }
    setUpdating(false);
  };

  return (
    <div className="mt-4">
      <h4>Doctors List</h4>
      <div className="list-group">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">{doctor.full_name}</h6>
                <small className="text-muted">{doctor.mobile_number}</small>
                <p className="mb-0">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      doctor.is_active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {doctor.is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => setSelectedDoctor(doctor)}
              >
                Change Status
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted">No doctors available</p>
        )}
      </div>

      {/* ✅ Modal */}
      {selectedDoctor && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Doctor Status</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedDoctor(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to change the status of{" "}
                  <strong>{selectedDoctor.full_name}</strong>?
                </p>
                <p>
                  Current status:{" "}
                  <strong>
                    {selectedDoctor.is_active ? "Active" : "Inactive"}
                  </strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedDoctor(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleStatusUpdate}
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
