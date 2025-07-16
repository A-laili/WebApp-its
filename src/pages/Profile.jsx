// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Assuming you've initialized Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Sidebar from "../components/SideBar";
import Navbar from "../components/NavBar";

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    birthdate: "",
    photoURL: "",
  });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthdate, setNewBirthdate] = useState("");

  // Fetch user data from Firestore when the component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  // Handle save profile changes
  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (user) {
      // Update Firestore data
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        fullName: newName || userData.fullName,
        email: newEmail || userData.email,
        birthdate: newBirthdate || userData.birthdate,
      });

      // Update Firebase Authentication profile
      await updateProfile(user, {
        displayName: newName || userData.fullName,
        email: newEmail || userData.email,
      });

      setEditing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />
        
        {/* Profile Content */}
        <div className="p-8 max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Profile</h1>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Profile Details</h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 font-medium">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={newName || userData.fullName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{userData.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 font-medium">Email</label>
                {editing ? (
                  <input
                    type="email"
                    value={newEmail || userData.email}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{userData.email}</p>
                )}
              </div>

              {/* Birthdate */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 font-medium">Birthdate</label>
                {editing ? (
                  <input
                    type="date"
                    value={newBirthdate || userData.birthdate}
                    onChange={(e) => setNewBirthdate(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{userData.birthdate}</p>
                )}
              </div>

              {/* Save Button */}
              {editing && (
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold mt-4 transition duration-200 hover:bg-green-600"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Password Change Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Change Password</h2>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold mt-2 transition duration-200 hover:bg-red-700"
              onClick={() => alert("Password change functionality goes here")}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
