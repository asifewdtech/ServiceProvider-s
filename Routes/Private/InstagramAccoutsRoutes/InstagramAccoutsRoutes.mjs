// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/InstagramAccountsControllers/InstagramAccountsControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW INSTAGRAM ACCOUNT
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.AddNewIGAccount(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL INSTAGRAM ACCOUNTS
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllIGAccounts();
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE INSTAGRAM ACCOUNT WITH DETAILS
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleIGAccountWithDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// GET ALL INSTAGRAM ACCOUNTS OF A PARTICULAR USER
router.get("/userId/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllIGAccountsOfUser(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE INSTAGRAM ACCOUNT
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleIGAccount(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE INSTAGRAM ACCOUNT - DELETE SOFT
router.delete("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteIGAccountSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE INSTAGRAM ACCOUNT - DELETE PERMANENT
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteIGAccountPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;