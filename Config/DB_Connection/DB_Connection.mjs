// REQUIRED STUFF
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_LOCAL).then(() => {
  console.log("Database is attached.");
})
.catch((error) =>{
  console.log(error, "DB_ERROR");
});