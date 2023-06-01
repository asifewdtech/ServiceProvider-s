// REQUIRED STUFF
import { Router } from "express";
import { v4 as uuid } from "uuid";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";
import Controllers from "../../../Controllers/Private/ServiceProvidersControllers/ServiceProvidersControllers.mjs";

const router = Router();

// CREATE NEW SERVICE PROVIDER
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewSP(req.body);
    return data ? res.send(data) : res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL SERVICE PROVIDERS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllSP();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE SERVICE PROVIDER WITH DETAILS
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleSPWihtDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE SERVICE PROVIDER
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleSP(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE PROFILE PICTURE
router.put("/:id/profile", TokenValidator, async (req, res) => {
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

// DELETE SINGLE SERVICE PROVIDER - DELETE SOFT
router.delete("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleSPSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE SERVICE PROVIDER - DELETE PERMANENT
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleSPDeletePermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;