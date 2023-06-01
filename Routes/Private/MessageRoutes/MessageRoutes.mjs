// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/MessagesControllers/MessagesControllers.mjs";
import TokenGenerator from "../../../Utilities/TokenGenerator/TokenGenerator.mjs";

const router = Router();

// CREATE NEW MESSAGE
router.post("/create", TokenGenerator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewMessage(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;