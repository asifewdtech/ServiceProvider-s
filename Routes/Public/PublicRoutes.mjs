// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../Controllers/Public/PublicControllers.mjs";

const router = Router();
/* ---- ADMIN ROUTES ---- */

// REGISTER USER
router.post("/sign-up/admin", async (req, res) => {
  try {
    const data = await Controllers.SingUp_Admin(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// SIGN IN USER
router.post("/sign-in/admin", async (req, res) => {
  try {
    const data = await Controllers.SignIn_Admin(req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// FORGOT PASSWORD
router.post("/forgot-password/admin", async (req, res) => {
  try {
    const data = await Controllers.ForgotPassword_Admin(req.body);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

/* ---- SERVICE PROVIDER ROUTES ---- */
// REGISTER USER
router.post("/sign-up/sp", async (req, res) => {
  try {
    const data = await Controllers.SingUp_SP(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// SIGN IN USER
router.post("/sign-in/sp", async (req, res) => {
  try {
    const data = await Controllers.SignIn_SP(req.body);
    return data ? res.send(data) : res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// FORGOT PASSWORD
router.post("/forgot-password/sp", async (req, res) => {
  try {
    const data = await Controllers.ForgotPassword_SP(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

/* ---- COMPANY ROUTES ---- */
// REGISTER USER
router.post("/sign-up/company", async (req, res) => {
  try {
    const data = await Controllers.SignUp_Company(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// SIGN IN USER - COMPANY
router.post("/sign-in/company", async (req, res) => {
  try {
    const data = await Controllers.SignIn_Company(req.body);
    return data ? res.send(data) : res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// FORGOT PASSWORD - COMPANY
router.post("/forgot-password/company", async (req, res) => {
  try {
    const data = await Controllers.ForgotPassword_Company(req.body);
    return data ? res.send(data) : res.send(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// TEST ENDPOINT
router.get("/test", async (req, res) => {
  try {
    return res.send({ message: "This is a test message.", messageType: "success" });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;