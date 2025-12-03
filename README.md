# 🌸 FemCare – AI-Powered Women’s Health & Postpartum Depression (PPD) Assessment Platform

🔗 **Live Demo:** [https://femcare-ashy.vercel.app/](https://femcare-ashy.vercel.app/)

FemCare is a smart and compassionate **AI-driven women’s health platform** designed to help users identify potential risks of **Postpartum Depression (PPD)** early. With a simple interface, intelligent chatbot support, and a powerful machine learning model running in the background, FemCare provides quick assessments, guidance, and reliable insights.

---

## 🌟 Key Features

### 🔮 **AI-Based Postpartum Depression Prediction**

* Uses a trained **XGBoost classifier** (`xgb_classifier_model_syn.pkl`)
* Predicts **risk level** (Low / Medium / High)
* Designed for screening & awareness (not medical diagnosis)

### 🤖 **Gemini-Powered Chatbot**

* Built using the **Gemini API** via Python
* Helps users ask emotional well-being questions
* Provides safe and supportive responses

### 🧠 **Smart Personal Health Assessment**

* Simple and friendly questionnaire
* Backend evaluates answers and returns **risk category**
* Provides supportive suggestions and next steps
* Triggers doctor recommendations when risk is Medium/High

### 🌐 **Doctor Recommendation System**

* Suggests relevant doctors/therapists when risk is Medium or High
* Helps users find support quickly and safely

### 🌐 **Full-Stack Real Application**

* **Frontend:** React/Node
* **Backend:** Flask (Python)
* REST APIs for prediction & chatbot responses

---

## 🧭 Frontend (React) — Key files & components

The React app is located in the `src/` directory and includes:

* `src/App.js` — Main app layout and routes
* `src/index.js` — App entry point
* `src/components/` — Reusable components:

  * `LandingPage.js`, `Chatbot.js`, `SymptomForm.js`, `ViewDoctor.js`, `SignUp.js`, `Login.js`, `Specialist.js`, `Articles.js`, `Diet.js`, `Admin.js`

---

## 📦 Deployment Notes

* **Frontend (React)** is deployed to **Vercel** at the Live Demo URL.
* **Backend (Flask)** is deployed on **Render**. Note: free or inactive Render services can be suspended when idle. To keep the backend responsive, we use an external uptime monitor (e.g. **UptimeRobot**) to periodically ping the API endpoint so the service doesn't go to sleep.

---

## 🏗 Tech Stack

* **Machine Learning:** XGBoost
* **Backend:** Flask, Python
* **Frontend:** React
* **AI Integration:** Gemini API
* **Model Serving:** Pickle-based ML model

---

## 🚀 How It Works

1. User fills out a short postpartum questionnaire.
2. Data is passed to Flask API (`synppdflask.py`).
3. ML model predicts the risk score.
4. Frontend displays results + supportive recommendations.
5. User can talk to the chatbot for more help (via `geminippd.py`).

---

## 🧪 API Overview

### **Prediction Endpoint**

`POST /predict`

* Accepts PPD questionnaire inputs
* Returns ML model prediction + probability

### **Chatbot Endpoint**

`POST /chat`

* Sends user prompt
* Returns Gemini-generated response

---

## 👩‍💻 Author

**Sakshi Acharekar**

📧 Email: [sakshiacharekar202@gmail.com](mailto:sakshiacharekar202@gmail.com)
🔗 LinkedIn: [https://linkedin.com/in/sakshi-acharekar-56707b265](https://linkedin.com/in/sakshi-acharekar-56707b265)

---
