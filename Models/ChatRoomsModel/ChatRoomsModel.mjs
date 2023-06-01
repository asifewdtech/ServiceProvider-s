// REQUIRED STUFF
import mongoose from "mongoose";

const chatRoomsModel = mongoose.Schema({
  user1: { type: mongoose.Types.ObjectId, ref: "Companies", required: true },
  user2: { type: mongoose.Types.ObjectId, ref: "ServiceProviders", required: true },
  isOkay: { type: Boolean, default: false, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Messages" }],
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS ---- */

// WITH SERVICE PROVIDERS
chatRoomsModel.virtual("user1Id", {
  localField: "user1",
  foreignField: "_id",
  ref: "ServiceProviders",
  justOne: true
});

// WITH COMPANIES
chatRoomsModel.virtual("user2Id", {
  localField: "user2",
  foreignField: "_id",
  ref: "Companies",
  justOne: true
});

chatRoomsModel.virtual("messagesArr", {
  localField: "messages",
  foreignField: "_id",
  ref: "Messages",
  justOne: true
});

export default mongoose.model("ChatRooms", chatRoomsModel);