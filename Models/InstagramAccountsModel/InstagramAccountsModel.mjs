// REQUIRED STUFF
import mongoose from "mongoose";

const InstagramAccountsModel = mongoose.Schema({
  userName: { type: String, required: true },
  link: { type: String, required: true },
  posts: { type: Number, required: true },
  followers: {type: Number, required: true },
  serviceProvider: { type: mongoose.Types.ObjectId, ref: "ServiceProviders" },
  createdOne: { type: Number, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS ---- */

// WITH USERS
InstagramAccountsModel.virtual("userId", {
  ref: "ServiceProviders",
  localField: "serviceProvider",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("InstagramAccounts", InstagramAccountsModel);