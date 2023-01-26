const RoomsRepository = require("./RoomsRepository");

class GameRoomRepository {
  static instance = new GameRoomRepository();

  leaveRoom(socket, webSocketServer, indexOfRoom) {
    const room = RoomsRepository.rooms[indexOfRoom];

    if (room) {
      const indexOfUser = room.users.findIndex((user) => user.id === socket.id);

      room.users.splice(indexOfUser, 1);
      socket.leave(room.id);
      webSocketServer.emit("take-rooms", RoomsRepository.rooms);
    }
  }
}

module.exports = GameRoomRepository.instance;
