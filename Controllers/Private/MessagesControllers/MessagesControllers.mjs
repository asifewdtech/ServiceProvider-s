// REQUIRED STUFF
import MessagesModel from "../../../Models/MessagesModel/MessagesModel.mjs";
import ChatRoomsModel from "../../../Models/ChatRoomsModel/ChatRoomsModel.mjs";

const Messages = MessagesModel;
const ChatRooms = ChatRoomsModel;

const Controllers = {
  // CREATE NEW MESSAGE
  CreateNewMessage: async (x) => {
    const response = await Messages.create({
      sender: x.sender,
      reciever: x.reciever,
      message: x.message,
      chatRoom: x.chatRoom,
      type: x.type
    })
      .then( async (message) => {
        if (message) {
          await ChatRooms.findOneAndUpdate(x.chatRoom, { $push: { messages: message._id }}, { new: true });
          return { message: "New message created successfully.", messageType: "success" };
        }
        return { message: "Couldn't create new messasge.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  }
};

export default Controllers;