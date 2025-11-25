import React, { useState } from "react";
import { db, auth } from "./firebase"; // Import auth for logout
import { signOut } from "firebase/auth"; // Import signOut function
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("addDoctor");
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    map_location: "",
    doctor_website: "",
  });

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const extractLatLong = (mapLink) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = mapLink.match(regex);

    if (match) {
      return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
    }

    return { latitude: null, longitude: null };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude } = extractLatLong(doctorData.map_location);

    if (!latitude || !longitude) {
      alert("Invalid Google Maps link. Please enter a valid URL.");
      return;
    }

    try {
      await addDoc(collection(db, "doctors"), {
        name: doctorData.name,
        category: doctorData.category,
        address: doctorData.address,
        city: doctorData.city,
        state: doctorData.state,
        map_location: doctorData.map_location,
        doctor_website: doctorData.doctor_website || "N/A",
        latitude,
        longitude,
        ratings: "N/A", // Default rating, calculated later from user reviews
      });

      alert("Doctor added successfully!");
      setDoctorData({
        name: "",
        category: "",
        address: "",
        city: "",
        state: "",
        map_location: "",
        doctor_website: "",
      });
    } catch (err) {
      console.error("Error adding doctor:", err);
      alert("Failed to add doctor.");
    }
  };

  // Logout Function
const handleLogout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    alert("Logged out successfully!");

    // Clear any session data or cached user data
    sessionStorage.clear();  // This clears session storage
    localStorage.removeItem("user");  // Remove any persisted user data if used

    // Redirect user to the landing page and ensure they cannot go back
    navigate("/", { replace: true });  // Using 'replace' to remove the current page from history
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
    <div className="doctor-panel-container">
      <div className="admin-header">
        <h1 className="doctor-panel-title">Admin Dashboard</h1>
        <button className="exit-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="doctor-panel-buttons">
        <button className={activeTab === "addDoctor" ? "active" : ""} onClick={() => setActiveTab("addDoctor")}>
          Add Doctor
        </button>
        <button className={activeTab === "viewDoctors" ? "active" : ""} onClick={() => navigate("/viewdoctor")}>
          View Doctors
        </button>
      </div>

      {activeTab === "addDoctor" && (
        <div className="doctor-form-wrapper">
          <h2>Add Doctor</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="name" placeholder="Doctor's Name/Clinic Name" value={doctorData.name} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category (Psychiatrist/Psychotherapist/Mental Health Service)" value={doctorData.category} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={doctorData.address} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={doctorData.city} onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" value={doctorData.state} onChange={handleChange} required />
            <input type="text" name="map_location" placeholder="Google Map Location Link" value={doctorData.map_location} onChange={handleChange} required />
            <input type="text" name="doctor_website" placeholder="Doctor's Website (Optional)" value={doctorData.doctor_website} onChange={handleChange} />
            <button type="submit" className="doctor-submit-btn">Add Doctor</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;
