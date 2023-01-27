const RoomsRepository = require("../repositories/RoomsRepository");
const GameRoomRepository = require("../repositories/GameRoomRepository");

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

  const deleteRoom = (roomId) => {
    const indexOfRoom = RoomsRepository.rooms.findIndex(
      (room) => room.id === roomId
    );
    RoomsRepository.deleteRoom(webSocketServer, indexOfRoom);
  };

  const disconnect = () => {
    const indexOfLastRoom = RoomsRepository.rooms.findIndex((room) => {
      const users = room.users;

      return users.some((user) => user.id === socket.id);
    });

    if (indexOfLastRoom < 0) {
      return;
    }

    GameRoomRepository.leaveRoom(socket, webSocketServer, indexOfLastRoom);
    GameRoomRepository.resetRoom(webSocketServer, indexOfLastRoom);
  };

  socket.on("get-rooms", getRooms);
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
  socket.on("delete-room", deleteRoom);
  socket.on("disconnect", disconnect);
};
