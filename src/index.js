const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const webSocketServer = new Server(server);

webSocketServer.on("connect", (socket) => {
  console.log("connection");
});

server.listen(5000, () => {
  console.log("Server is running");
});
