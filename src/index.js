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
    origin: "https://celebrated-beijinho-ed9d2b.netlify.app",
  },
});

const onSocketConnection = (socket) => {
  roomsHandler(socket, webSocketServer);
  gameRoomHandler(socket, webSocketServer);
};

server.listen(5000, () => {
  console.log("Server is running");
});

webSocketServer.on("connection", onSocketConnection);
