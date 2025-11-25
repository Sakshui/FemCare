import React from 'react';
import './Articles.css';  

function Articles() {
  return (
    <div className="articles-container">
      <h1>Informational Articles on Postpartum Depression</h1>
      <p>Postpartum depression (PPD) is a serious mental health condition that affects many new mothers after childbirth. It’s important to understand the symptoms, seek help when needed, and take steps towards healing. Here, we provide some essential insights, coping strategies, and personal stories.</p>

      <div className="article">
        <h2>What is Postpartum Depression?</h2>
        <p>
          Postpartum depression is a mental health condition that can occur in the weeks or months following childbirth. It is characterized by intense feelings of sadness, anxiety, and fatigue that can interfere with a mother's ability to care for herself and her baby. Unlike the "baby blues" that many women experience in the first few days after birth, PPD is more severe and lasts longer.
        </p>
        <img 
          src="https://www.simplypsychology.org/wp-content/uploads/postpartum-depression.jpeg" 
          alt="Mother in therapy" 
          className="article-image"
        />
      </div>

      <div className="article">
        <h2>Symptoms of Postpartum Depression</h2>
        <p>
          The symptoms of PPD can vary from person to person, but common signs include:
        </p>
        <ol>
          <li>Persistent feelings of sadness or hopelessness</li>
          <li>Severe mood swings</li>
          <li>Difficulty bonding with your baby</li>
          <li>Extreme fatigue and loss of energy</li>
          <li>Changes in appetite or sleep patterns</li>
          <li>Thoughts of harming yourself or your baby</li>
        </ol>
        <img 
          src="https://www.ucbaby.ca/wp-content/uploads/2021/05/Infographics-June-2022-Signs-Postpartum-Depression-1.png" 
          alt="Sad mother holding baby" 
          className="article-image"
        />
      </div>

      <div className="article">
        <h2>How to Heal from Postpartum Depression</h2>
        <p>
          Healing from PPD is a process that involves both mental and physical recovery. Here are some steps that can help you cope and heal:
        </p>
        <ul>
          <li><strong>Talk to a professional:</strong> Therapy, especially cognitive behavioral therapy (CBT), can be extremely helpful in dealing with PPD.</li>
          <li><strong>Lean on a support system:</strong> Surround yourself with family, friends, or support groups that understand what you’re going through.</li>
          <li><strong>Take time for self-care:</strong> Practice self-care by engaging in activities that make you feel better, such as a relaxing bath or going for a walk.</li>
          <li><strong>Medication:</strong> In some cases, antidepressants can be helpful. Always consult with your doctor before making decisions about medication.</li>
          <li><strong>Exercise regularly:</strong> Physical activity can help boost your mood and increase energy levels. Start with light exercise, such as walking or yoga.</li>
        </ul>
      </div>

      <div className="article">
        <h2>Personal Stories of Overcoming PPD</h2>
        <p>
          Many women have experienced postpartum depression and have successfully navigated their way through recovery. Here are some inspiring personal stories that may resonate with you:
        </p>
        <blockquote>
          “It took time, but I found that with therapy, support from my partner, and making self-care a priority, I began to heal. The journey wasn’t easy, but today, I feel stronger than ever.” – A Mother's Journey
        </blockquote>
        <blockquote>
          “I struggled with feelings of inadequacy, but learning that PPD is a medical condition, not a personal failure, made a huge difference. I’m proud of how far I’ve come.” – A Healing Mom
        </blockquote>
      </div>

      <div className="article">
        <h2>Getting the Right Help</h2>
        <p>
          If you or someone you know is struggling with postpartum depression, it’s essential to get help. Here are some resources you can turn to:
        </p>
        <ul>
          <li><strong>Therapists and counselors:</strong> Reach out to a mental health professional who specializes in postpartum depression.</li>
          <li><strong>Helplines:</strong> Many countries offer helplines for mental health support, including postpartum depression. Don’t hesitate to reach out.</li>
          <li><strong>Support groups:</strong> Joining a support group of women who understand what you’re going through can be a great way to find comfort and advice.</li>
        </ul>
        <img 
          src="https://www.choosingtherapy.com/wp-content/uploads/2023/04/Tips-for-Dealing-with-Postpartum-Depression-800x800.png" 
          alt="Support group therapy" 
          className="article-image"
        />
      </div>

      <button onClick={() => window.location.href = "/"}>Return to Home</button>
    </div>
  );
}

export default Articles;
