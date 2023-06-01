// REQUIRED SUTFF
import { Router } from "express";
import { v4 as uuid } from "uuid";
import Controllers from "../../../Controllers/Private/CompaniesControllers/CompaniesControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW COMPANY
router.post("/companies/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewCompany(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL COMPANIES
router.get("/companies", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllCompanies();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL APPROVED COMPANIES
router.get("/companies/approved", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllApprovedCompanies();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL PENDING COMPANIES
router.get("/companies/pending", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllPendingCompanies();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL REJECTED COMPANIES
router.get("/companies/rejected", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllRejectedCompanies();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE COMPANY WITH DETAILS
router.get("/companies/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleCompanyWithDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE COMPANY
router.put("/companies/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleCompany(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE PROFILE PICTURE
router.put("/companies/:id/profile", TokenValidator, async (req, res) => {
  try {
    const file = req.files.avatar;
    const fileExtension = file.name.split('.').pop();
    const filename = `${uuid()}.${fileExtension}`;
    // SAVING IMAGE AS PROFILE
    await file.mv(`./Uploads/Profile/${filename}`, (err) => {
      if (err) {
        console.error(err);
        return res.send({ message: "Couldn't upload the image.", messageType: "error" });
      }
    });

    const data = await Controllers.UpdateSingleProfile(req.params.id, filename);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE COMPANY - DELETE SOFT
router.delete("/companies/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleCompanySoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE COMPANY - DELETE PERMANENT
router.delete("/companies/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleCompanyPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;