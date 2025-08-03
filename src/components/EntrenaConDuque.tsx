'use client'

interface EntrenaConDuqueProps {
  image: string
  alt?: string
  title: string
  text: string
}

export default function EntrenaConDuque({ image, alt = '', title, text }: EntrenaConDuqueProps) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Imagen a la izquierda */}
      <div className="flex-shrink-0 w-full md:w-[400px] flex justify-center">
        <img
          src={image}
          alt={alt}
          className="w-full h-auto"
        />
      </div>
      {/* Texto a la derecha */}
      <div className="flex-1 max-w-xl">
        <h2 className="font-barlow text-black mb-4 leading-tight">{title}</h2>
        <p className="font-manrope text-[18px] text-black">{text}</p>
      </div>
    </section>
  )
} 