import express from "express";
import { createTransaction, deleteTransaction, getTransaction, getMonthlySummary, updateTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', protect, createTransaction)
router.get('/', protect, getTransaction)
router.get('/summary', protect, getMonthlySummary)
router.put('/:id', protect, updateTransaction )
router.delete('/:id', protect, deleteTransaction )

export default router;
