import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando configuración de la base de datos...')

  // Crear categorías iniciales
  const categories = [
    {
      name: 'Entrenamiento de Fuerza',
      description: 'Programas enfocados en el desarrollo de fuerza muscular'
    },
    {
      name: 'Pérdida de Peso',
      description: 'Programas para quemar grasa y perder peso de forma saludable'
    },
    {
      name: 'Hipertrofia',
      description: 'Programas para ganar masa muscular'
    },
    {
      name: 'Cardio',
      description: 'Programas de entrenamiento cardiovascular'
    },
    {
      name: 'Nutrición',
      description: 'Planes de alimentación y suplementación'
    }
  ]

  console.log('📝 Creando categorías...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  // Crear usuario administrador
  console.log('👨‍💼 Creando usuario administrador...')
  await prisma.user.upsert({
    where: { email: 'frank@duqueperformance.com' },
    update: {},
    create: {
      name: 'Frank Duque',
      email: 'frank@duqueperformance.com',
      password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu8.m', // password: admin123
      role: 'ADMIN'
    }
  })

  // Crear algunos programas de ejemplo
  console.log('💪 Creando programas de ejemplo...')
  const strengthCategory = await prisma.category.findUnique({
    where: { name: 'Entrenamiento de Fuerza' }
  })

  if (strengthCategory) {
    await prisma.program.create({
      data: {
        title: 'Programa Básico de Fuerza',
        description: 'Programa completo de 12 semanas para desarrollar fuerza base. Incluye rutinas progresivas, técnicas de levantamiento y plan de progresión.',
        price: 29900,
        categoryId: strengthCategory.id,
        imageUrl: '/images/strength-program.jpg',
        pdfUrl: '/programs/strength-basic.pdf'
      }
    })
  }

  const weightLossCategory = await prisma.category.findUnique({
    where: { name: 'Pérdida de Peso' }
  })

  if (weightLossCategory) {
    await prisma.program.create({
      data: {
        title: 'Plan de Pérdida de Peso',
        description: 'Programa integral de 8 semanas para perder peso de forma saludable. Combina entrenamiento HIIT, nutrición y seguimiento de progreso.',
        price: 24900,
        categoryId: weightLossCategory.id,
        imageUrl: '/images/weight-loss-program.jpg',
        pdfUrl: '/programs/weight-loss-plan.pdf'
      }
    })
  }

  console.log('✅ Configuración de la base de datos completada!')
  console.log('👤 Usuario administrador creado: frank@duqueperformance.com')
  console.log('🔑 Contraseña: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error durante la configuración:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 