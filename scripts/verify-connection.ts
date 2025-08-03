import { PrismaClient } from '../src/generated/prisma'
import { supabaseAdmin } from '../src/lib/supabase'

const prisma = new PrismaClient()

async function verifyConnection() {
  console.log('🔍 Verificando conexión a Supabase...')

  try {
    // Verificar conexión a la base de datos
    console.log('📊 Verificando conexión a la base de datos...')
    await prisma.$connect()
    console.log('✅ Conexión a la base de datos exitosa')

    // Verificar tablas
    console.log('📋 Verificando tablas...')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('📊 Tablas encontradas:', tables)

    // Verificar conexión a Supabase Storage
    console.log('🗄️ Verificando conexión a Supabase Storage...')
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error al listar buckets:', bucketsError.message)
    } else {
      console.log('✅ Conexión a Supabase Storage exitosa')
      console.log('📦 Buckets encontrados:', buckets.map(b => b.name))
    }

    // Verificar variables de entorno
    console.log('🔧 Verificando variables de entorno...')
    const requiredEnvVars = [
      'DATABASE_URL',
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ]

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`❌ Variable de entorno faltante: ${envVar}`)
      } else {
        console.log(`✅ ${envVar}: Configurada`)
      }
    }

    // Verificar datos iniciales
    console.log('📝 Verificando datos iniciales...')
    const userCount = await prisma.user.count()
    const categoryCount = await prisma.category.count()
    const programCount = await prisma.program.count()

    console.log(`👥 Usuarios: ${userCount}`)
    console.log(`📂 Categorías: ${categoryCount}`)
    console.log(`💪 Programas: ${programCount}`)

    if (userCount === 0) {
      console.log('⚠️  No hay usuarios. Ejecuta: npm run db:setup')
    }

    if (categoryCount === 0) {
      console.log('⚠️  No hay categorías. Ejecuta: npm run db:setup')
    }

    console.log('🎉 Verificación completada exitosamente!')

  } catch (error) {
    console.error('❌ Error durante la verificación:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

verifyConnection() 