import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email must valid'),
    password: z.string()
    .min(6, 'Password must be least 6 characters')
    .max(100, 'Password must be at most 100 characters')
})