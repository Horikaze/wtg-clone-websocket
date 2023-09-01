const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let URL = "";
let isPlaying = false;
let time = 0;

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("change", (data) => {
    URL = data.URL;
    isPlaying = data.playing;
    time = data.currentTime;
    console.log(URL, isPlaying, time);
    socket.broadcast.emit("recive", {
      URL,
      isPlaying,
      time,
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
