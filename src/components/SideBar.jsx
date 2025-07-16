import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust based on your firebase.js file

const handleLogout = async () => {
  try {
    await signOut(auth);
    // Redirect to login page after logging out
    window.location.href = "/login"; // Or use navigate("/login") with useNavigate hook if you're using it
  } catch (error) {
    console.error("Logout error:", error);
  }
};

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/home" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded">
            <FaHome size={20} /> Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded">
            <FaUser size={20} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded">
            <FaCog size={20} /> Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded">
            <FaSignOutAlt size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
