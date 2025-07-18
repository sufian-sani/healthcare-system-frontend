import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar />

      {localStorage.getItem("role") === "admin" && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
        </li>
      )}

      {/* Main Content */}
      <main className="nav-link">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto text-muted">
        © {new Date().getFullYear()} Healthcare System. All rights reserved.
      </footer>
    </div>
  );
}
