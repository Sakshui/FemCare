import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Specialist.css";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const alertShown = useRef(false); // 👈 Prevents double alert

  // Fetch doctors (Runs once)
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const allDoctors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSpecialists(allDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctor data.");
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  // Get user location (Runs once)
  useEffect(() => {
    if (!alertShown.current) {
      alertShown.current = true; // 👈 Prevents double alert

      if (window.confirm("This app needs your location to find nearby specialists. Allow access?")) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (err) => {
            console.error("Error getting location:", err);
            setError("Location access denied. Showing all doctors.");
          }
        );
      } else {
        setError("Location access denied. Showing all doctors.");
      }
    }
  }, []);

  // Filter nearby doctors after location is obtained
  useEffect(() => {
    if (!userLocation || specialists.length === 0) return;

    const nearbyDoctors = specialists.filter((doctor) => {
      const docLat = parseFloat(doctor.latitude);
      const docLon = parseFloat(doctor.longitude);
      if (isNaN(docLat) || isNaN(docLon)) return false;

      const distance = calculateDistance(userLocation.latitude, userLocation.longitude, docLat, docLon);
      return distance <= 25;
    });

    nearbyDoctors.sort((a, b) => {
      const distA = calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(a.latitude), parseFloat(a.longitude));
      const distB = calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(b.latitude), parseFloat(b.longitude));
      return distA - distB;
    });

    setFilteredSpecialists(nearbyDoctors);
  }, [userLocation, specialists]);

  return (
    <div className="specialist-container">
      <h2>Find a Specialist Near You</h2>

      {loading && <p>Loading specialists...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredSpecialists.length === 0 && <p>No doctors found nearby.</p>}

      {!loading && !error && filteredSpecialists.length > 0 && (
        <ul className="specialist-list">
          {filteredSpecialists.map((specialist) => (
            <li key={specialist.id} className="specialist-card">
              <div className="button-container">
                <a href={specialist.map_location} target="_blank" rel="noopener noreferrer" className="visit-link">
                  View on Map
                </a>
                {typeof specialist.doctor_website === "string" && specialist.doctor_website.trim() !== "" && specialist.doctor_website.trim() !== "N/A" &&(
                  <a href={specialist.doctor_website} target="_blank" rel="noopener noreferrer" className="visit-link">
                    Visit Website
                  </a>
                )}
              </div>
              <div className="details">
                <h3>{specialist.name}</h3>
                <p><strong>Category:</strong> {specialist.category}</p>
                <p><strong>Address:</strong> {specialist.address}, {specialist.city}, {specialist.state}</p>
                <p><strong>Ratings:</strong> {specialist.ratings || "N/A"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Specialist;
