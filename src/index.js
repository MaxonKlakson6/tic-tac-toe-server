const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const roomsHandler = require("./sockets/roomsHandler");
const gameRoomHandler = require("./sockets/gameRoomHandler");

const app = express();
app.use(cors());

const server = http.createServer(app);
const webSocketServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const onSocketConnection = (socket) => {
  roomsHandler(socket, webSocketServer);
  gameRoomHandler(socket, webSocketServer);

  socket.on("disconnect", () => {
    console.log("disc " + socket.id);
  });
};

server.listen(5000, () => {
  console.log("Server is running");
});

webSocketServer.on("connection", onSocketConnection);
