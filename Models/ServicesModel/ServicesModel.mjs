// REQUIRED STUFF
import mongoose from "mongoose";

const servicesModel = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "PENDING", required: true },
  image: { type: String, default: "https://picsum.photos/800/500", required: false },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Categories",
    required: true
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SubCategories",
    required: true
  },
  serviceProvider: {
    type: mongoose.Types.ObjectId,
    ref: "ServiceProviders",
    required: true
  },
  isDeleted: { type: Boolean, default: false },
  createdDate: { type: Date, required: true, default: Date.now() },
});

/* ---- VIRTUALS - RELATIONS ---- */

// WITH CATEGORIES
servicesModel.virtual("categoryId", {
  ref: "Categories",
  localField: "serviceId",
  foreignField: "_id",
  justOne: true
});

// WITH SUB-CATEGORIES
servicesModel.virtual("subCatergoryId", {
  ref: "SubCategories",
  localField: "subCatergory",
  foreignField: "_id",
  justOne: true
});

// WITH USERS
servicesModel.virtual("userId", {
  ref: "ServiceProviders",
  localField: "serviceProvider",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("Services", servicesModel);