const { v4: uuid } = require("uuid");

class RoomsRepository {
  rooms = [];

  static instance = new RoomsRepository();
  getRooms(socket) {
    socket.emit("take-rooms", this.rooms);
  }
  createRoom(socket, webSocketServer, roomName) {
    const newRoom = {
      name: roomName,
      id: uuid(),
      users: [],
      fields: ["", "", "", "", "", "", "", "", ""],
      turn: "X",
    };
    this.rooms.unshift(newRoom);
    webSocketServer.emit("take-rooms", this.rooms);
  }
  joinRoom(socket, webSocketServer, indexOfRoom, userName) {
    const room = this.rooms[indexOfRoom];

    if (room.users.length < 2) {
      const symbol = room.users.length === 0 ? "X" : "O";

      const userInRoom = {
        id: socket.id,
        name: userName,
        symbol,
      };

      socket.join(room.id);
      room.users.push(userInRoom);
      webSocketServer.emit("take-rooms", this.rooms);
      socket.emit("user-joined", room.id);
      webSocketServer.in(room.id).emit("update-room", room);
    }
  }

  deleteRoom(webSocketServer, indexOfRoom) {
    if (indexOfRoom < 0) {
      return;
    }

    this.rooms.splice(indexOfRoom, 1);
    webSocketServer.emit("take-rooms", this.rooms);
  }
}

module.exports = RoomsRepository.instance;
