// REQUIRED STUFF
import mongoose from "mongoose";

const CategoriesModel = mongoose.Schema({
  title: { type: String, required: true },
  subCategories: [{
    type: mongoose.Types.ObjectId,
    ref: "SubCategories"
  }],
  createdOn: { type: String, default: Date.now(), required: true },
  isDeleted: { type: Boolean, default: false, required: true },
});

/* ---- VIRTUALS - RELATIONS ---- */
// WITH SUBCATEGORIES
CategoriesModel.virtual("subCategoriesArr", {
  ref: "SubCategories",
  localField: "subCategoriesArr",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("Categories", CategoriesModel);