import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './Chat.css';

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Chat = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('user join', username);

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on('celebration', (data) => {
      launchConfetti();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `${data.sender} started a celebration!`,
          sender: 'System',
          timestamp: new Date(),
          isSystemMessage: true
        }
      ]);
    });

    socket.on('users update', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    socket.on('user typing', ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping) {
          return { ...prev, [username]: true };
        } else {
          const updated = { ...prev };
          delete updated[username];
          return updated;
        }
      });
    });

    return () => {
      socket.off('chat message');
      socket.off('celebration');
      socket.off('users update');
      socket.off('user typing');
    };
  }, [socket, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (message === '/celebrate') {
      socket.emit('celebrate');
    } else {
      socket.emit('chat message', message);
    }
    
    setMessage('');
    handleTypingStop();
  };

  const handleTypingStart = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(handleTypingStop, 2000);
  };

  const handleTypingStop = () => {
    setIsTyping(false);
    socket.emit('typing', false);
    clearTimeout(typingTimeoutRef.current);
  };

  const launchConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
      confettiContainer.remove();
    }, 6000);
  };

  const renderTypingIndicator = () => {
    const typingUsernames = Object.keys(typingUsers);
    if (typingUsernames.length === 0) return null;
    
    if (typingUsernames.length === 1) {
      return <div className="typing-indicator">{typingUsernames[0]} is typing...</div>;
    } else if (typingUsernames.length === 2) {
      return <div className="typing-indicator">{typingUsernames.join(' and ')} are typing...</div>;
    } else {
      return <div className="typing-indicator">Several people are typing...</div>;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Online Users ({users.length})</h3>
        <ul className="users-list">
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <span className="user-name">{user.username}</span>
              <span className="user-status">online</span>
            </li>
          ))}
        </ul>
        <div className="chat-help">
          <h4>Commands:</h4>
          <p>/celebrate - Launch a celebration</p>
        </div>
      </div>
      
      <div className="chat-main">
        <div className="messages-container">
          <ul className="messages-list">
            {messages.length === 0 ? (
              <li className="system-message">
                <div className="message-content">
                  <p>Welcome to the chat! Start by sending a message.</p>
                </div>
              </li>
            ) : (
              messages.map((msg, index) => {
                const isOwnMessage = msg.sender === username;
                const messageClass = msg.isSystemMessage
                  ? 'system-message'
                  : isOwnMessage
                    ? 'own-message'
                    : 'other-message';

                return (
                  <li key={index} className={`message-item ${messageClass}`}>
                    {!msg.isSystemMessage && (
                      <div className="message-sender">
                        {isOwnMessage ? 'You' : msg.sender}
                      </div>
                    )}
                    <div className="message-content">
                      <p>{msg.text}</p>
                      <span className="message-timestamp">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          <div ref={messagesEndRef} />
        </div>
        
        {renderTypingIndicator()}
        
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTypingStart();
            }}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;