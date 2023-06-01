// REQUIRED STUFF
import mongoose from "mongoose";

const YouTubeAccountsModel = mongoose.Schema({
  channel: { type: String, required: true},
  link: { type: String, required: true },
  subscribers: { type: Number, required: true },
  videos: { type: Number, required: true },
  views: { type: Number, required: true },
  serviceProvider: { type: mongoose.Types.ObjectId, ref: "ServiceProviders" },
  createdOne: { type: Number, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS ---- */

// WITH USERS
YouTubeAccountsModel.virtual("userId", {
  ref: "ServiceProviders",
  localField: "serviceProvider",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("YouTubeAccounts", YouTubeAccountsModel);