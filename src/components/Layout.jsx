import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 mt-auto text-gray-700">
        © {new Date().getFullYear()} Healthcare System. All rights reserved.
      </footer>
    </div>
  );
}
