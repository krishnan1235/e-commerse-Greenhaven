import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import './styles/chatbot.css';

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]); // 👈 store conversation
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setQuery('');
    setMessages([]);
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    const userMessage = { from: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chatbot", { message: query });
      const botMessage = { from: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { from: 'bot', text: "⚠️ Could not get response from AI." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  // 🔃 Scroll to bottom on new message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="floating-chatbot-container">
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <span>🌿 Plant Assistant</span>
            <button onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.from}`}>
                {msg.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            ))}

            {loading && <div className="chat-message bot">🌱 Thinking...</div>}
          </div>

          <div className="chat-input">
            <textarea
              placeholder="Ask me about plants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleAsk}>Ask</button>
          </div>
        </div>
      ) : (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <FaCommentDots size={24} />
        </button>
      )}
    </div>
  );
}

export default FloatingChatbot;
