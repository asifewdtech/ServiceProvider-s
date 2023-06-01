// REQUIRED STUFF
import UsersModel from "../../Models/UsersModel/UsersModel.mjs";
import ServiceProvidersModel from "../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";
import CompaniesModel from "../../Models/CompaniesModel/CompaniesModel.mjs";
import TokenGenerator from "../../Utilities/TokenGenerator/TokenGenerator.mjs";

const Users = UsersModel;
const ServiceProviders = ServiceProvidersModel;
const Companies = CompaniesModel;

const Controllers = {
  /* ---- ADMIN ---- */

  // REGISTER THE USER - ADMIN
  SingUp_Admin: async (x) => {
    // USER EXISTS ALREADY
    let alreadyExist = await Users.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered.", messageType: "warning" };

    // CREATE NEW USER
    const response = await Users.create({
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email,
      gender: x.gender,
      role: x.role,
      status: "PENDING",
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer,
      withFacebook: {
        isRegistered: x.withFacebook.isRegistered,
        accessToken: x.withFacebook.accessToken ? x.withFacebook.accessToken : null
      },
      withGoogle: {
        isRegistered: x.withGoogle.isRegistered,
        accessToken: x.withGoogle.accessToken
      }
    }).then((user) => {
      return user ? { message: "You've been registered successfully.", messageType: "success" } : { message: "Couldn't register the user.", messageType: "danger" };
    }).catch((error) => {
      console.log(error);
      return error;
    });
    return response;
  },

  // SIGN IN USER WITH CREDENTIALS - ADMIN
  SignIn_Admin: async (x) => {
    const response = await Users.findOne({ email: x.email, password: x.password, isDeleted: false }).select("firstName lastName email role gender status")
      .then((userLoggedIn) => {
        // USER NOT FOUND
        if (!userLoggedIn) return { message: "Invalid email or Password.", messageType: "error" };

        // TOKEN AGAINST FOUND USER
        if (userLoggedIn) {
          const token = TokenGenerator(userLoggedIn);

          // APPROVED USER
          if (userLoggedIn.status === "APPROVED") {
            return { message: "You've logged in successfully.", messageType: "success", token };
          }
          // PENDING USER
          if (userLoggedIn.status === "PENDING") {
            return { message: "Your request is being processed, please wait.", messageType: "warning", status: "PENDING" };
          }
          // REJECTED USER
          if (userLoggedIn.status === "REJECTED") {
            return { message: "Your request has been reject by Admin.", messageType: "error", status: "REJECTED" }
          }
        }
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // FORGET PASSWORD - ADMIN
  ForgotPassword_Admin: async (x) => {
    const response = await Users.findOne({ email: x.email }).select("_id securityQuestion")
      .then((user) => {
        return user ? { message: "Your email has been found.", messageType: "success", user: { _id, securityAnswer } } : { message: "Your email does not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // VALIDATE SECURITY QUESTION AND SEND EMAIL TO UPDATE PASSWORD - ADMIN
  ValidateQuestion_Admin: async (id, x) => {
    const response = await Users.findById(id, {
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer
    })
      .then((user) => {
        // SEND MAIL TO CHANGE THE PASSWORD
        return user;
      })
      .catch((error) => {
        return error;
      })
  },

  /* ---- SERVICE PROVIDER ---- */

  // REGISTER THE USER - SERVICE PROVIDER
  SingUp_SP: async (x) => {
    // USER EXISTS ALREADY
    let alreadyExist = await ServiceProviders.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered.", messageType: "warning" };

    // CREATE NEW USER
    const response = await ServiceProviders.create({
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email,
      gender: x.gender,
      role: x.role,
      status: "PENDING",
      securityQuestion: x.securityQuestion,
      securityAnswer: x.securityAnswer,
      withFacebook: {
        isRegistered: x.withFacebook.isRegistered,
        accessToken: x.withFacebook.accessToken ? x.withFacebook.accessToken : null
      },
      withGoogle: {
        isRegistered: x.withGoogle.isRegistered,
        accessToken: x.withGoogle.accessToken
      }
    }).then((user) => {
      return user ? { message: "You've been registered successfully.", messageType: "success" } : { message: "Couldn't register the user.", messageType: "danger" };
    }).catch((error) => {
      console.log(error);
      return error;
    });
    return response;
  },

  // SIGN IN USER WITH CREDENTIALS - SERVICE PROVIDER
  SignIn_SP: async (x) => {
    const response = await ServiceProviders.findOne({ email: x.email, password: x.password, isDeleted: false }).select("firstName lastName email role gender status")
      .then((userLoggedIn) => {
        // USER NOT FOUND
        if (!userLoggedIn) return { message: "Invalid email or Password.", messageType: "error" };

        // TOKEN AGAINST FOUND USER
        if (userLoggedIn) {
          const token = TokenGenerator(userLoggedIn);

          // APPROVED USER
          if (userLoggedIn.status === "APPROVED") {
            return { message: "You've logged in successfully.", messageType: "success", status: "APPROVED", token };
          }
          // PENDING USER
          if (userLoggedIn.status === "PENDING") {
            return { message: "Your request is being processed, please wait.", messageType: "success", status: "PENDING" };
          }
          // REJECTED USER
          if (userLoggedIn.status === "REJECTED") {
            return { message: "Your request has been reject by Admin.", messageType: "success", status: "REJECTED" }
          }
        }
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // FORGET PASSWORD - SERVICE PROVIDER
  ForgotPassword_SP: async (x) => {
    const response = await ServiceProviders.findOne({ email: x.email }).select("_id securityQuestion")
      .then((user) => {
        return user ? { message: "Your email has been found.", messageType: "success", user: { _id, securityAnswer } } : { message: "Your email does not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // VALIDATE SECURITY QUESTION AND SEND EMAIL TO UPDATE PASSWORD
  ValidateQuestion_SP: async (x) => {

  },

  /* ---- COMPANY ---- */

  // REGISTER THE USER - COMPANY
  SignUp_Company: async (x) => {
    // ALREADY EXISTS
    const alreadyExist = await Companies.findOne({ email: x.email });
    if (alreadyExist) return { message: "Company with this email is already registered.", messageType: "warning" };

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
        return company ? { message: "You've been registered successfully.", messageType: "success" } : { message: "Couldn't register the company.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // SIGN IN USER - COMPANY
  SignIn_Company: async (x) => {
    const response = await Companies.findOne({ email: x.email, password: x.password, isDeleted: false }).select("firstName lastName email role gender status")
      .then((userLoggedIn) => {
        // USER NOT FOUND
        if (!userLoggedIn) return { message: "Invalid email or Password.", messageType: "error" };

        // TOKEN AGAINST FOUND USER
        if (userLoggedIn) {
          const token = TokenGenerator(userLoggedIn);

          // APPROVED USER
          if (userLoggedIn.status === "APPROVED") {
            return { message: "You've logged in successfully.", messageType: "success", token, status: "APPROVED" };
          }
          // PENDING USER
          if (userLoggedIn.status === "PENDING") {
            return { message: "Your request is being processed, please wait.", messageType: "success", status: "PENDING" };
          }
          // REJECTED USER
          if (userLoggedIn.status === "REJECTED") {
            return { message: "Your request has been reject by Admin.", messageType: "success", status: "REJECTED" }
          }
        }
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // FORGOT PASSWORD - COMPANY
  ForgotPassword_Company: async (x) => {
    const response = await Companies.findOne({ email: x.email }).select("_id securityQuestion")
      .then((user) => {
        return user ? { message: "Your email has been found.", messageType: "success", user: { _id, securityAnswer } } : { message: "Your email does not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // VALIDATE SECURITY QUESTION AND SEND EMAIL TO UPDATE PASSWORD
  ValidateQuestion_Company: async (x) => {

  }
}

export default Controllers;