import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import mongoose from "mongoose";
import morgan from "morgan";
import cors from 'cors'
import helmet from "helmet";
import userRegister from './/Routes/auth.js'
import userLogin from './/Routes/auth.js'
import getAllUsers from './/Routes/auth.js'
import adminDashbaord from './/Routes/admin.js'
import transaction from './/Routes/transactions.js'
import getTransaction from './/Routes/transactions.js'
import updateTransaction from './/Routes/transactions.js'
import deleteTransaction from './/Routes/transactions.js'
import getMonthlySummary from './/Routes/transactions.js'
import uploadFile from './/Routes/upload.js'


import {notfound} from './middlewares/notfound.js'
import { errorHandler } from "./middlewares/errorHandler.js";
import { limiter } from "./middlewares/rateLimiter.js";
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5000']
}))
app.use(limiter)
app.use(helmet())
// middlewares
app.use('/api/auth', userRegister )
app.use('/api/auth', userLogin )
app.use('/api/auth', getAllUsers )
app.use('/api/admin', adminDashbaord )
app.use('/api/transaction', transaction )
app.use('/api/transaction', getTransaction )
app.use('/api/transaction', updateTransaction )
app.use('/api/transaction', deleteTransaction )
app.use('/api/transaction', getMonthlySummary )
app.use('/api/upload', uploadFile )

app.get("/", (req, res) => {
  res.send("hello world this page test page");
});

app.use(notfound)
app.use(errorHandler)

if(process.env.NODE_ENV == "development") {
  app.use(morgan('dev'))
}

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
