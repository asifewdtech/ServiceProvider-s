// REQUIRED STUFF
import mongoose from "mongoose";

const messagesModel = mongoose.Schema({
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  chatRoom: { type: mongoose.Types.ObjectId, ref: "ChatRooms", required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS ---- */

// WITH CHAT ROOMS
messagesModel.virtual("chatRoomId", {
  localField: "chatRoom",
  foreignField: "_id",
  ref: "ChatRooms"
});

export default mongoose.model("Messages", messagesModel);