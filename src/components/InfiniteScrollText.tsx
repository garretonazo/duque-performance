"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import styles from './InfiniteScrollText.module.css';

interface InfiniteScrollTextProps {
  text: string;
}

export default function InfiniteScrollText({ text }: InfiniteScrollTextProps) {
  const slider = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación base continua (CSS se encarga de esto)
    // GSAP solo controla la velocidad adicional durante el scroll
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.25,
      }
    });

    // Añadir velocidad extra durante el scroll
    tl.to(slider.current, {
      x: '-25%',
      duration: 1,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={container} className={styles.main}>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p className="font-barlow font-extrabold leading-tight whitespace-nowrap">{text}</p>
          <p className="font-barlow font-extrabold leading-tight whitespace-nowrap">{text}</p>
          <p className="font-barlow font-extrabold leading-tight whitespace-nowrap">{text}</p>
        </div>
      </div>
    </main>
  );
} 