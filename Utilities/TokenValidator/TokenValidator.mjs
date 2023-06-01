// REQUIRED STUFF
import JWT from "jsonwebtoken";

const TokenValidator = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.send({message: "Token not found.", messageType: "error"});
    }

    // GET ACCESS TOKEN FROM REQUEST HEADERS
    const accessToken = req.headers["authorization"].split(" ")[1];

    // DECODING ACCESS TOKEN
    const decodedAccessToken = JWT.decode(accessToken);

    // IF EXPIRED RETURN WITH RESPONSE
    if(decodedAccessToken.exp * 1000 < Date.now()) {
      return res.send({message: "Your token has been expired. You've to sign in again.", })
    }

    // CALL NEXT MIDDLEWARE - VALID TOKEN
    return next();
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

export default TokenValidator;