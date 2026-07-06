import express from "express";
import { createTransaction, deleteTransaction, getTransaction, getMonthlySummary, updateTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateZode.js";
import { TrasnactionValidationSchema } from "../schemas/transactionSchema.js";
const router = express.Router();

router.post('/register', validate(TrasnactionValidationSchema), protect, createTransaction)
router.get('/', protect, getTransaction)
router.get('/summary', protect, getMonthlySummary)
router.put('/:id', protect, updateTransaction )
router.delete('/:id', protect, deleteTransaction )

export default router;
