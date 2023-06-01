// REQUIRED STUFF
import CategoriesModel from "../../../Models/CategoriesModel/CategoriesModel.mjs";

const Categories = CategoriesModel;

const Controllers = {
  // CREATE NEW CATEGORY
  CreateNewCategory: async (x) => {
    // IF ALREADY EXISTS
    let foundAlready = await Categories.findOne({ title: x.title });
    if (foundAlready) return { message: "This category is already existing.", messageType: "warning" };

    // CREATE A NEW ONE
    const response = await Categories.create({
      title: x.title,
    })
      .then((category) => {
        return category ? { message: "New category has been added successfully.", messageType: "success" } : { message: "Couldn't create new category", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE CATEGORY DETAILS
  GetSingleCategoryDetails: async (id) => {
    const response = await Categories.findById(id, { isDeleted: false }).select("title").populate({ path: "subCategories", select: "title" })
      .then((category) => {
        return category ? { message: "Got the required category.", messageType: "success", category } : { message: "Category not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL CATEGORIES
  GetAllCategories: async () => {
    const response = await Categories.find({ isDeleted: false }).select("title")
      .then((AllCategories) => {
        return AllCategories.length ? { message: "Got all the categories.", messageType: "success", AllCategories } : { message: "The data you're looking for doesn't exist", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // UPDATE SINGLE CATEGORY
  UpdateSingleCategory: async (id, x) => {
    const response = await Categories.findByIdAndUpdate(id, {

    }, { new: true })
      .then((category) => {
        return category ? { message: "Category successfully updated.", messageType: "success" } : { message: "The category you want to update doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE CATEGORY - SOFT DELETE
  DeleteCategorySoft: async (id) => {
    let response = await Categories.findById(id)
      .then(async (category) => {
        // CATEGORY NOT FOUND
        if (!category) return { message: "Category not found.", messageType: "error" };

        // CATEGORY FOOND & SUB-CATEGORIES ARE ALSO THERE
        if (category.subCategories.length) {
          return { message: "Category is not empty. Please delete sub-categories first", messageType: "error" };
        }

        // CATEGORY FOUND, CHECK SUB-CATEGOREIS ARE EMPTY
        if (!category.subCategories.length) {
          let x = await Categories.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
          return x ? { message: "Category delete successfully.", messageType: "success" } : { message: "Something went wrong.", messageType: "error" };
        }
      });
    return response;
  },

  // DELETE SINGLE CATEGORY - PERMANENT DELETE
  DeleteCategoryPermanent: async (id) => {
    const response = await Categories.findById(id)
      .then(async (category) => {
        // CATEGORY NOT FOUND
        if (!category) return { message: "Category not found.", messageType: "error" };

        // CATEGORY FOUND, CHECK SUB-CATEGOREIS ARE EMPTY
        if (!category.subCategories.length) {
          let x = await Categories.findByIdAndDelete(id);
          return x ? { message: "Category delete permanently.", messageType: "success" } : { message: "Something went wrong.", messageType: "error" };
        }

        // CATEGORY FOUND & SUB-CATEGORIES ARE ALSO THERE
        if (category.subCategories.length) {
          return { message: "Category is not empty. Please delete sub-categories first", messageType: "error" };
        }
      });
    return response;
  }
}

export default Controllers;