import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"]
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// In development, the static file serving is handled by Vite
// In production, serve the built React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
  });
} else {
  // In development, still serve the original HTML for direct server access
  app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../index.html"));
  });
}

// Store connected users
const users = {};

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  
  // Handle user joining with username
  socket.on("user join", (username) => {
    users[socket.id] = {
      username: username || `User-${socket.id.substring(0, 5)}`,
      joinTime: new Date()
    };
    
    // Broadcast user joined message
    io.emit("chat message", {
      text: `${users[socket.id].username} has joined the chat`,
      sender: "System",
      timestamp: new Date(),
      isSystemMessage: true
    });
    
    // Send updated users list to all clients
    io.emit("users update", Object.values(users));
  });

  // Handle chat messages
  socket.on("chat message", (msg) => {
    // If user hasn't set a username yet, use a default
    const username = users[socket.id]?.username || `User-${socket.id.substring(0, 5)}`;
    
    io.emit("chat message", {
      text: msg,
      sender: username,
      timestamp: new Date(),
      isSystemMessage: false
    });
  });

  // Handle celebration command
  socket.on("celebrate", () => {
    io.emit("celebration", {
      sender: users[socket.id]?.username || "Someone"
    });
  });

  // Handle typing status
  socket.on("typing", (isTyping) => {
    if (!users[socket.id]) return;
    
    socket.broadcast.emit("user typing", {
      username: users[socket.id].username,
      isTyping
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      // Broadcast user left message
      io.emit("chat message", {
        text: `${username} has left the chat`,
        sender: "System",
        timestamp: new Date(),
        isSystemMessage: true
      });
      
      // Remove user from users object
      delete users[socket.id];
      
      // Send updated users list to all clients
      io.emit("users update", Object.values(users));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
