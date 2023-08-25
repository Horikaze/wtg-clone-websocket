const express = require("express");
const app = express(); // Correct the typo here
const http = require("http").createServer(app); // Create an HTTP server
const io = require("socket.io")(http); // Correct the typo here

app.get("/", (req, res) => {
  res.send("Working");
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });
});

http.listen(3001, () => {
  console.log("server is running");
});
