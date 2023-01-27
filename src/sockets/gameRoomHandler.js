const RoomsRepository = require("../repositories/RoomsRepository");
const GameRoomRepository = require("../repositories/GameRoomRepository");

module.exports = function (socket, webSocketServer) {
  const getGameData = (roomId) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    GameRoomRepository.getGameData(socket, indexOfRoom);
  };

  const leaveRoom = (roomId) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    GameRoomRepository.leaveRoom(socket, webSocketServer, indexOfRoom);
  };

  const changeTurn = (turnData) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === turnData.roomId
    );
    GameRoomRepository.changeTurn(
      socket,
      webSocketServer,
      indexOfRoom,
      turnData.symbol,
      turnData.index
    );
  };

  const resetRoom = (roomId) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    GameRoomRepository.resetRoom(webSocketServer, indexOfRoom);
  };

  socket.on("leave-room", leaveRoom);
  socket.on("get-game-data", getGameData);
  socket.on("change-turn", changeTurn);
  socket.on("reset-room", resetRoom);
};
