import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente para el frontend (con anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para el backend (con service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Configuración de buckets
export const BUCKETS = {
  PROGRAMS: 'programs',
  IMAGES: 'images',
} as const

// Función para subir archivos
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Buffer,
  contentType?: string
) {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType,
      upsert: true,
    })

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`)
  }

  return data
}

// Función para obtener URL pública
export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// Función para eliminar archivos
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`)
  }
} 