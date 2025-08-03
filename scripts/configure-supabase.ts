import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { PrismaClient } from '../src/generated/prisma'
import { supabaseAdmin } from '../src/lib/supabase'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function configureSupabase() {
  console.log('🚀 Configuración de Supabase para Duque Performance')
  console.log('=' .repeat(50))

  try {
    // Verificar conexión a Supabase
    console.log('🔍 Verificando conexión a Supabase...')
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error al conectar con Supabase:', bucketsError.message)
      console.log('\n📋 Para solucionar esto:')
      console.log('1. Ve a tu dashboard de Supabase')
      console.log('2. Ve a Settings > API')
      console.log('3. Copia la "service_role" key')
      console.log('4. Agrega SUPABASE_SERVICE_ROLE_KEY=tu-key-aqui a tu .env.local')
      return
    }

    console.log('✅ Conexión a Supabase exitosa!')
    console.log('📦 Buckets encontrados:', buckets.map(b => b.name))

    // Verificar si existen los buckets necesarios
    const requiredBuckets = ['programs', 'images']
    const existingBuckets = buckets.map(b => b.name)
    
    for (const bucketName of requiredBuckets) {
      if (!existingBuckets.includes(bucketName)) {
        console.log(`⚠️  Bucket "${bucketName}" no encontrado`)
        console.log(`📋 Para crear el bucket "${bucketName}":`)
        console.log(`1. Ve a Storage en tu dashboard de Supabase`)
        console.log(`2. Haz clic en "New bucket"`)
        console.log(`3. Nombre: ${bucketName}`)
        console.log(`4. Public bucket: ${bucketName === 'images' ? 'Sí' : 'No'}`)
        console.log(`5. File size limit: ${bucketName === 'programs' ? '50MB' : '10MB'}`)
      } else {
        console.log(`✅ Bucket "${bucketName}" encontrado`)
      }
    }

    // Verificar variables de entorno
    console.log('\n🔧 Verificando variables de entorno...')
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'DATABASE_URL'
    ]

    const missingVars = []
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missingVars.push(envVar)
        console.error(`❌ ${envVar}: Faltante`)
      } else {
        console.log(`✅ ${envVar}: Configurada`)
      }
    }

    if (missingVars.length > 0) {
      console.log('\n📋 Variables faltantes:')
      console.log('Para obtener DATABASE_URL:')
      console.log('1. Ve a Settings > Database en Supabase')
      console.log('2. Copia la "Connection string" (URI)')
      console.log('3. Reemplaza [YOUR-PASSWORD] con tu contraseña de base de datos')
      console.log('4. Agrega DATABASE_URL=tu-connection-string a tu .env.local')
      
      console.log('\nPara obtener SUPABASE_SERVICE_ROLE_KEY:')
      console.log('1. Ve a Settings > API en Supabase')
      console.log('2. Copia la "service_role" key')
      console.log('3. Agrega SUPABASE_SERVICE_ROLE_KEY=tu-key-aqui a tu .env.local')
      
      return
    }

    // Intentar conectar a la base de datos
    console.log('\n📊 Verificando conexión a la base de datos...')
    try {
      await prisma.$connect()
      console.log('✅ Conexión a la base de datos exitosa!')

      // Verificar tablas usando una consulta más simple
      try {
        await prisma.$queryRaw`SELECT 1 as test`
        console.log('✅ Consulta SQL básica exitosa')
        
        // Intentar listar tablas de manera más segura
        const tableCount = await prisma.$queryRaw`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
        `
        console.log('📋 Número de tablas en la base de datos:', tableCount)
        
        // Si hay tablas, listarlas
        if (tableCount && Array.isArray(tableCount) && tableCount[0] && (tableCount[0] as { count: number }).count > 0) {
          const tableNames = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
          `
          console.log('📋 Tablas encontradas:', (tableNames as Array<{ table_name: string }>).map(t => t.table_name))
        } else {
          console.log('📋 No hay tablas en la base de datos (esto es normal si es la primera vez)')
        }
      } catch {
        console.log('⚠️  No se pudieron listar las tablas, pero la conexión funciona')
        console.log('   Esto puede ser normal si la base de datos está vacía o hay restricciones de permisos')
      }

      // Preguntar si quiere configurar la base de datos
      const setupDB = await question('\n¿Quieres configurar la base de datos con datos iniciales? (y/n): ')
      
      if (setupDB.toLowerCase() === 'y' || setupDB.toLowerCase() === 'yes') {
        console.log('🚀 Ejecutando configuración de base de datos...')
        // Aquí podrías ejecutar el script de setup
        console.log('✅ Ejecuta: npm run db:setup')
      }

    } catch (dbError) {
      console.error('❌ Error al conectar con la base de datos:', dbError)
      console.log('\n📋 Para solucionar esto:')
      console.log('1. Verifica que DATABASE_URL esté correctamente configurada')
      console.log('2. Asegúrate de que la contraseña en la URL sea correcta')
      console.log('3. Verifica que el proyecto de Supabase esté activo')
    }

    console.log('\n🎉 Verificación completada!')
    console.log('\n📋 Próximos pasos:')
    console.log('1. Configura los buckets de storage si no existen')
    console.log('2. Ejecuta: npm run db:generate')
    console.log('3. Ejecuta: npm run db:push')
    console.log('4. Ejecuta: npm run db:setup')
    console.log('5. Ejecuta: npm run dev')

  } catch (error) {
    console.error('❌ Error durante la configuración:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

configureSupabase() 