// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/ChatRoomsControllers/ChatRoomsControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE CHAT ROOM
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewChatRoom(req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CHAT ROOMS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllChatRooms();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CHAT ROOMS FOR SERVICE PROVIDER
router.get("/sp/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllChatRoomsOfSP(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CHAT ROOMS FOR COMPANY
router.get("/company/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllChatRoomsOfCOM(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL MESSAGES FOR A CHAT ROOM
router.get("/:id/chat", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllMessagesOfAChat(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE CHAT ROOM
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdatSingleChatRoom(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;