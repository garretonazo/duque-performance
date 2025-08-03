"use client"

import Image from 'next/image'
import StickyNavbar from '@/components/StickyNavbar'

export default function HeroSection() {
  return (
    <section className="h-screen w-full bg-duque-gray p-[.4rem]">
      <div className="relative h-full w-full rounded-[0.8rem] overflow-hidden">
        <StickyNavbar />
        <Image
          src="/images/herophoto.png"
          alt="Duque Performance background"
          fill
          className="object-cover object-top"
          priority
        />
        
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 53%, var(--duque-light-grey) 100%, var(--duque-light-grey) 100%)'
          }}
        />

        <div className="absolute top-0 left-0 z-30 p-8 hidden lg:block">
          <h1 className="font-barlow text-white text-left leading-[36px]">
            DUQUE
            <br />
            PERFORMANCE
          </h1>
        </div>

        <div className="absolute left-0 bottom-0 z-30 p-8 pb-10">
          <p className="text-white font-neue-montreal uppercase text-base md:text-lg max-w-xs drop-shadow-lg">
          Únete a la comunidad de más de 250 atletas de élite y amateur que cumplen sus objetivos con nuestro método.
          </p>
        </div>

        <div className="absolute inset-0 z-40 pointer-events-none">
          <Image
            src="/images/herophotonobg.png"
            alt="Frank Duque recortado"
            fill
            className="object-cover object-top"
            priority
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
} 