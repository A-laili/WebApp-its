// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Welcome to the Dashboard!</h1>
          <p className="text-lg mb-4">Here you can manage your traffic data, user settings, and more.</p>

          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">Traffic Overview</h2>
              <p className="text-gray-600">See the latest traffic updates and reports.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
              <p className="text-gray-600">Manage registered users, their data, and status.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
              <p className="text-gray-600">Adjust your preferences and system settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
