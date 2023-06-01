// REQUIRED STUFF
import YouTubeAccountsModel from "../../../Models/YouTubeAccountsModel/YouTubeAccountsModel.mjs";
import ServiceProvidersModel from "../../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";

const YouTubeAccounts = YouTubeAccountsModel;
const ServiceProviders = ServiceProvidersModel;

const Controllers = {
  // ADD NEW YOUTUBE ACCOUNT
  AddNewYTAccount: async (x) => {
    // CHECK ALREADY EXISTS WITH CHANNEL NAME AND LINK
    const alreadyExist = await YouTubeAccounts.findOne({ channel: x.channel, link: x.link });
    if (alreadyExist) return { message: "YouTube with this channel title and link is already registered.", messageType: "warning" };

    // CREATE NEW ONE
    const response = await YouTubeAccounts.create({
      channel: x.channel,
      link: x.link,
      subscribers: x.subscribers,
      videos: x.videos,
      views: x.views,
      serviceProvider: x.serviceProvider,
    })
      .then(async (account) => {
        if (account) {
          let obj = { youtube: account._id, createdOn: Date.now() };
          await ServiceProviders.findByIdAndUpdate(x.serviceProvider, { $push: { "youtubeAccounts": obj } });
          return { message: "New YouTube Account added successfully.", messageType: "success" };
        }
        return { message: "Couldn't add new YouTube Account.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL YOUTUBE ACCOUNTS
  GetAllAccounts: async () => {
    const response = await YouTubeAccounts.find({ isDeleted: false })
      .then((AllYouTubeAccounts) => {
        return AllYouTubeAccounts.length ? { message: "Got all the YouTue Accounts.", messageType: "success", AllYouTubeAccounts } : { message: "The data you are looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE ACCOUNT
  GetSingleYTAccountDetails: async (id) => {
    const response = await YouTubeAccounts.findById(id, { isDeleted: false }).select("-__v").populate({ path: "serviceProvider", select: "-password -youtubeAccounts -tiktokAccounts -instagramAccounts -services" })
      .then((account) => {
        return account ? { message: "Got the YouTube account with details.", messageType: "success", account } : { message: "The YouTube you are looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL YOUTUBE ACCOUNTS OF A SERVICE PROVIDER
  GetAllAccountsOfUser: async (id) => {
    const response = await YouTubeAccounts.find({ serviceProvider: id, isDeleted: false })
      .then((AllYouTubeAccounts) => {
        return AllYouTubeAccounts.length ? { message: "Got all the accounts of particular user.", messageType: "success", AllYouTubeAccounts } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // UPDATE THE SINGLE YOUTUBE ACCOUNT
  UpdatSingleYTAccount: async (id, x) => {
    const response = await YouTubeAccounts.findByIdAndUpdate(id, {
      channel: x.channel,
      link: x.link,
      subscribers: x.subscribers,
      videos: x.videos,
      views: x.views
    }, { new: true })
      .then((account) => {
        return account ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The YouTube Account you want to update doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE THE SINGLE YOUTUBE ACCOUNT - DELELTE SOFT
  DeleteSingleYTAccountSoft: async (id) => {
    const response = await YouTubeAccounts.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((account) => {
        return account ? { message: "YouTube Account deleted successfully.", messageType: "success" } : { message: "The YouTube Account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE THE SINGLE YOUTUBE ACCOUNT - DELELTE PERMANENT
  DeleteSingleYTAccountPermanent: async (id, x) => {
    const response = await YouTubeAccounts.findByIdAndDelete(id)
      .then(async (account) => {
        if (account) {
          await ServiceProvidersModel.findByIdAndUpdate(x.serviceProvider, {
            $pull: { "youtubeAccounts": { youtube: account._id } }
          }, { new: true });
        }
        return account ? { message: "YouTube Account deleted permanently.", messageType: "success" } : { message: "The YouTube Account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
}

export default Controllers;