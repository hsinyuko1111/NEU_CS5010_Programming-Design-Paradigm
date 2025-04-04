import { useState, useEffect } from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  // Check if username is stored in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('chatUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('chatUsername', username);
      setIsJoined(true);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Socket.IO Chat</h1>
      </header>

      {!isJoined ? (
        <div className="join-form-container">
          <form onSubmit={handleJoinChat} className="join-form">
            <h2>Join the Chat</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
            <button type="submit">Join</button>
          </form>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;