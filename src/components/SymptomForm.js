import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth
import "./SymptomForm.css";

function SymptomForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [responses, setResponses] = useState({});
  const [resultMessage, setResultMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const questions = [
    { question: "1. I have been able to laugh and see the funny side of things", name: "EPDS_Q1", options: { "As much as I always could": 0, "Not quite so much now": 1, "Definitely not so much now": 2, "Not at all": 3 } },
    { question: "2. I have looked forward with enjoyment to things", name: "EPDS_Q2", options: { "As much as I ever did": 0, "Rather less than I used to": 1, "Definitely less than I used to": 2, "Hardly at all": 3 } },
    { question: "3. I have blamed myself unnecessarily when things went wrong", name: "EPDS_Q3", options: { "Yes, most of the time": 3, "Yes, some of the time": 2, "Not very often": 1, "No, never": 0 } },
    { question: "4. I have been anxious or worried for no good reason", name: "EPDS_Q4", options: { "No, not at all": 0, "Hardly ever": 1, "Yes, sometimes": 2, "Yes, very often": 3 } },
    { question: "5. I have felt scared or panicky for no good reason", name: "EPDS_Q5", options: { "Yes, quite a lot": 3, "Yes, sometimes": 2, "No, not much": 1, "No, not at all": 0 } },
    { question: "6. Things have been getting to me", name: "EPDS_Q6", options: { "Yes, most of the time I haven’t been able to cope": 3, "Yes, sometimes I haven’t been coping as well as usual": 2, "No, most of the time I have coped quite well": 1, "No, I have been coping as well as ever": 0 } },
    { question: "7. I have been so unhappy that I have had difficulty sleeping", name: "EPDS_Q7", options: { "Yes, most of the time": 3, "Yes, sometimes": 2, "No, not very often": 1, "No, not at all": 0 } },
    { question: "8. I have felt sad or miserable", name: "EPDS_Q8", options: { "Yes, most of the time": 3, "Yes, quite often": 2, "Not very often": 1, "No, not at all": 0 } },
    { question: "9. I have been so unhappy that I have been crying", name: "EPDS_Q9", options: { "Yes, most of the time": 3, "Yes, quite often": 2, "Only occasionally": 1, "No, never": 0 } },
    { question: "10. The thought of harming myself has occurred to me", name: "EPDS_Q10", options: { "Yes, quite often": 3, "Sometimes": 2, "Hardly ever": 1, "Never": 0 } }
  ];

  const handleChange = (name, value) => {
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://femcare-symptoms-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const epdsQ10Value = responses["EPDS_Q10"];

      if (data.prediction === "at risk") {
        setResultMessage("⚠️ You may have symptoms of postpartum depression. Please consult a specialist.");
        setTimeout(() => navigate("/specialist"), 3000);
      } else if (data.prediction === "not at risk" && epdsQ10Value >= 2) {
        setResultMessage(
          "⚠️ Your response regarding thoughts of self-harm is concerning. Please seek support from a mental health professional or a trusted individual."
        );
        setTimeout(() => navigate("/specialist"), 3000);
      } else {
        setResultMessage("✅ You are less likely to have postpartum depression. Stay healthy and take care!");
      }

    } catch (error) {
      console.error("Error sending data:", error);
      setResultMessage("❌ An error occurred while processing your assessment. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading while authentication state is being checked
  }

  if (!user) {
    return (
      <div className="not-logged-in">
        <h2>Access Restricted</h2>
        <p>You need to be logged in to take the assessment.</p>
        <button onClick={() => navigate("/login")} className="login-button">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      {showInstructions && (
        <div className="instruction-modal">
          <div className="modal-content">
            <h2>Instructions</h2>
            <p>This test is for self-assessment only and does not replace professional diagnosis.</p>
            <p>There are no right or wrong answers.</p>
            <p>Be truthful about how you've been feeling over the past 7 days.</p>
            <p>Ensure you have a calm environment while answering.</p>
            <p>Select the answer that best describes your recent emotions and experiences.</p>
            <button className="close-button" onClick={() => setShowInstructions(false)}>Got It</button>
          </div>
        </div>
      )}

      {!showInstructions && (
        <>
          <h1>Postpartum Depression Assessment</h1>
          <p className="headline"><strong>Please answer the following questions honestly:</strong></p>
          <form onSubmit={handleSubmit} className="assessment-form">
            {questions.map((item, index) => (
              <div key={index} className="question-container">
                <p className="question">{item.question}</p>
                <div className="options">
                  {Object.entries(item.options).map(([optionText, optionValue]) => (
                    <label key={optionValue} className="option-label">
                      <input
                        type="radio"
                        name={item.name}
                        value={optionValue}
                        checked={responses[item.name] === optionValue}
                        onChange={() => handleChange(item.name, optionValue)}
                        required
                      />
                      {optionText}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="submit-button">Submit Assessment</button>
          </form>

          {resultMessage && (
            <div className="result-box">
              <h2 className="result-text">{resultMessage}</h2>
              <img 
                src="https://static.vecteezy.com/system/resources/previews/017/293/879/original/medical-team-doctors-with-white-coat-cartoon-characters-png.png" 
                alt="Medical Team"
                className="result-image"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SymptomForm;
