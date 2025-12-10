const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const port = 3000;

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server);

// ========== SOCKET.IO ==========
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ====== STATIC FILES ======
app.use(express.static(path.resolve("./public")));

// ====== MAIN ROUTE ======
app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./CHAT-APP/public/index.html"));
});

// ====== START SERVER ======
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
