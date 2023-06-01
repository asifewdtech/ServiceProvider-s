// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/UsersControllers/UsersControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";
import { v4 as uuid } from "uuid";

const router = Router();

// CREATE NEW USER
router.post("/create", async (req, res) => {
  try {
    const data = await Controllers.CreateNewUser(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL USERS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllUsers();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE USER PROFILE PICTURE
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

    const data = await Controllers.UpdateUserDP(req.params.id, filename);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;