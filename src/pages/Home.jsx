import React from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";
import { FaTrafficLight, FaUsers, FaCogs } from "react-icons/fa"; // Icons for each section

const Home = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 min-h-screen flex flex-col ml-64"> {/* Added ml-64 to push the content to the right of the sidebar */}
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 p-8 space-y-8 overflow-auto">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Here you can manage your traffic data, user settings, and more. Stay on top of the most recent updates and actions.
          </p>

          {/* Additional Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <FaTrafficLight size={24} className="text-blue-600" />
                <span className="text-sm text-gray-400">Traffic Updates</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Traffic Overview</h2>
              <p className="text-gray-600">See the latest traffic updates and reports.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <FaUsers size={24} className="text-green-600" />
                <span className="text-sm text-gray-400">User Management</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">User Management</h2>
              <p className="text-gray-600">Manage registered users, their data, and status.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <FaCogs size={24} className="text-purple-600" />
                <span className="text-sm text-gray-400">System Settings</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings</h2>
              <p className="text-gray-600">Adjust your preferences and system settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
