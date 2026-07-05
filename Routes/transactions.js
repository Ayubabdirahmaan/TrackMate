import express from "express";
import { createTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', protect, createTransaction)

export default router;
