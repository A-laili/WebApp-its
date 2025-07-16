import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSave } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { auth, db } from "../firebase"; // Ensure these are correctly imported
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const Settings = () => {
  const user = auth.currentUser;

  // Setting up the form fields and states
  const [username, setUsername] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (newPassword && newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      // Update username (if it has changed)
      if (username !== user.displayName) {
        await updateProfile(user, { displayName: username });
      }

      // Update email
      if (email !== user.email) {
        await user.updateEmail(email);
      }

      // Update password if provided
      if (newPassword) {
        await user.updatePassword(newPassword);
      }

      // Update user data in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        fullName: username,
        email: email,
        updatedAt: new Date(),
      });

      setSuccess("Settings updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-6 lg:p-8">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Settings</h1>

          {/* Error and Success Alerts */}
          {error && (
            <p className="text-red-600 mb-4 p-4 border border-red-600 rounded bg-red-50">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 mb-4 p-4 border border-green-600 rounded bg-green-50">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <FaUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">New Password</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded p-2">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${loading ? "opacity-50" : "hover:bg-blue-700"} transition`}
            >
              {loading ? "Saving..." : <><FaSave className="mr-2" /> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
