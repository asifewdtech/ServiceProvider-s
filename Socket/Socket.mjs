// REQUIRED STUFF
import { Server } from 'socket.io';

// CONTROLLERS FOR CHATROOMS & MESSAGES
import ChatRoomsControllers from "../Controllers/Private/ChatRoomsControllers/ChatRoomsControllers.mjs";
import MessagesControllers from "../Controllers/Private/MessagesControllers/MessagesControllers.mjs";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });

  // USER CONNECTS TO THE SOCKET
  io.on("connection", (socket) => {
    console.log("A user connected.");

    // GET ALL MESSAGES OF A CHAT
    socket.on("chatMessages", async (id) => {
      const data = await ChatRoomsControllers.GetAllMessagesOfAChat(id);
      // Broadcast the message to all connected sockets
      io.emit("chatMessages", data);
    });

    // CREATE NEW MESSAGE
    socket.on("new message", async (message) => {
      await MessagesControllers.CreateNewMessage(message);
      const data = await ChatRoomsControllers.GetAllMessagesOfAChat(message.chatRoom);
      io.emit("chatMessages", data);
    })

    // DISCONNECT THE USER FROM SOCKET
    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });

  return io;
};

export default initializeSocket;