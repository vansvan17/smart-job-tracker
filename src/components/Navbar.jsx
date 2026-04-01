import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Smart Job Tracker</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link to="/applications" className="text-gray-600 hover:text-blue-600 font-medium">Applications</Link>
          <Link to="/applications/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            + Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
}