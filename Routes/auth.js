import express from 'express'
import { getAllUsers, login, register } from '../controllers/auth.js'
import { validate } from '../middlewares/validateZode.js'
import { createUserSchema } from '../schemas/userSchemas.js'
const router = express.Router()

router.post('/register', validate(createUserSchema), register)
router.post('/login', login)
router.post('/getAllUsers', getAllUsers)

export default router