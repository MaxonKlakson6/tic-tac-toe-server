const RoomsRepository = require("./RoomsRepository");
const checkWinner = require("../helpers/checkWinner");

class GameRoomRepository {
  static instance = new GameRoomRepository();

  getGameData(socket, indexOfRoom) {
    const room = RoomsRepository.rooms[indexOfRoom];

    const user = room.users.find((user) => user.id === socket.id);
    socket.emit("take-game-data", { room, user });
  }

  leaveRoom(socket, webSocketServer, indexOfRoom) {
    const room = RoomsRepository.rooms[indexOfRoom];

    if (room) {
      const indexOfUser = room.users.findIndex((user) => user.id === socket.id);

      room.users.splice(indexOfUser, 1);
      socket.leave(room.id);
      webSocketServer.emit("take-rooms", RoomsRepository.rooms);
    }
  }
  changeTurn(socket, webSocketServer, indexOfRoom, symbol, fieldIndex) {
    const room = RoomsRepository.rooms[indexOfRoom];

    if (symbol === room.turn && !room.fields[fieldIndex]) {
      room.fields[fieldIndex] = symbol;
      room.turn = symbol === "X" ? "O" : "X";
      webSocketServer.in(room.id).emit("update-room", room);
    }
    this.finishGame(webSocketServer, room, symbol);
  }

  resetRoom(webSocketServer, indexOfRoom) {
    const room = RoomsRepository.rooms[indexOfRoom];

    if (!room) {
      return;
    }

    room.fields = ["", "", "", "", "", "", "", "", ""];

    if (room.users[0]) {
      room.users[0].symbol = "X";
    }
    room.turn = "X";
    webSocketServer
      .in(room.id)
      .emit("take-game-data", { user: room.users[0], room });
  }
  finishGame(webSocketServer, room, symbol) {
    const isWinner = checkWinner(room.fields, symbol);
    const isDraw = room.fields.every((cell) => cell !== "");

    if (isWinner) {
      webSocketServer.in(room.id).emit("game-finished", `Win: ${symbol}`);
    } else if (isDraw) {
      webSocketServer.in(room.id).emit("game-finished", "Draw");
    }
  }
}

module.exports = GameRoomRepository.instance;
