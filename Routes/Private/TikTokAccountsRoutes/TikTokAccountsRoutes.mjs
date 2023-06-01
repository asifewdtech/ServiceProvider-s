// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/TikTokAccountsControllers/TikTokAccountsControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW TIKTOK ACCOUNT
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.AddNewTTAccount(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL TIKTOK ACCOUNTS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllTTAccounts();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE ACCOUNT WITH DETAILS
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleAccountDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL TIKTOK ACCOUNTS OF A PARICULAR USER
router.get("/userId/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllTTAccountsOfUser(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE TIKTOK ACCOUNTS
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleAccount(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE TIKTOK ACCOUNT - SOFT DELETE
router.delete("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleAccountSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE TIKTOK ACCOUNT - PERMANENT DELETE
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSingleAccountPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;