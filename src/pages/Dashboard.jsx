// Dashboard.jsx
import React from "react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";
const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Welcome to the Dashboard!</h1>
          <p className="text-lg">This is the main dashboard area.</p>
          {/* Additional dashboard content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
