// REQUIRED STUFF
import mongoose from "mongoose";

const ServiceProvidersModel = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "SP", required: true },
  gender: { type: String, required: true },
  dp: { type: String, default: null },
  status: { type: String, default: "PENDING", required: true },
  createdOn: { type: String, default: Date.now(), required: true },
  securityQuestion: { type: Number, required: false },
  securityAnswer: { type: String, required: false },
  withGoogle: {
    isRegistered: { type: Boolean, default: false },
    token: { type: String, default: null }
  },
  withFacebook: {
    isRegistered: { type: Boolean, default: false },
    token: { type: String, default: null }
  },
  services: [{
    service: { type: mongoose.Types.ObjectId, ref: "Services" },
    createdOn: { type: String, default: Date.now() }
  }],
  youtubeAccounts: [{
    youtube: {type: mongoose.Types.ObjectId, ref: "YouTubeAccounts"},
    createdOn: { type: String, default: Date.now() }
  }],
  tiktokAccounts: [{
    tiktok: {type: mongoose.Types.ObjectId, ref: "TikTokAccounts"},
    createdOn: { type: String, default: Date.now() }
  }],
  instagramAccounts: [{
    instagram: {type: mongoose.Types.ObjectId, ref: "InstagramAccounts"},
    createdOn: { type: String, default: Date.now() }
  }],
  isDeleted: { type: Boolean, default: false, required: true },
});

/* ---- VIRTUALS - RELATIONS ---- */
// WITH SERVICES
ServiceProvidersModel.virtual("serviceId", {
  ref: "Services",
  localField: "service",
  foreignField: "_id",
  justOne: true
});

// YOUTUBE ACCOUNTS
ServiceProvidersModel.virtual("youtubeAccountId", {
  ref: "YouTubeAccounts",
  localField: "youtube",
  foreignField: "_id",
  justOne: true
});

// TIKTOK ACCOUNTS
ServiceProvidersModel.virtual("tiktokAccountId", {
  ref: "TikTokAccounts",
  localField: "tiktok",
  foreignField: "_id",
  justOne: true
});

// INSTAGRAM ACCOUNTS
ServiceProvidersModel.virtual("instagramAccountId", {
  ref: "InstagramAccounts",
  localField: "instagram",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("ServiceProviders", ServiceProvidersModel);