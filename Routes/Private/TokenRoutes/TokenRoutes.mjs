// REQUIRED STUFF
import { Router } from "express";
import JWT from "jsonwebtoken";
import TokenGenerator from "../../../Utilities/TokenGenerator/TokenGenerator.mjs";

const router = Router();

// GET REFRESH TOKEN
router.get("/refresh-token", async (req, res) => {
  try {
    // TOKEN NOT FOUND
    if (!req.headers["authorization"]) {
      return res.send({ message: "Token not found.", messageType: "error" });
    }

    // GET ACCESS TOKEN FROM REQUEST HEADERS
    const accessToken = req.headers["authorization"].split(" ")[1];

    // DECODING ACCESS TOKEN
    const decodedAccessToken = JWT.decode(accessToken);

    // IF EXPIRED, SEND REFRESH TOKEN
    if (decodedAccessToken.exp * 1000 < Date.now()) {
      const refreshToken = TokenGenerator(decodedAccessToken.user);
      return res.send({ message: "You've signed in again successfully.", messageType: "success", token: refreshToken });
    }

    // IF TOKEN VALIDATION FAILED SOMEHOW, IT SENDS OLD TOKEN
    return res.send({ message: "You've signed in successfully.", messageType: "success", token: accessToken });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;