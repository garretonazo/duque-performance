import { useState } from 'react'

export interface GoalSelection {
  goal: string
  sport?: string
  customSport?: string
}

export function useGoalSelector() {
  const [step, setStep] = useState<'intro' | 'goals' | 'sports'>('intro')
  const [selectedGoal, setSelectedGoal] = useState<string>('')
  const [selectedSport, setSelectedSport] = useState<string>('')
  const [customSport, setCustomSport] = useState<string>('')

  const selectGoal = (goalId: string) => {
    setSelectedGoal(goalId)
    if (goalId === 'improve-sport') {
      setStep('sports')
    }
  }

  const selectSport = (sportId: string) => {
    setSelectedSport(sportId)
  }

  const setCustomSportValue = (value: string) => {
    setCustomSport(value)
  }

  const resetSelection = () => {
    setSelectedGoal('')
    setSelectedSport('')
    setCustomSport('')
    setStep('intro')
  }

  const goToGoals = () => {
    setStep('goals')
  }

  const goBackToGoals = () => {
    setStep('goals')
  }

  const getFinalSelection = (): GoalSelection => {
    const selection: GoalSelection = { goal: selectedGoal }
    
    if (selectedGoal === 'improve-sport') {
      selection.sport = selectedSport === 'other' ? customSport : selectedSport
    }
    
    return selection
  }

  return {
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
  }
} 