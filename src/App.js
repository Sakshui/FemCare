import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SymptomForm from './components/SymptomForm';
import Chatbot from "./components/Chatbot";
import Specialist from './components/Specialist';
import Articles from './components/Articles';
import Diet from './components/Diet';
import Admin from './components/Admin';
import ViewDoctor from './components/ViewDoctor';


function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewDoctor" element={<ViewDoctor />} />
        <Route path="/SymptomForm" element={<SymptomForm />} />
        <Route path="/Specialist" element={<Specialist />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
