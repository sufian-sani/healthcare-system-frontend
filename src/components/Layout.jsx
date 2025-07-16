import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow-1 container py-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto text-muted">
        © {new Date().getFullYear()} Healthcare System. All rights reserved.
      </footer>
    </div>
  );
}
