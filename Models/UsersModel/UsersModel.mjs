// REQUIRED STUFF
import mongoose from "mongoose";

const UsersModel = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "ADMIN", required: true },
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
  isDeleted: { type: Boolean, default: false, required: true },
});

export default mongoose.model("Users", UsersModel);