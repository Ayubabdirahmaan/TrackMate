import express from "express";
import { createTransaction, getTransaction, updateTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', protect, createTransaction)
router.get('/', protect, getTransaction)
router.put('/:id', protect, updateTransaction )

export default router;
