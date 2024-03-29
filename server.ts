import express, { Request, Response } from "express";
import { envVariables } from "./src/zodFolder/envVariables";
import { movieRouter } from "./src/routes/movies";
import { userRouter } from "./src/routes/user";
import { reviewRouter } from "./src/routes/review";
const {
  PORT,
  NODE_ENV,
  MONGOOSE_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_APIKEY,
  CLOUDINARY_APISECRET,
} = envVariables;
import mongoose from "mongoose";

mongoose.connect(MONGOOSE_URL);

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_APIKEY,
  api_secret: CLOUDINARY_APISECRET,
});

const app = express();

app.use(express.json()).use(movieRouter).use(userRouter).use(reviewRouter);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "bienvenue sur film" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry, the application is temporary disabled" });
  }
});

app.listen(PORT, () => {
  console.log(`server has started in port ${PORT} in ${NODE_ENV} mode  `);
});
