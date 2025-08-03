"use client"

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="h-screen w-full bg-duque-gray p-[.4rem]">
      <div className="relative h-full w-full rounded-[0.8rem] overflow-hidden">
        <Image
          src="/images/herophoto.png" // Asegúrate de que esta imagen exista
          alt="Duque Performance background"
          fill
          className="object-cover object-top"
          priority
        />
        
        <div className="absolute bg-black/40" />

        <div className="absolute top-0 left-0 z-10 p-8">
          <h1 className="font-barlow text-duque-white text-left leading-none">
            DUQUE
            <br />
            PERFORMANCE
          </h1>
        </div>
      </div>
    </section>
  )
} 