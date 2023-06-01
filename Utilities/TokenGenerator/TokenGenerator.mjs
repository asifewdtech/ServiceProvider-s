import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const privateKey = process.env.JWT_KEY;

const TokenGenerator = (user) => {
  return JWT.sign({ user }, JSON.stringify(privateKey), { expiresIn: "1h" });
}

export default TokenGenerator;