import express from "express"; //import express so we can start setting up web server with routing and better ssr and api integration
import mongoose from "mongoose"; //import the database
import dotenv from "dotenv"; // imported so we can use .env file to safley store mongo token
import userRouter from "./routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((error) => console.log(error)); //chain promises to see if db is connected

const app = express();
//installed nodemon so server updates by itselft
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//create api route, req is wat is sent from font end, res is resp from backend
app.use("/api/user", userRouter);
