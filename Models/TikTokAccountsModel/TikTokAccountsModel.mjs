// REQUIRED STUFF
import mongoose from "mongoose";

const TikTokAccountsModel = mongoose.Schema({
  userName: { type: String, required: true },
  link: { type: String, required: true },
  followers: { type: Number, required: true },
  likes: { type: Number, required: true },
  serviceProvider: { type: mongoose.Types.ObjectId, ref: "ServiceProviders", required: true },
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS ---- */

// WITH USERS
TikTokAccountsModel.virtual("userId", {
  ref: "ServiceProviders",
  localField: "serviceProvider",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("TikTokAccounts", TikTokAccountsModel);