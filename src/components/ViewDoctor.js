import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ViewDoctor.css";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndFetchDoctors = async () => {
      setLoading(true);

      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert("You must be logged in!");
          navigate("/login");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists() && userDoc.data().role === "admin") {
          const doctorsSnapshot = await getDocs(collection(db, "doctors"));
          const doctorsList = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setDoctors(doctorsList);
        } else {
          alert("Access denied! You are not an admin.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchDoctors();
  }, [navigate]);

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoc(doc(db, "doctors", doctorId));
        setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
        alert("Doctor deleted successfully!");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Failed to delete doctor.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2>Doctor List</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <ul className="doctor-list">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="doctor-card">
              <div className="details">
              <div className="button-container">
                  {/* "View on Map" button (Always shown) */}
                  <a href={doctor.map_location} target="_blank" rel="noopener noreferrer" className="visit-link">
                    View on Map
                  </a>

                  {/* "Visit Website" button (Only if URL is present) */}
                  {typeof doctor.doctor_website === "string" && doctor.doctor_website.trim() !== "" && (
                    <a href={doctor.doctor_website} target="_blank" rel="noopener noreferrer" className="visit-link">
                      Visit Website
                    </a>
                  )}
                </div>
                <h3>{doctor.name}</h3>
                <p><strong>Category:</strong> {doctor.category}</p>
                <p><strong>Address:</strong> {doctor.address}, {doctor.city}, {doctor.state}</p>
                <p><strong>Ratings:</strong> {doctor.ratings || "N/A"}</p>
                <button onClick={() => handleDeleteDoctor(doctor.id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewDoctors;