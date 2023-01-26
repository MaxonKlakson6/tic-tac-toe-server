const RoomsRepository = require("../repositories/RoomsRepository");

module.exports = function (socket, webSocketServer) {
  const getRooms = () => {
    RoomsRepository.getRooms(socket);
  };
  const createRoom = (roomName) => {
    RoomsRepository.createRoom(socket, webSocketServer, roomName);
  };

  const joinRoom = ({ name, roomId }) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    RoomsRepository.joinRoom(socket, webSocketServer, indexOfRoom, name);
  };

  socket.on("get-rooms", getRooms);
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
