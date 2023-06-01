// REQUIRED STUFF
import mongoose from "mongoose";

const SubCategoriesModel = mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Categories"
  },
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

/* ---- VIRTUALS - RELATIONS ---- */
// WITH CATEGORIES
SubCategoriesModel.virtual("categoryId", {
  ref: "Categories",
  localField: "category",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("SubCategories", SubCategoriesModel);