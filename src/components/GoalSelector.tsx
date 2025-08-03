'use client'

import { 
  Scale, 
  Dumbbell, 
  Trophy, 
  Heart, 
  TrendingUp, 
  Edit3,
  ChevronRight,
  X
} from 'lucide-react'
import { useGoalSelector } from '@/hooks/useGoalSelector'

interface Goal {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface Sport {
  id: string
  name: string
}

const goals: Goal[] = [
  {
    id: 'lose-weight',
    title: 'Perder peso',
    description: 'Quemar grasa y alcanzar tu peso ideal',
    icon: <Scale className="w-8 h-8" />
  },
  {
    id: 'gain-muscle',
    title: 'Aumentar masa muscular',
    description: 'Desarrollar fuerza y volumen muscular',
    icon: <Dumbbell className="w-8 h-8" />
  },
  {
    id: 'improve-sport',
    title: 'Mejorar rendimiento en mi deporte',
    description: 'Optimizar tu desempeño deportivo',
    icon: <Trophy className="w-8 h-8" />
  },
  {
    id: 'stay-healthy',
    title: 'Mantenerme saludable',
    description: 'Mejorar tu bienestar general',
    icon: <Heart className="w-8 h-8" />
  },
  {
    id: 'body-recomposition',
    title: 'Perder grasa y aumentar músculo',
    description: 'Transformación corporal completa',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    id: 'custom',
    title: 'Otro objetivo personalizado',
    description: 'Define tu propio objetivo',
    icon: <Edit3 className="w-8 h-8" />
  }
]

const sports: Sport[] = [
  { id: 'football', name: 'Fútbol' },
  { id: 'basketball', name: 'Baloncesto' },
  { id: 'running', name: 'Running/Carrera' },
  { id: 'cycling', name: 'Ciclismo' },
  { id: 'swimming', name: 'Natación' },
  { id: 'tennis', name: 'Tenis' },
  { id: 'crossfit', name: 'CrossFit' },
  { id: 'gymnastics', name: 'Gimnasia' },
  { id: 'martial-arts', name: 'Artes marciales' },
  { id: 'other', name: 'Otro' }
]

export default function GoalSelector() {
  const {
    step,
    selectedGoal,
    selectedSport,
    customSport,
    selectGoal,
    selectSport,
    setCustomSportValue,
    resetSelection,
    goToGoals,
    goBackToGoals,
    getFinalSelection
  } = useGoalSelector()

  const handleCreatePlan = () => {
    const selection = getFinalSelection()
    console.log('Plan personalizado:', selection)
    // Aquí podrías redirigir a una página de resultados o guardar en la base de datos
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-duque-gray-dark relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado */}
        {step === 'intro' && (
          <div className="text-center mb-12">
            <h2 className="font-dharma text-250px sm:text-250px text-duque-red mb-4">
              ELIGE TU PLAN IDEAL
            </h2>
            <p className="font-manrope text-xl text-duque-white mb-8">
              Selecciona lo que quieres lograr y crearemos un plan personalizado para ti
            </p>
            <button
              onClick={goToGoals}
              className="font-manrope bg-duque-red text-duque-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              COMENZAR
            </button>
          </div>
        )}

        {/* Selector de Objetivos */}
        {step === 'goals' && (
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="font-dharma text-4xl text-duque-red mb-4">
                ¿CUÁL ES TU OBJETIVO PRINCIPAL?
              </h3>
            </div>
            
            <button
              onClick={resetSelection}
              className="absolute top-0 right-0 text-duque-white hover:text-duque-red transition-colors p-2"
              title="Volver al inicio"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => selectGoal(goal.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    selectedGoal === goal.id
                      ? 'border-duque-red bg-duque-red/10'
                      : 'border-duque-red/20 bg-duque-gray-light hover:border-duque-red/40'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-duque-red mb-4 flex justify-center">
                      {goal.icon}
                    </div>
                    <h4 className="font-manrope text-lg text-duque-white mb-2">
                      {goal.title}
                    </h4>
                    <p className="font-manrope text-sm text-duque-white/80">
                      {goal.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {selectedGoal && selectedGoal !== 'improve-sport' && (
              <div className="text-center mt-8">
                <button
                  onClick={handleCreatePlan}
                  className="font-manrope bg-duque-red text-duque-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  CREAR MI PLAN PERSONALIZADO
                </button>
              </div>
            )}
          </div>
        )}

        {/* Selector de Deportes */}
        {step === 'sports' && (
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="font-dharma text-4xl text-duque-red mb-4">
                ¿EN QUÉ DEPORTE QUIERES MEJORAR?
              </h3>
            </div>
            
            <button
              onClick={goBackToGoals}
              className="absolute top-0 right-0 text-duque-white hover:text-duque-red transition-colors p-2"
              title="Volver a objetivos"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => selectSport(sport.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    selectedSport === sport.id
                      ? 'border-duque-red bg-duque-red/10'
                      : 'border-duque-red/20 bg-duque-gray-light hover:border-duque-red/40'
                  }`}
                >
                  <span className="font-manrope text-duque-white">
                    {sport.name}
                  </span>
                </button>
              ))}
            </div>

            {selectedSport === 'other' && (
              <div className="mt-6 text-center">
                <input
                  type="text"
                  placeholder="Especifica tu deporte"
                  value={customSport}
                  onChange={(e) => setCustomSportValue(e.target.value)}
                  className="font-manrope w-full max-w-md px-4 py-2 rounded-lg bg-duque-gray-light border border-duque-red/20 text-duque-white placeholder-duque-white/60 focus:border-duque-red focus:outline-none"
                />
              </div>
            )}

            {selectedSport && (
              <div className="text-center mt-8">
                <button
                  onClick={handleCreatePlan}
                  className="font-manrope bg-duque-red text-duque-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  CREAR MI PLAN PERSONALIZADO
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
} 