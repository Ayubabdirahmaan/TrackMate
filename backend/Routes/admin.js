import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json(`Welcome to the admin dashboard, ${req.user.name}`);
});

export default router;
