import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            setLoggedInUser(userDoc.data().fullName);
          } else {
            setLoggedInUser(user.email); // Fallback to email
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setLoggedInUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // If page was restored from the back-forward cache, reload the page
        window.location.reload();
      }
    };
  
    window.addEventListener("pageshow", handlePageShow);
  
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");

      // Clear sessionStorage to remove session-related data
      sessionStorage.clear();  // Clear session data
      localStorage.removeItem("user"); // If any localStorage data is being used

      // Redirect user to the landing page and prevent them from going back
      navigate("/", { replace: true }); // Using 'replace' to replace the current page in history
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle user login redirection
  useEffect(() => {
    if (loggedInUser) {
      // Prevent back navigation by replacing the current page in the browser history
      navigate("/", { replace: true });
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="landing-page">
      <header className="main-header">
        <div className="logo">
          <h1>FemCare</h1>
        </div>
        <nav>
          <ul>
            {loading ? (
              <li>Loading...</li>
            ) : loggedInUser ? (
              <>
                <li>Welcome, {loggedInUser}!</li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <section className="support-intro">
        <h1>Welcome to Your Journey of Postpartum Wellness!</h1>
        <p>Your mental health matters. We’re here to help you navigate postpartum depression.</p>
      </section>

      <section className="welcoming-images">
        <img
          src="https://img.freepik.com/premium-vector/vector-illustration-happy-mother-holding-her-child_844724-1067.jpg"
          alt="Mother holding her child"
          className="welcoming-image"
        />
        <img
          src="https://i.pinimg.com/736x/cb/fc/04/cbfc04fcb82a648667da617129fdf2d0.jpg"
          alt="Happy mother with her newborn"
          className="welcoming-image"
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/518/144/original/vector-happy-parents-cute-cartoon-concept-illustration-of-a-couple-holding-newborn-baby-healthcare-parenting-medicine.jpg"
          alt="Caring mother with baby"
          className="welcoming-image"
        />
      </section>

      <div className="content-columns">
        <section className="assessment-section">
          <h2>Assessment</h2>
          <p>Complete our questionnaire to assess your symptoms and understand your mental health better.</p>
          <button onClick={() => (window.location.href = "/SymptomForm")}>
            Take the Assessment
          </button>
        </section>

        <section className="articles-section">
          <h2>Informational Articles</h2>
          <p>
            Explore a range of articles on postpartum depression and personal stories to help you on your journey.
          </p>
          <button onClick={() => (window.location.href = "/articles")}>
            Read Articles
          </button>
        </section>

        <section className="diet-section">
          <h2>Diet and Exercise</h2>
          <p>Diet and Exercise to heal from Postpartum Depression. Stay Healthy and Happy!</p>
          <button onClick={() => (window.location.href = "/diet")}>Explore</button>
        </section>
      </div>

      <Chatbot />
    </div>
  );
}

export default LandingPage;
