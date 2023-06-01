// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/YouTubeAccountsControllers/YouTubeAccountsControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW YOUTUBE ACCOUNT
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.AddNewYTAccount(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL YOUTUBE ACCOUNTS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllAccounts();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(data);
    return res.send(error);
  }
});

// GET SINGLE YOUTUBE ACCOUNT WITH DETAILS
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleYTAccountDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return error;
  }
});

// GET ALL YOUTUBE ACCOUNTS OF SINGLE USER
router.get("/userId/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllAccountsOfUser(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(data);
    return res.send(error);
  }
});

// UPDATE SINGLE YOUTUBE ACCOUNT
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdatSingleYTAccount(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return error;
  }
});

// DELETE SINGLE YOUTUBE ACCOUNT - SOFT DELETE
router.delete("/:id", TokenValidator, async (req, res) => {
try {
  const data = await Controllers.DeleteSingleYTAccountSoft(req.params.id);
  return data ? res.send(data) : res.send(404);
} catch (error) {
  console.log(error);
  return error;
}
});

// DELETE SINGLE YOUTUBE ACCOUNT - PERMANENT DELETE
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleYTAccountPermanent(req.params.id);
    return data ? res.send(data) : res.send(404);
  } catch (error) {
    console.log(error);
    return error;
  }
});

export default router;