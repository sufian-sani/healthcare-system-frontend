import { useState } from "react";
import axios from "axios";

export default function UsersList({ users, setUsers }) {
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  const handleStatusChange = async (userId, currentStatus) => {
    try {
      setUpdating(userId);
      const token = localStorage.getItem("access");
      await axios.patch(
        `http://127.0.0.1:8000/api/admin-panel/users/${userId}/status/`,
        { is_active: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update UI instantly
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, is_active: !currentStatus } : user
        )
      );

      alert(`User status changed to ${!currentStatus ? "Active" : "Inactive"}`);
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status");
    }
    setUpdating(null);
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h4>Users List</h4>

      {/* ✅ Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="list-group">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">{user.full_name}</h6>
                <small className="text-muted">{user.mobile_number}</small>
                <p className="mb-0">
                  <strong>Role:</strong>{" "}
                  <span
                    className={`badge ${
                      user.role === "doctor"
                        ? "bg-primary"
                        : user.role === "patient"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
              </div>

              {/* ✅ Status Toggle Button */}
              <button
                className={`btn btn-sm ${
                  user.is_active ? "btn-danger" : "btn-success"
                }`}
                onClick={() => handleStatusChange(user.id, user.is_active)}
                disabled={updating === user.id}
              >
                {updating === user.id
                  ? "Updating..."
                  : user.is_active
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted">No users found</p>
        )}
      </div>
    </div>
  );
}
