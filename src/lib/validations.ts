import { z } from 'zod'

// Auth validations
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Program validations
export const createProgramSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().positive('El precio debe ser positivo'),
  categoryId: z.string().min(1, 'Debe seleccionar una categoría'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  pdfUrl: z.string().url().optional().or(z.literal('')),
})

export const updateProgramSchema = createProgramSchema.partial().extend({
  isActive: z.boolean().optional(),
})

// Purchase validations
export const createPurchaseSchema = z.object({
  programId: z.string().min(1, 'Debe seleccionar un programa'),
  amount: z.number().positive('El monto debe ser positivo'),
})

// Category validations
export const createCategorySchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
})

// Search and filter validations
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sortBy: z.enum(['title', 'price', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type CreateProgramData = z.infer<typeof createProgramSchema>
export type UpdateProgramData = z.infer<typeof updateProgramSchema>
export type CreatePurchaseData = z.infer<typeof createPurchaseSchema>
export type CreateCategoryData = z.infer<typeof createCategorySchema>
export type SearchFilters = z.infer<typeof searchSchema> 