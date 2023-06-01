// REQUIRED STUFF
import ServiceProvidersModel from "../../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";
import fs from "fs";

const ServiceProviders = ServiceProvidersModel;

const Controllers = {
  // CREATE NEW SERVICE PROVIDER
  CreateNewSP: async (x) => {
    // EMAIL ALREADY EXISTS
    const alreadyExist = await ServiceProviders.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered with another user.", messageType: "warning" };

    // NOW, CREATE NEW ONE
    const response = await ServiceProviders.create({
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email,
      gender: x.gender,
      role: x.role,
      status: x.status ? x.status : "PENDING",
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer,
      withFacebook: {
        isRegistered: false,
        accessToken: null
      },
      withGoogle: {
        isRegistered: false,
        accessToken: null
      }
    })
      .then((serviceProvider) => {
        return serviceProvider ? { message: "New Service Provider created successfully.", messageType: "success" } : { message: "Couldn't create the new service provider.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL SERVICE PROVIDERS
  GetAllSP: async () => {
    const response = await ServiceProviders.find({ isDeleted: false }).select("firstName lastName email role gender status")
      .then((AllSP) => {
        return AllSP.length ? { message: "Got all the Service Providers.", messageType: "success", AllSP } : { message: "The data for Service Providers not fount.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET SINGLE SERVICE PROVIDER WITH DETAILS
  GetSingleSPWihtDetails: async (id) => {
    const response = await ServiceProviders.findById(id, { isDeleted: false }).select("-password -__v").populate("youtubeAccounts.youtube instagramAccounts.instagram tiktokAccounts.tiktok")
      .then((serviceProvider) => {
        return serviceProvider ? { message: "Got the service provider with details.", messageType: "success", serviceProvider } : { message: "The server provider you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // UPDATE SINGLE SERVICE PROVIDER
  UpdateSingleSP: async (id, x) => {
    const response = await ServiceProviders.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email,
      role: x.role,
      status: x.status,
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer
    }, { new: true })
      .then((serviceProvider) => {
        return serviceProvider ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The server provider you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  UpdateSingleProfile: async (id, filename) => {
    const response = await ServiceProviders.findById(id)
      .then(async (user) => {
        // UPDATE NEW & DELETE OLD IMAGE
        if (user) {
          let oldImg = user.dp;
          await ServiceProviders.findByIdAndUpdate(id, { dp: filename }, { new: true });
          fs.unlinkSync(`./Uploads/Profile/${oldImg}`);
          return { message: "Profile updated successfully.", messageType: "success" };
        }
        return { message: "The user you want to update profile picture doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE SERVICE PROVIDER - SOFT DELETE
  DeleteSingleSPSoft: async (id) => {
    const response = await ServiceProviders.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((serviceProvider) => {
        return serviceProvider ? { message: "Service Provider deleted successfully.", messageType: "success"} : { message: "The service provider you want to delete doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE SERVICE PROVIDER - PERMANENT DELETE
  DeleteSingleSPDeletePermanent: async (id) => {
    const response = await ServiceProviders.findByIdAndDelete(id)
      .then((serviceProvider) => {
        return serviceProvider ? { message: "The service provider deleted permanently.", messageType: "success" } : { message: "The service provider you want to delete doesn't exist.", messageType: "error"};
      })
      .catch(error => error);
    return response;
  }
}

export default Controllers;