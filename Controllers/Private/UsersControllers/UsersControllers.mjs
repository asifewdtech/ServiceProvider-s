// REQUIRED STUFF
import UsersModel from "../../../Models/UsersModel/UsersModel.mjs";
import fs from "fs";

const Users = UsersModel;

const Controllers = {
  // CREATE NEW USER
  CreateNewUser: async (x) => {
    // USER EXISTS ALREADY
    let alreadyExist = await Users.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered.", messageType: "warning", user: alreadyExist };

    // CREATE NEW USER
    const response = await Users.create({
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
        isRegistered: x.withFacebook.isRegistered,
        accessToken: x.withFacebook.accessToken ? x.withFacebook.accessToken : null
      },
      withGoogle: {
        isRegistered: x.withGoogle.isRegistered,
        accessToken: x.withGoogle.accessToken ? x.withGoogle.accessToken : null
      }
    })
      .then((user) => {
        return user ? { message: "New user added successfully.", messageType: "success" } : { message: "Couldn't create new user.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL USERS
  GetAllUsers: async () => {
    const response = await Users.find({ isDeleted: false })
      .then((AllUsers) => {
        return AllUsers.length ? { message: "Got all the users.", messageType: "success", AllUsers } : { message: "Users data do not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET SINGLE USER WITH DETAILS
  GetSingleUserWithDetails: async (id) => {
    const response = await Users.findById(id).select("-password -__v").populate({ path: "services.service" })
      .then((user) => {
        return user ? { message: "Got the user with details.", messageType: "success", user } : { message: "The user you're looking for doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      })
    return response;
  },

  // UPDATE SINGLE USER
  UpdateSingleUser: async (id, x) => {
    const response = await Users.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email,
      gender: x.gender,
      role: x.role,
      status: x.status,
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer
    }, { new: true })
      .then((user) => {
        return user ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The user you want to update doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  UpdateUserDP: async (id, filename) => {
    const response = await Users.findById(id)
      .then(async (user) => {
        // UPDATE NEW & DELETE OLD IMAGE
        if (user) {
          let oldImg = user.dp;
          await Users.findByIdAndUpdate(id, { dp: filename }, { new: true });
          fs.unlinkSync(`./Uploads/Profile/${oldImg}`);
          return { message: "Profile updated successfully.", messageType: "success" };
        }
        return { message: "The user you want to update profile picture doesn't exist.", messageType: "error" };
      })
      .catch(error => { console.log(error, "ERR"); return error;});
    return response;
  },

  // DELETE SINGLE USER - DELETE SOFT
  DeleteUserSoft: async (id) => {
    const response = await Users.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((deleted) => {
        return deleted ? { message: "User deleted successfully.", messageType: "success" } : { message: "The you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // DELETE SINGLE USER - DELETE PERMANENT
  DeleteUserPermanent: async (id) => {
    const response = await Users.findByIdAndDelete(id)
      .then((deleted) => {
        return deleted ? { message: "User deleted permanetly.", messageType: "success" } : { message: "The you want to delete doesn't exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
};

export default Controllers;