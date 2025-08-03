export interface Program {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string | null
  pdfUrl?: string | null
  categoryId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  category: Category
}

export interface Category {
  id: string
  name: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ProgramWithCategory extends Program {
  category: Category
}

export interface CreateProgramData {
  title: string
  description: string
  price: number
  categoryId: string
  imageUrl?: string
  pdfUrl?: string
}

export interface UpdateProgramData extends Partial<CreateProgramData> {
  isActive?: boolean
} 