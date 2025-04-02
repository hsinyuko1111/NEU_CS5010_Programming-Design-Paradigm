# Socket.IO Chat Application

A real-time chat application built with Socket.IO, Express, and Node.js that allows users to send and receive messages instantly.

## Features

- Real-time messaging using Socket.IO
- Simple and lightweight design
- Instant message broadcasting to all connected users
- Connection status logging
- Special `/celebrate` command that triggers a colorful confetti animation


## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:hsinyuko1111/NEU_CS5010_Programming-Design-Paradigm.git
cd NEU_CS5010_Programming-Design-Paradigm/Homework 4
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
socketio-chat/
├── index.html        # Frontend chat interface with confetti celebration feature
├── src/
│   └── index.js      # Server-side code
├── package.json
└── README.md
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Open multiple browser windows to simulate different users chatting.

4. Type `/celebrate` in the chat to trigger a confetti animation for all users!

## How It Works

This application uses:
- **Express**: For serving the static HTML file
- **Socket.IO**: For real-time, bidirectional communication between clients and server
- **HTTP Server**: Created with Node.js to handle the socket connections

When a user connects:
1. The server logs "a user connected"
2. The user can send messages via the interface
3. Messages are broadcast to all connected users in real-time
4. When a user disconnects, the server logs "user disconnected"

## Customization

- Modify `index.html` to change the frontend appearance
- Extend the server functionality in `src/index.js` to add features like:
  - User authentication
  - Private messaging
  - Typing indicators
  - Message history

### Celebration Feature

The app includes a special command that creates a festive atmosphere:

- When any user types `/celebrate` in the chat, a colorful confetti animation appears on all connected clients
- The confetti falls from the top of the screen with random colors and animation timing
- The animation automatically cleans up after 5 seconds

## AI Usage

- "How can I serve an HTML file in Express using ES Modules?"
 GPT's Response: Use fileURLToPath(import.meta.url) and dirname to resolve paths. Then serve the file with res.sendFile(join(__dirname, "path/to/file.html")).
- "How do I broadcast a message to all connected clients with Socket.IO?"
 GPT's Response: Use io.emit("event-name", data) inside your socket.on("event-name") listener to send the message to all clients.
- "What’s the best way to handle disconnect events in Socket.IO?"
 GPT's Response: Use socket.on("disconnect", () => { ... }) to detect when a user leaves and clean up or log the event.
- "How do I organize project structure for a simple Node.js + Socket.IO app?"
 GPT's Response: Keep the server logic in a server/ folder and serve your frontend HTML and JS from a public/ or root directory. Keep things modular for easier scaling later.
- "Help me create the Readme file based on this project"
 GPT's Response: Shown as above

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Socket.IO documentation](https://socket.io/docs/)
- [Express.js](https://expressjs.com/)
