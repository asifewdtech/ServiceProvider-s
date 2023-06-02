// REQUIRED STUFF
import ChatRoomsModel from "../../../Models/ChatRoomsModel/ChatRoomsModel.mjs";

const ChatRooms = ChatRoomsModel;

const Controllers = {
  // CREATE NEW CHAT ROOM
  CreateNewChatRoom: async (x) => {
    // ALREADY EXISTS
    const alreadyExists = await ChatRooms.findOne({ user1: x.company, user2: x.sp });
    if (alreadyExists) return { message: "Chat room with these users is already created.", messageType: "warrning" };

    // CREATING NEW CHAT ROOM
    const response = await ChatRooms.create({
      user1: x.company,
      user2: x.sp
    })
      .then((chatRoom) => {
        return chatRoom ? { message: "Chat Room created successfully.", messageType: "success" } : { message: "Couldn't create the chat room.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL CHAT ROOMS
  GetAllChatRooms: async () => {
    const response = await ChatRooms.find({ isDeleted: false }).populate("user1 user2")
      .then((AllChatRooms) => {
        return AllChatRooms.length ? { message: "Got all the chat rooms.", messageType: "success", AllChatRooms } : { message: "No chat rooms is created.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL CHAT ROOMS FOR SERVICE PROVIDER
  GetAllChatRoomsOfSP: async (id) => {
    const response = await ChatRooms.find({ sp: id, isDeleted: false }).select("-messages").populate({ path: "company", select: "firstName lastName email dp role" })
      .then((AllChatRooms) => {
        return AllChatRooms.length ? { message: "Got all the chat rooms.", messageType: "success", AllChatRooms } : { message: "No chat rooms is created.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL CHAT ROOMS FOR COMPANY
  GetAllChatRoomsOfCOM: async (id) => {
    const response = await ChatRooms.find({ company: id, isDeleted: false }).select("-messages").populate({ path: "sp", select: "firstName lastName email dp role" })
      .then((AllChatRooms) => {
        return AllChatRooms.length ? { message: "Got all the chat rooms.", messageType: "success", AllChatRooms } : { message: "No chat room is created.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL MESSAGE OF A CHAT ROOM
  GetAllMessagesOfAChat: async (id) => {
    const response = await ChatRooms.findById(id).populate("messages")
      .then((chatRoom) => {
        return chatRoom ? { message: "Got all the messages of the chat.", messageType: "success", chatRoom } : { message: "Got all the messages of the chat.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // UPDATE SINLGE CHAT ROOM
  UpdatSingleChatRoom: async (id, x) => {
    const response = await ChatRooms.findByIdAndUpdate(id, x, { new: true })
      .then((chatRoom) => {
        return chatRoom ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The chat room you want to update doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGE CHAT ROOM - DELETE SOFT
  DeleteSingleChatRoomSoft: async (id) => {
    const response = await ChatRooms.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((chatRoom) => {
        return chatRoom ? { message: "Chat deleted successfully.", messageType: "success" } : { message: "The chat you want to delete doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGE CHAT ROOM - DELETE PERMANENT
  DeleteSingleChatRoomPermanent: async (id) => {
    const response = await ChatRooms.findByIdAndDelete(id)
      .then((chatRoom) => {
        return chatRoom ? { message: "Chat deleted permanently.", messageType: "success" } : { message: "The chat you want to delete doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  }
}

export default Controllers;