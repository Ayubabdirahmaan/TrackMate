import express from "express";
import { uploadFile } from '../controllers/uploadController.js'
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();
/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file field
 */
router.post("/profile-picture", protect, upload.single("file"), uploadFile);

export default router;
