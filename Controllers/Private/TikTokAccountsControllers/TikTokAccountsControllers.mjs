// REQUIRED STUFF
import TikTokAccountsModel from "../../../Models/TikTokAccountsModel/TikTokAccountsModel.mjs";
import ServiceProvidersModel from "../../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";

const TikTokAccounts = TikTokAccountsModel;
const ServiceProviders = ServiceProvidersModel;

const Controllers = {
  // ADD NEW TIKTOK ACCOUNT
  AddNewTTAccount: async (x) => {
    // CHECK ALREADY EXISTS
    const alreadExist = await TikTokAccounts.findOne({ userName: x.userName, link: x.link });
    if (alreadExist) return { message: "TikTok with this username or link is already registered.", messageType: "warning" };

    // NOW CREATE NEW ONE
    const response = await TikTokAccounts.create({
      userName: x.userName,
      link: x.link,
      followers: x.followers,
      likes: x.likes,
      serviceProvider: x.serviceProvider
    })
      .then(async (account) => {
        if (account) {
          let obj = { tiktok: account._id, createdOn: Date.now() };
          await ServiceProviders.findByIdAndUpdate(x.serviceProvider, { $push: { "tiktokAccounts": obj } });
          return { message: "New TikTok account added successfully.", messageType: "success" };
        }
        return { message: "Couldn't add the new account.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL TIKTOK ACCOUNTS
  GetAllTTAccounts: async () => {
    const response = await TikTokAccounts.find({ isDeleted: false })
      .then((AllAccounts) => {
        return AllAccounts.length ? { message: "Got all the TikTok accounts successfully.", messageType: "success", AllAccounts } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE ACCOUNT WITH DETAILS
  GetSingleAccountDetails: async (id) => {
    const response = await TikTokAccounts.findById(id, { isDeleted: false }).select("-__v").populate({ path: "serviceProvider", select: "-password -youtubeAccounts -tiktokAccounts -instagramAccounts -services" })
      .then((account) => {
        return account ? { message: "Got the account with details", messageType: "success", account } : { message: "The data you are looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL ACCOUNTS OF SINGLE USER
  GetAllTTAccountsOfUser: async (id) => {
    const response = await TikTokAccounts.find({ serviceProvider: id, isDeleted: false })
      .then((AllAccounts) => {
        return AllAccounts.length ? { message: "Got all the accounts of particular user.", messageType: "success", AllAccounts } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // UPDATE SINGLE TIKTOK ACCOUNT
  UpdateSingleAccount: async (id, x) => {
    const response = await TikTokAccounts.findByIdAndUpdate(id, {
      userName: x.userName,
      link: x.link,
      followers: x.followers,
      likes: x.likes,
      serviceProvider: x.serviceProvider,
    }, { new: true })
      .then((account) => {
        return account ? { message: "Updates saved successfully.", messageType: "error" } : { message: "The data you want to update doesn't found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE TIKTOK ACCOUNT - DELETE SOFT
  DeleteSingleAccountSoft: async (id) => {
    const response = await TikTokAccounts.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((account) => {
        return account ? { message: "TikTok account deleted succesfully.", messageType: "success" } : { message: "The TikTok account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE TIKTOK ACCOUNT - DELETE PERMANENT
  DeleteSingleAccountPermanent: async (id) => {
    const response = await TikTokAccounts.findByIdAndDelete(id)
      .then((account) => {
        return account ? { message: "TikTok Account deleted permanently.", messageType: "success" } : { message: "The TikTok Account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
}

export default Controllers;