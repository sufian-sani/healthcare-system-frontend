import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // ✅ Get name from localStorage (set after login or profile fetch)
    const name = localStorage.getItem("full_name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center px-3">
        <h1 className="h4 fw-bold mb-0">Healthcare System</h1>

        <nav className="d-flex align-items-center gap-2">
          <Link to="/" className="btn btn-light text-primary">
            Home
          </Link>

          {/* ✅ Show Login/Register only if NOT logged in */}
          {!token && (
            <>
              <Link to="/login" className="btn btn-light text-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-light text-primary">
                Register
              </Link>
            </>
          )}

          {/* ✅ Show Profile & Logout if Logged in */}
          {token && (
            <>
              {/* ✅ Show User Name */}
              <span className="me-2 fw-bold">
                👋 {userName || "User"}
              </span>

              <Link to="/profile" className="btn btn-outline-light">
                Profile
              </Link>

              {/* ✅ Show Admin only if role is admin */}
              {role === "admin" && (
                <>
                  <Link to="/admin" className="btn btn-warning text-dark">
                    Admin
                  </Link>
                  <Link to="/admin/reports" className="btn btn-info">
                    Reports
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="btn btn-danger ms-2"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
