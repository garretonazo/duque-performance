'use client';

import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return;

    // Función del contador simple
    function startLoader() {
      const counterElement = counterRef.current;
      if (!counterElement) return;

      let currentValue = 1;

      function updateCounter() {
        if (currentValue >= 100) {
          // Simplemente completar sin animación
          setIsLoading(false);
          onComplete();
          return;
        }

        // Incremento simple
        const increment = Math.max(2, Math.floor((100 - currentValue) / 8));
        currentValue += increment;
        currentValue = Math.min(currentValue, 100);

        if (counterElement) {
          counterElement.textContent = currentValue.toString();
        }
        
        // Timing más lento
        const delay = 80 + (Math.random() * 60);
        setTimeout(updateCounter, delay);
      }

      updateCounter();
    }

    // Iniciar contador
    startLoader();
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="preloader fixed inset-0 z-50 bg-duque-gray">
      {/* Contador */}
      <h1 
        ref={counterRef}
        className="counter text-[#DAFF02] font-barlow font-bold absolute bottom-8 right-8 text-[200px] leading-none"
      >
        1
      </h1>
    </div>
  );
}