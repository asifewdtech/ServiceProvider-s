// REQUIRED STUFF
import { Router } from "express";
import { v4 as uuid } from "uuid";
import Controllers from "../../../Controllers/Private/ServicesControllers/ServicesControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW SERVICE
router.post("/services/create", TokenValidator, async (req, res) => {
  try {
    const file = req.files.serviceImg;
    const fileExtension = file.name.split(".").pop();
    const filename = `${uuid()}.${fileExtension}`;

    await file.mv(`./Uploads/Services/${filename}`, (error) => {
      return error ? res.send({ message: "Couldn't upload the image.", messageType: "error" }) : null;
    });

    const data = await Controllers.CreateNewService(req.body, filename);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL SERVICES
router.get("/services", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllServices();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE SERVICE WITH DETAILS
router.get("/services:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleServiceWithDetails(req.params.id);
    return data ? res.send(data) : res.send(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// GET ALL SERVICES OF SINGLE SERVICE PROVIDER
router.get("/services/userId/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllServicesOfUser(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL FILTERED SERVICES
router.post("/services/filtered", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetFilteredServices(req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL APPROVED SERVICES
router.get("/services/approved", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllApprovedServices();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL PENDING SERVICES
router.get("/services/pending", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllPendingServices();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL REJECTED SERVICES
router.get("/services/rejected", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllRejectedServices();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE SERVICE
router.put("/services/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleService(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE SERVICE - DELETE SOFT
router.delete("/services/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeletSingleServiceSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGEL SERVICE - DELETE PERMANENT
router.delete("/services/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeletSingleServicePermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;