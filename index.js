import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import authRoutes from "./Routes/auth.js";
import adminDashboard from "./Routes/admin.js";
import transactionRoutes from "./Routes/transactions.js";
import uploadFile from "./Routes/upload.js";
import { notfound } from "./middlewares/notfound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { limiter } from "./middlewares/rateLimiter.js";
import { swaggerSpec } from "./utils/swagger.js";
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5000"],
  }),
);
app.use(limiter);
app.use(helmet());
// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboard);
app.use("/api/transaction", transactionRoutes);
app.use("/api/upload", uploadFile);

app.get("/", (req, res) => {
  res.send("hello world this page test page");
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(notfound);
app.use(errorHandler);

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

const mongooseUri =
  process.env.NODE_ENV == "production"
    ? MONGO_URI_PRO
    : process.env.MONGO_URI_DEV 

mongoose
  .connect(mongooseUri)
  .then(() => console.log("✅ MongoDB connected Successfully"))
  .catch((error) => console.log("❌ Connection err", error));

app.listen(PORT, () => {
  console.log(`server is runing on https://localhost:5000 ${PORT}`);
});
