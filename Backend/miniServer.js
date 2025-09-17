const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);
  socket.on("hello", (msg) => {
    console.log("📩 Got message:", msg);
    socket.emit("world", "Hello back!");
  });
});

server.listen(4000, () => console.log("Mini server running on :4000"));
