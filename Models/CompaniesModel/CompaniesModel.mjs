// REQUIRED STUFF
import mongoose from "mongoose";

const CompaniesModel = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  dp: { type: String, default: null },
  role: { type: String, default: "COM", required: true },
  status: { type: String, default: "PENDING", required: true },
  companyTitle: { type: String, required: true },
  securityQuestion: { type: Number, required: false },
  securityAnswer: { type: String, required: false },
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

export default mongoose.model("Companies", CompaniesModel);