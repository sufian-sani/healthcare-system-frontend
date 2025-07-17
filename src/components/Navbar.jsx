import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center px-3">
        <h1 className="h4 fw-bold mb-0">Healthcare System</h1>
        <nav className="d-flex gap-2">
          <Link to="/" className="btn btn-light text-primary">
            Home
          </Link>
          <Link to="/login" className="btn btn-light text-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-light text-primary">
            Register
          </Link>
          <Link
            to="/profile"
            className="btn btn-outline-light ms-2"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
