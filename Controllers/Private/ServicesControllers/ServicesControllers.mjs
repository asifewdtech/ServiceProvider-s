// REQUIRED STUFF
import ServicesModel from "../../../Models/ServicesModel/ServicesModel.mjs";
import ServiceProvidersModel from "../../../Models/ServiceProvidersModel/ServiceProvidersModel.mjs";
import fs from "fs";

const Services = ServicesModel;
const ServiceProviders = ServiceProvidersModel;

const Controllers = {
  // CREATE NEW SERVICE
  CreateNewService: async (x, filename) => {
    const response = await Services.create({
      title: x.title,
      description: x.description,
      status: x.status ? x.status : "PENDING",
      category: x.category,
      subCategory: x.subCategory,
      serviceProvider: x.serviceProvider,
      image: filename
    })
      .then(async (service) => {
        if (service) {
          await ServiceProviders.findByIdAndUpdate(x.serviceProvider, { $push: { services: service._id } }, { new: true });
          return { message: "New service has been created successfully.", messageType: "success" };
        }

        // COULDN'T CREATE NEW SERVICE
        fs.unlinkSync(`./Uploads/Services/${filename}`);
        return { message: "Couldn't create the new service.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  // GET ALL SERVICES
  GetAllServices: async () => {
    const response = await Services.find({ isDeleted: false })
      .then((AllServices) => {
        return AllServices.length ? { message: "Got all the services.", messageType: "success", AllServices } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET SINGLE SERVICE WITH DETAILS
  GetSingleServiceWithDetails: async (id) => {
    const response = await Services.findById(id).populate([
      { path: "category", select: "title" },
      { path: "subCategory", select: "title" },
      { path: "serviceProvider", select: "firstName lastName email status role dp" }
    ])
      .then((service) => {
        return service ? { message: "Got thes service with details.", messageType: "success", service } : { message: "The service you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL APPROVED SERVICES
  GetAllApprovedServices: async () => {
    const response = await Services.find({ isDeleted: false, status: "APPROVED" })
      .then((AllApprovedServices) => {
        return AllApprovedServices.length ? { message: "Got all the apporved services.", messageType: "success", AllApprovedServices } : { message: "The data for approved services doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL PENDING SERVICES
  GetAllPendingServices: async () => {
    const response = await Services.find({ status: "PENDING", isDeleted: false })
      .then((AllPendingServices) => {
        return AllPendingServices.length ? { message: "Got all the apporved services.", messageType: "success", AllPendingServices } : { message: "The data for approved services doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL REJECTED SERVICES
  GetAllRejectedServices: async () => {
    const response = await Services.find({ status: "REJECTED", isDeleted: false })
      .then((AllRejectedServices) => {
        return AllRejectedServices.length ? { message: "Got all the apporved services.", messageType: "success", AllRejectedServices } : { message: "The data for approved services doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET ALL SERVICERS OF SINGLE SERVICE PROVIDER
  GetAllServicesOfUser: async (id) => {
    const response = await Services.find({ serviceProvider: id, isDeleted: false })
      .then((AllServices) => {
        return AllServices.length ? { message: "Got all the services of specific user.", messageType: "success", AllServices } : { message: "The data you're looking for doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // GET FILTERED SERVICES
  GetFilteredServices: async (x) => {
    const response = await Services.find({ ...x, status: "APPROVED", isDeleted: false })
      .then((AllFilteredServices) => {
        return AllFilteredServices.length ? { message: "Got all the services against the filter.", messageType: "success", AllFilteredServices } : { message: "The data for services against these filters doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // UPDATE SINGLE SERVICE
  UpdateSingleService: async (id, x) => {
    const response = await Services.findByIdAndUpdate(id, {
      title: x.title,
      description: x.description,
      status: x.status,
      category: x.category,
      subCatergory: x.subCatergory
    }, { new: true })
      .then((service) => {
        return service ? { message: "Updates saved successfully.", messageType: "success" } : { message: "The service you want to update doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE SERVICE - DELETE SOFT
  DeletSingleServiceSoft: async (id) => {
    const response = await Services.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((service) => {
        return service ? { message: "Service deleted successfully.", messageType: "success" } : { message: "The service you want to delete doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  },

  // DELETE SINGLE SERVICE - DELETE PERMANENTS
  DeletSingleServicePermanent: async (id) => {
    const response = await Services.findByIdAndDelete(id)
      .then((service) => {
        return service ? { message: "Service deleted permanently.", messageType: "success" } : { message: "The service you want to delete doesn't exist.", messageType: "error" };
      })
      .catch(error => error);
    return response;
  }
}

export default Controllers;