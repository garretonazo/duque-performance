'use client'

interface EntrenaConDuqueProps {
  image: string
  alt?: string
  title: string
  text: string
}

export default function EntrenaConDuque({ image, alt = '', title, text }: EntrenaConDuqueProps) {
  return (
    <section className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 py-8 md:py-12 lg:py-[.4rem] px-4 md:px-6 lg:px-[.4rem] bg-transparent">
      {/* Layout Mobile/Tablet: Vertical */}
      <div className="flex flex-col items-center justify-center w-full lg:hidden">
        {/* Título arriba */}
        <h2 className="font-barlow mb-4 md:mb-6 leading-tight text-white text-center text-3xl md:text-4xl lg:text-5xl">{title}</h2>
        
        {/* Imagen centrada con dimensiones reducidas */}
        <div className="flex-shrink-0 flex justify-center mb-4 md:mb-6">
          <img
            src={image}
            alt={alt}
            className="w-[200px] h-[233px] md:w-[280px] md:h-[327px] object-contain"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        
        {/* Texto abajo */}
        <p className="text-white font-neue-montreal uppercase text-base md:text-lg lg:text-[18px] leading-relaxed text-center max-w-lg">{text}</p>
      </div>

      {/* Layout Desktop: Horizontal */}
      <div className="hidden lg:flex w-full items-center justify-center gap-8">
        {/* Imagen a la izquierda con dimensiones reducidas */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={image}
            alt={alt}
            className="w-[350px] h-[408px] object-contain"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        
        {/* Texto a la derecha */}
        <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
          <h2 className="font-barlow mb-4 leading-tight text-white text-center text-5xl">{title}</h2>
          <p className="text-white font-neue-montreal uppercase text-[18px] leading-relaxed text-center">{text}</p>
        </div>
      </div>
    </section>
  )
} 