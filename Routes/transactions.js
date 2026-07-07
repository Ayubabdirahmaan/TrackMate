import express from "express";
import { createTransaction, deleteTransaction, getTransaction, getMonthlySummary, updateTransaction } from "../controllers/transactionControllers.js";
import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateZode.js";
import { TrasnactionValidationSchema } from "../schemas/transactionSchema.js";
const router = express.Router();
/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/', validate(TrasnactionValidationSchema), protect, createTransaction);
/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions
 */
router.get('/', protect, getTransaction);
/**
 * @swagger
 * /transaction/summary:
 *   get:
 *     summary: Get monthly transaction summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary data
 */
router.get('/summary', protect, getMonthlySummary);
/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/:id', protect, updateTransaction);
/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete('/:id', protect, deleteTransaction);

export default router;
