import React, { useState } from 'react';
import './Diet.css';

function Diet() {
  const [activeTab, setActiveTab] = useState('diet'); // Default tab is 'diet'

  const dietInfo = (
    <div class="diet">
      <h2>Diet to Help Heal from Postpartum Depression</h2>
      <p>
        A healthy, balanced diet is crucial for mental health, especially during the postpartum period. Proper nutrition helps regulate hormones and boosts energy levels.
      </p>
      <ul className="diet-list">
        <li>
          <strong>Omega-3 Fatty Acids:</strong> Found in fatty fish like salmon and sardines, omega-3s are linked to better mood regulation.
          <img
            src="https://insightscreator.com/wp-content/uploads/2023/10/15QNrnOyM0euaSMOoKUiOesAG-1024x1024.jpg"
            alt="Omega-3 fatty acids - salmon and sardines"
            className="diet-image"
          />
        </li>
        <li>
          <strong>Leafy Greens:</strong> Foods like spinach, kale, and broccoli are high in folate, which can improve mood and energy levels.
          <img
            src="https://urduesl.com/wp-content/uploads/2021/08/leafy-vegetables.png"
            alt="Leafy greens - spinach, kale, broccoli"
            className="diet-image"
          />
        </li>
        <li>
          <strong>Whole Grains:</strong> Foods like oats and brown rice help stabilize blood sugar levels and reduce mood swings.
          <img
            src="https://brownfieldagnews.com/wp-content/uploads/2019/03/WholeGrainsPoster2018-whole-grains-council.jpg"
            alt="Whole grains - oats and brown rice"
            className="diet-image"
          />
        </li>
        <li>
          <strong>Lean Proteins:</strong> Chicken, turkey, and beans provide amino acids that help with serotonin production, which improves mood.
          <img
            src="https://4.bp.blogspot.com/-Z3P7bvLt82A/XN6-Jcv8yGI/AAAAAAAADmU/ng-24RnI80oRMAdqSN3F75j9NnBNlo7oACLcBGAs/s1600/High-Protein+Plan+Help+Lose+Fat.jpg"
            alt="Lean proteins - chicken, turkey, and beans"
            className="diet-image"
          />
        </li>
        <li>
          <strong>Probiotics:</strong> Yogurt and fermented foods can improve gut health, which is connected to mental health.
          <img
            src="https://ecosh.com/wp-content/uploads/sites/3/2020/05/Ecosh-20_Top_Probiotic_Foods_Foods_High_in_Probiotics.png"
            alt="Probiotics - yogurt and fermented foods"
            className="diet-image"
          />
        </li>
      </ul>
      <p>
        Maintaining a well-rounded diet can be one of the most effective ways to support mental wellness during the postpartum period.
      </p>
    </div>
  );

  const exerciseInfo = (
    <div class="diet">
      <h2>Exercise and Yoga to Help Heal from Postpartum Depression</h2>
      <p>
        Regular exercise and yoga can help reduce stress, improve mood, and increase energy levels, all of which are essential for postpartum recovery.
      </p>
      <ul className="exercise-list">
        <li>
          <strong>Yoga:</strong> Yoga can help with relaxation, reduce anxiety, and improve your overall sense of well-being.
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.z-geV5V7KqFdJdoRT4fpOAHaHa&pid=Api&P=0&h=180"
            alt="Yoga for postpartum depression"
            className="exercise-image"
          />
        </li>
        <li>
          <strong>Walking:</strong> A simple walk outside helps with circulation, mood improvement, and stress relief.
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.H8hsT7kUVBOWf6PXIk5KSAHaEK&pid=Api&P=0&h=180"
            alt="Walking exercise for postpartum"
            className="exercise-image"
          />
        </li>
        <li>
          <strong>Strength Training:</strong> Lifting weights can boost your energy levels and improve your self-esteem.
          <img
            src="https://i.pinimg.com/originals/80/c6/69/80c6692f11958fcafdea49fdd7272d24.png"
            alt="Strength training for postpartum recovery"
            className="exercise-image"
          />
        </li>
        <li>
          <strong>Stretching:</strong> Gentle stretching routines can help reduce tension in the body and mind, especially after sleepless nights.
          <img
            src="https://i.ytimg.com/vi/aJhIsYrNCVc/maxresdefault.jpg"
            alt="Stretching exercises for postpartum"
            className="exercise-image"
          />
        </li>
        <li>
          <strong>Postpartum-specific workouts:</strong> These exercises focus on strengthening the core and pelvic floor muscles, helping the body recover.
          <img
            src="https://i.pinimg.com/originals/45/53/18/4553184705c6649748283de06c160ebb.png"
            alt="Postpartum-specific workouts"
            className="exercise-image"
          />
        </li>
      </ul>
      <p>
        Exercise and yoga can be gentle yet powerful tools for healing both the mind and body during the postpartum period.
      </p>
    </div>
  );

  return (
    <div className="diet-container">
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={activeTab === 'diet' ? 'active' : ''}
          onClick={() => setActiveTab('diet')}
        >
          Diet
        </button>
        <button
          className={activeTab === 'exercise' ? 'active' : ''}
          onClick={() => setActiveTab('exercise')}
        >
          Exercise
        </button>
      </div>

      {/* Render content based on selected tab */}
      <div className="tab-content">
        {activeTab === 'diet' ? dietInfo : exerciseInfo}
      </div>
    </div>
  );
}

export default Diet;
