import React, { useState } from "react";
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome! How can I assist you today?", sender: "chatbot" }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages);
      setUserInput('');
  
      try {
        const response = await fetch('https://femcare-chatbot.onrender.com/chatbot', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
        });
  
        console.log('Response status:', response.status);
  
        if (response.ok) {
          const data = await response.json();
          console.log('Chatbot reply:', data);  // Debugging log
  
          const botMessage = data.reply || "Sorry, I couldn't understand your request.";
          setMessages(prevMessages => [
            ...prevMessages,
            { text: botMessage, sender: "chatbot" }
          ]);
        } else {
          console.error('Error response:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    }
  };
  

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <button className="close-btn" onClick={toggleChatbot}>X</button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input 
                type="text" 
                value={userInput} 
                onChange={handleInputChange} 
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
      <button className="chatbot-icon" onClick={toggleChatbot}>
        💬
      </button>
    </div>
  );
};

export default Chatbot;
