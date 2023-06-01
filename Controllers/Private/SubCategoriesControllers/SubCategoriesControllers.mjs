// REQUIRED STUFF
import SubCategoriesModel from "../../../Models/SubCategoriesModel/SubCategoriesModel.mjs";
import CategoriesModel from "../../../Models/CategoriesModel/CategoriesModel.mjs";

const SubCategories = SubCategoriesModel;
const Categories = CategoriesModel;

const Controllers = {
  // CRAETE NEW SUB-CATEGORY
  CreateNewSubCategory: async (x) => {
    // CHECK ALREADY EXISTES
    const alreadyExist = await SubCategories.findOne({ title: x.title });
    if (alreadyExist) return { message: "Sub-category with this title exists already.", messageType: "warning" };

    // CREATE NEW SUB-CATEGORY
    const response = await SubCategories.create({
      title: x.title,
      category: x.category
    })
      .then( async (subCategory) => {
        if (subCategory) {
          await Categories.findByIdAndUpdate(x.category, {$push: { "subCategories": subCategory._id}}, { new: true});
        }
        return subCategory ? { message: "New sub-category has been added successfully.", messageType: "success" } : { message: "Couldn't add the new sub-category.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      })
    return response;
  },

  // GET ALL SUB-CATEGORIES
  GetAllSubCategories: async () => {
    const response = await SubCategories.find({ isDeleted: false }).select("title category")
      .then((AllSubCategories) => {
        return AllSubCategories.length ? { message: "Got all the sub-categories.", messageType: "success", AllSubCategories } : { message: "No sub-category found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE SUB-CATEGORY DETAILS
  GetSingleSubCategoryDetails: async (id) => {
    const response = await SubCategories.findById(id, { isDeleted: false }).populate({path: "category", select: "title"})
      .then((subCategory) => {
        return subCategory ? { message: "Got the sub-category with details.", messageType: "success", subCategory } : { message: "Sub-category you're looking for doesn't exist.", messageType: "error" }
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // UPDATE SINGLE SUB-CATEGORY
  UpdateSingleSubCategory: async (id, x) => {
    const response = await SubCategories.findByIdAndUpdate(id, {
      title: x.title,
      category: x.category
    }, { new: true })
      .then((subCategory) => {
        return subCategory ? { message: "Sub-category updated successfully.", messageType: "success" } : { message: "The sub-category you want to update doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE SUB-CATEGORY - SOFT DELETE
  DeleteSubCategorySoft: async (id) => {
    const response = await SubCategories.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((subCategory) => {
        return subCategory ? { message: "Sub-category deleted successfully.", messageType: "success" } : { message: "The sub-category you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE SUB-CATEGORY - PERMANENT DELETE
  DeleteSubCategoryPermanent: async (id) => {
    const response = await SubCategories.findByIdAndDelete(id)
      .then((subCategory) => {
        console.log(subCategory);
        return subCategory ? { message: "Sub-category deleted permanently.", messageType: "success" } : { message: "The sub-category you want to delete doesn't exist.", messageType: "error" }
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
}

export default Controllers;