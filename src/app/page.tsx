"use client";
import { useEffect, useRef } from 'react';
import { usePreloader } from '@/hooks/usePreloader';
import Preloader from '@/components/Preloader';
import { gsap } from 'gsap';
import HeroSection from '@/components/HeroSection'
// import EntrenaConDuque from '@/components/EntrenaConDuque'
import StickyFrankSection from '@/components/StickyFrankSection'
import ProgramasSection from '@/components/ProgramasSection'
import ContactCard from '@/components/ContactCard'
import Footer from '@/components/Footer'
import InfiniteScrollText from '@/components/InfiniteScrollText'

// import ScrollAnimationComponent from '@/components/ScrollAnimationComponent'
// import TestimonialsSection from '@/components/TestimonialsSection'

export default function Home() {
  const { isLoading, handlePreloaderComplete } = usePreloader();
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Control inteligente de navegación al refrescar
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      
      // Si hay hash y es un refresh (no navegación intencional)
      if (hash && !sessionStorage.getItem('navigation-intentional')) {
        // Limpiar hash y ir al inicio
        window.history.replaceState(null, '', ' ');
        window.scrollTo(0, 0);
      } else if (hash) {
        // Si hay hash y es navegación intencional, hacer scroll suave
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
      
      // Limpiar la bandera de navegación intencional
      sessionStorage.removeItem('navigation-intentional');
    }
  }, []);

  useEffect(() => {
    // Transición simple cuando el preloader termina
    if (!isLoading && mainContentRef.current) {
      // Fade in simple del contenido principal
      gsap.to(mainContentRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isLoading]);

  console.log('Page rendering, isLoading:', isLoading)

  // Mostrar preloader mientras carga
  if (isLoading) {
    console.log('Showing preloader')
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  console.log('Showing main content')

  return (
    <div ref={mainContentRef} className="responsive-width opacity-0">
      <div className="min-h-screen bg-duque-gray w-full max-w-full">
        <section id="hero">
          <HeroSection />
        </section>
   
        {/* <EntrenaConDuque
          image="/images/duque1.0.4.png"
          alt="Aro Duque"
          title="Entrena con Duque"
          text="Lo mejor que puedes hacer es estar bajo la dirección técnica de especialistas calificados en el Rendimiento Deportivo, de esta manera podrás aprovechar al máximo tu tiempo y conseguir de manera sólida tus objetivos."
        /> */}
        <section id="entrena-con-frank">
          <StickyFrankSection />
        </section>
        <section id="infinite-scroll" className="flex flex-col gap-2 my-8 w-full max-w-full">
          <InfiniteScrollText text="- SPEED - AGILITY - POWER - ENDURANCE - STRENGHT - JUMP - EXPLOSIVITY" />
        </section>
        <section id="programas" className="w-full max-w-full no-overflow">
          <ProgramasSection />
        </section>
        <section id="contacto" className="py-16 px-4 md:px-6 lg:px-12 bg-duque-gray w-full max-w-full no-overflow">
          <ContactCard />
        </section>
      </div>
      <section id="footer">
        <Footer />
      </section>
    </div>
  )
}
