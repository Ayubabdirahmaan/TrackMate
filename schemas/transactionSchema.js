import {z} from 'zod'

export const TrasnactionValidationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    amount: z.string().min(1, 'Amont is required'),
    type: z.enum(['income', 'expense']).optional(),
    category: z.string().min(1, 'Category is required')
})