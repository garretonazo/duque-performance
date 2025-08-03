import { useState } from 'react'

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return {
    isLoading,
    handlePreloaderComplete
  }
} 