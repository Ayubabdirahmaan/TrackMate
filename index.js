import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import mongoose from "mongoose";
app.use(express.json());
import userRegister from './/Routes/auth.js'
import userLogin from './/Routes/auth.js'

import {notfound} from './middlewares/notfound.js'
import { errorHandler } from "./middlewares/errorHandler.js";

// middlewares
app.use('/api/auth', userRegister )
app.use('/api/auth', userLogin )

app.get("/", (req, res) => {
  res.send("hello world this page test page");
});

app.use(notfound)
app.use(errorHandler)

const mongooseUri =
  process.env.NODE_ENV == "development"
    ? process.env.MONGO_URI_DEV
    : MONGO_URI_PRO;

mongoose
  .connect(mongooseUri)
  .then(() => console.log("✅ MongoDB connected Successfully"))
  .catch((error) => console.log("❌ Connection err", error));

app.listen(PORT, () => {
  console.log(`server is runing on https://localhost:5000 ${PORT}`);
});
