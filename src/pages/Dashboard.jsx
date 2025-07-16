// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard!</h1>

          {/* User Info */}
          {user && (
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <p className="text-lg font-medium text-gray-700">
                Logged in as: <span className="text-purple-700">{user.displayName || user.email}</span>
              </p>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold text-purple-700 mt-2">102</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold text-gray-500">Active Sessions</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">18</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold text-gray-500">System Status</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">✅ Online</p>
            </div>
          </div>

          {/* Activity Logs (Placeholder) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="text-gray-600 space-y-2">
              <li>🕒 User <b>admin@gmail.com</b> logged in</li>
              <li>📦 New account created: <b>john.doe@example.com</b></li>
              <li>🔧 Profile settings updated</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
