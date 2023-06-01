// REQUIRED STUFF
import CompaniesModel from "../../../Models/CompaniesModel/CompaniesModel.mjs";
import fs from "fs";

const Companies = CompaniesModel;

const Controllers = {
  // CREATE NEW COMPANY
  CreateNewCompany: async (x) => {
    // CHECK EXISTING
    const alreadyExist = await Companies.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered with another company.", messageType: "error" };

    // CREATE NEW ONE
    const response = await Companies.create({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: x.password,
      gender: x.gender,
      companyTitle: x.companyTitle,
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer
    })
      .then((company) => {
        return company ? { message: "New company has been created.", messageType: "success" } : { message: "Couldn't create new company.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE COMPANY WITH DETAILS
  GetSingleCompanyWithDetails: async (id) => {
    const response = await Companies.findById(id, { isDeleted: false }).select("-password")
      .then((company) => {
        return company ? { message: "Got the company with details.", messageType: "success", company } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL COMPANIES
  GetAllCompanies: async () => {
    const response = await Companies.find({ isDeleted: false })
      .then((AllCompanies) => {
        return AllCompanies.length ? { message: "Got all the companies", messageType: "success", AllCompanies } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL APPROVED COMPANIES
  GetAllApprovedCompanies: async () => {
    const response = await Companies.find({ isDeleted: false, status: "APPROVED" })
      .then((AllApprovedCompanies) => {
        return AllApprovedCompanies.length ? { message: "Got all the approved companies.", messageType: "success", AllApprovedCompanies } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL PENDING COMPANIES
  GetAllPendingCompanies: async () => {
    const response = await Companies.find({ isDeleted: false, status: "PENDING" })
      .then((AllPendingCompanies) => {
        return AllPendingCompanies.length ? { message: "Got all the approved companies.", messageType: "success", AllPendingCompanies } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL PENDING COMPANIES
  GetAllRejectedCompanies: async () => {
    const response = await Companies.find({ isDeleted: false, status: "REJECTED" })
      .then((AllRejectedCompanies) => {
        return AllRejectedCompanies.length ? { message: "Got all the rejected companies.", messageType: "success", AllRejectedCompanies } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // UPDATE SINGLE COMPANY
  UpdateSingleCompany: async (id, x) => {
    const response = await Companies.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      status: x.status,
      companyTitle: x.companyTitle,
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer
    }, { new: true })
      .then((company) => {
        return company ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The data you want to update doesn't exist.", messageType: "error"};
      })
      .catch(error => error);
    return response;
  },

  UpdateSingleProfile: async (id, filename) => {
    const response = await Companies.findById(id)
      .then(async (user) => {
        // UPDATE NEW & DELETE OLD IMAGE
        if (user) {
          let oldImg = user.dp;
          await Companies.findByIdAndUpdate(id, { dp: filename }, { new: true });
          fs.unlinkSync(`./Uploads/Profile/${oldImg}`);
          return { message: "Profile updated successfully.", messageType: "success" };
        }
        return { message: "The user you want to update profile picture doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE COMPANY - DELETE SOFT
  DeleteSingleCompanySoft: async (id) => {
    const response = await Companies.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((company) => {
        return company ? { message: "Company deleted successfully.", messageType: "success" } : { message: "The data you want to delete doesn't exist.", messageType: "error"};
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE COMPANY - DELETE PERMANENT
  DeleteSingleCompanyPermanent: async (id) => {
    const response = await Companies.findByIdAndDelete(id)
    .then((company) => {
      return company ? { message: "Company deleted successfully.", messageType: "success" } : { message: "The data you want to delete doesn't exist.", messageType: "error"};
    })
    .catch(error => error);
  return response;
  }
}

export default Controllers;