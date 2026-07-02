import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import mongoose from "mongoose";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world this page test");
});

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
