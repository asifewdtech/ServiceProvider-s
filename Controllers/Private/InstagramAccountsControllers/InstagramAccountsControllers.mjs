// REQUIRED STUFF
import InstagramAccountsModel from ".././../../Models/InstagramAccountsModel/InstagramAccountsModel.mjs";
import ServiceProvidersModel from "../../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";

const InstagramAccounts = InstagramAccountsModel;
const ServiceProviders = ServiceProvidersModel;

const Controllers = {
  // ADD NEW INSTAGRAM ACCOUNT
  AddNewIGAccount: async (x) => {
    // CHECK ALREADY EXISTS WITH CHANNEL NAME AND LINK
    const alreadyExist = await InstagramAccounts.findOne({ channel: x.channel, link: x.link });
    if (alreadyExist) return { message: "Instagram with this username title and link is already registered.", messageType: "warning" };

    // CREATE NEW ONE
    const response = await InstagramAccounts.create({
      userName: x.userName,
      link: x.link,
      posts: x.posts,
      followers: x.followers,
      serviceProvider: x.serviceProvider
    })
      .then(async (account) => {
        if (account) {
          await ServiceProviders.findByIdAndUpdate(x.serviceProvider, { $push: { "instagramAccounts": { instagram: account._id } } });
          return { message: "New Instagram Account added successfully.", messageType: "success" };
        }
        return { message: "Couldn't add new Instagram Account.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL INSTAGRAM ACCOUNTS
  GetAllIGAccounts: async () => {
    const response = await InstagramAccounts.find({ isDeleted: false })
      .then((AllAccounts) => {
        return AllAccounts.length ? { message: "Got all the IG Accounts.", messageType: "success", AllAccounts } : { message: "The data you are looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE INSTAGRAM ACCOUNT WITHG DETAILS
  GetSingleIGAccountWithDetails: async (id) => {
    const response = await InstagramAccounts.findById(id, { isDeleted: false }).select("-__v").populate({ path: "serviceProvider", select: "-password -youtubeAccounts -tiktokAccounts -instagramAccounts -services" })
      .then((account) => {
        return account ? { message: "Got the account with details.", messageType: "success", account } : { message: "The account you're looking for doesn't axist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL ACCOUNTS OF PARTICULAR USER
  GetAllIGAccountsOfUser: async (id) => {
    const response = await InstagramAccounts.find({ serviceProvider: id, isDeleted: false })
      .then((AllAccounts) => {
        return AllAccounts.length ? { message: "Got all IG accounts of a particular user.", messageType: "success", AllAccounts } : { message: "This user don't have any Instagram account.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // UPDATE SINGLE INSTAGRAM ACCOUNT
  UpdateSingleIGAccount: async (id, x) => {
    const response = await InstagramAccounts.findByIdAndUpdate(id, {
      userName: x.userName,
      link: x.link,
      posts: x.posts,
      followers: x.followers,
      serviceProvider: x.serviceProvider
    }, { new: true })
      .then((account) => {
        return account ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The IG you want to update doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE INSTAGRAM ACCOUNT - DELETE SOFT
  DeleteIGAccountSoft: async (id) => {
    const response = await InstagramAccounts.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((account) => {
        return account ? { message: "IG Account deleted successfully.", messageType: "success" } : { message: "The IG Account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE INSTAGRAM ACCOUNT - DELETE PERMANENT
  DeleteIGAccountPermanent: async (id) => {
    const response = await InstagramAccounts.findByIdAndDelete(id)
      .then((account) => {
        return account ? { message: "IG Account deleted permanently.", messageType: "success" } : { message: "The IG Account you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
};

export default Controllers;