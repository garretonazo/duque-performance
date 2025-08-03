"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import EntrenaConDuque from "./EntrenaConDuque";
import EntrenaConFrank2 from "./EntrenaConFrank2";

gsap.registerPlugin(ScrollTrigger);

export default function StickyFrankSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frank1Ref = useRef<HTMLDivElement>(null);
  const frank2Ref = useRef<HTMLDivElement>(null);
  const frank3Ref = useRef<HTMLDivElement>(null);
  const frank4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin toda la sección durante el scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200vh", // Aumentado para 4 componentes
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Timeline para controlar la transición entre componentes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200vh", // Requiere más scroll para 4 componentes
          scrub: 2,
        }
      });

      // Transiciones para los 4 componentes
      // Componente 1 -> Componente 2
      tl.to(frank1Ref.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut"
      })
      .to(frank2Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut"
      }, 1)
      
      // Componente 2 -> Componente 3
      .to(frank2Ref.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut"
      }, 3)
      .to(frank3Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut"
      }, 4)
      
      // Componente 3 -> Componente 4
      .to(frank3Ref.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut"
      }, 6)
      .to(frank4Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut"
      }, 7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ 
        height: "100vh",
        overflow: "hidden"
      }}
    >
      {/* Primer componente */}
      <div
        ref={frank1Ref}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 4,
          opacity: 1,
        }}
      >
        <EntrenaConDuque
          image="/images/duque1.0.9.png"
          alt="Frank Duque"
          title="Entrena con DUQUE"
          text="En DUQUE PERFORMANCE sabemos que cada deportista es único y por ende el rendimiento de sus capacidades físicas es variable, debido a esto los programas de entrenamiento están diseñados específicamente en potenciar las fortalezas y superar las debilidades de cada atleta."
        />
      </div>

      {/* Segundo componente */}
      <div
        ref={frank2Ref}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 3,
          opacity: 0,
        }}
      >
        <EntrenaConFrank2
          image="/images/duque1.0.7.png"
          alt="Frank Duque"
          title="COMPROMISO"
          text="Cuando te unes a DUQUE PERFORMANCE no solo obtienes un programa de entrenamiento excepcional, si no que también te unes a un compromiso con nuestro equipo de trabajo el cual estará para ayudarte en todo momento de tu proceso."
        />
      </div>

      {/* Tercer componente - Fondo #F3F0EB, texto #201E1F */}
      <div
        ref={frank3Ref}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 2,
          opacity: 0,
        }}
      >
        <section className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 py-8 md:py-12 lg:py-[.4rem] px-4 md:px-6 lg:px-[.4rem]" style={{ background: '#F3F0EB' }}>
          {/* Layout Mobile/Tablet: Vertical */}
          <div className="flex flex-col items-center justify-center w-full lg:hidden">
            {/* Título arriba */}
            <h2 className="font-barlow mb-4 md:mb-6 leading-tight text-center text-3xl md:text-4xl lg:text-5xl" style={{ color: '#201E1F' }}>EXPERIENCIA</h2>
            
            {/* Imagen centrada con dimensiones reducidas */}
            <div className="flex-shrink-0 flex justify-center mb-4 md:mb-6">
              <img
                src="/images/duque1.0.4.png"
                alt="Frank Duque"
                className="w-[200px] h-[233px] md:w-[280px] md:h-[327px] object-contain"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            
            {/* Texto abajo */}
            <p className="font-neue-montreal uppercase text-base md:text-lg lg:text-[18px] leading-relaxed text-center max-w-lg" style={{ color: '#201E1F' }}>
              Frank Duque, Profesor de Educación Física, especializado en Rendimiento Deportivo y exjugador profesional de Baloncesto, con más de una década de experiencia entrenando atletas de élite y amateur.
            </p>
          </div>

          {/* Layout Desktop: Horizontal */}
          <div className="hidden lg:flex w-full items-center justify-center gap-8">
            {/* Imagen a la izquierda con dimensiones reducidas */}
            <div className="flex-shrink-0 flex justify-center">
              <img
                src="/images/duque1.0.4.png"
                alt="Frank Duque"
                className="w-[350px] h-[408px] object-contain"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            
            {/* Texto a la derecha */}
            <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
              <h2 className="font-barlow mb-4 leading-tight text-center text-5xl" style={{ color: '#201E1F' }}>EXPERIENCIA</h2>
              <p className="font-neue-montreal uppercase text-[18px] leading-relaxed text-center" style={{ color: '#201E1F' }}>
                Frank Duque, Profesor de Educación Física egresado de la Universidad pedagogica UPEL y exjugador profesional de Baloncesto, especialista en entrenamiento de la fuerza y acondicionamiento fisico CSCS-NSCA con más de una década de experiencia entrenando atletas de élite y amateur.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Cuarto componente - Fondo #201E1F, texto #DAFF02 */}
      <div
        ref={frank4Ref}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 1,
          opacity: 0,
        }}
      >
        <section className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 py-8 md:py-12 lg:py-[.4rem] px-4 md:px-6 lg:px-[.4rem]" style={{ background: '#201E1F' }}>
          {/* Layout Mobile/Tablet: Vertical */}
          <div className="flex flex-col items-center justify-center w-full lg:hidden">
            {/* Título arriba */}
            <h2 className="font-barlow mb-4 md:mb-6 leading-tight text-center text-3xl md:text-4xl lg:text-5xl" style={{ color: '#DAFF02' }}>RESULTADOS</h2>
            
            {/* Imagen centrada con dimensiones reducidas */}
            <div className="flex-shrink-0 flex justify-center mb-4 md:mb-6">
              <img
                src="/images/duque1.0.8.png"
                alt="Frank Duque"
                className="w-[200px] h-[233px] md:w-[280px] md:h-[327px] object-contain"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            
            {/* Texto abajo */}
            <p className="font-neue-montreal uppercase text-base md:text-lg lg:text-[18px] leading-relaxed text-center max-w-lg" style={{ color: '#DAFF02' }}>
              Al comprometerte con tu programa, luego de la etapa de adaptación comenzaras a notar avances de tu proceso, los cuales te generan un flujo de motivación y la fuerza para continuar en el camino y obtener el objetivo deseado.
            </p>
          </div>

          {/* Layout Desktop: Horizontal */}
          <div className="hidden lg:flex w-full items-center justify-center gap-8">
            {/* Imagen a la izquierda con dimensiones reducidas */}
            <div className="flex-shrink-0 flex justify-center">
              <img
                src="/images/duque1.0.8.png"
                alt="Frank Duque"
                className="w-[350px] h-[408px] object-contain"
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            
            {/* Texto a la derecha */}
            <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
              <h2 className="font-barlow mb-4 leading-tight text-center text-5xl" style={{ color: '#DAFF02' }}>RESULTADOS</h2>
              <p className="font-neue-montreal uppercase text-[18px] leading-relaxed text-center" style={{ color: '#DAFF02' }}>
              Al comprometerte con tu programa, luego de la etapa de adaptación comenzaras a notar avances de tu proceso, los cuales te generan un flujo de motivación y la fuerza para conbtinuar en el camino y obtener el objetivo deseado.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}