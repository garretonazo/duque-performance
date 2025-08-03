import { User, UserRole } from '../generated/prisma'

export type UserWithoutPassword = Omit<User, 'password'>

export interface SessionUser {
  id: string
  name: string | null
  email: string
  image: string | null
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
} 