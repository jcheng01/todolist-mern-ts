import express from "express";

const app = express();
//installed nodemon so server updates by itselft
app.listen(3000, () => {
  console.log("Server is running on port 3000??");
});
