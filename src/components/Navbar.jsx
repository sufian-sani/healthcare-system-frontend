import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Healthcare System</h1>
        <nav className="flex gap-3">
          <Link
            to="/"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
