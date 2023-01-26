const RoomsRepository = require("../repositories/RoomsRepository");
const GameRoomRepository = require("../repositories/GameRoomRepository");

module.exports = function (socket, webSocketServer) {
  const getRoom = () => {};
  const leaveRoom = (roomId) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    GameRoomRepository.leaveRoom(socket, webSocketServer, indexOfRoom);
  };

  socket.on("leave-room", leaveRoom);
};
