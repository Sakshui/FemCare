import React, { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role ? userData.role.toLowerCase() : "user"; // Default to "user" if role is not present
        const fullName = userData.fullName || "User";

        alert(`Welcome back, ${role === "admin" ? "Admin" : fullName}!`);
        navigate(role === "admin" ? "/admin" : "/");
      } else {
        // If no user document exists, treat as a regular user
        alert("Welcome back, User!");
        navigate("/");
      }

      setError("");
    } catch (error) {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/signup">Sign up here</a>.</p>
    </div>
  );
}

export default Login;
