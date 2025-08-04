import { ArrowRight } from 'lucide-react'

function ContactCard() {
  return (
    <div className="w-full max-w-full mx-auto p-4 md:p-6 lg:p-8 bg-[#DAFF02] hover:bg-[#F3F0EB] rounded-lg md:rounded-[32px] flex items-center transition-all duration-300 overflow-hidden">
      <a
        href="https://wa.me/56961530977?text=Hola%20Frank!%20Tengo%20dudas%20sobre%20los%20programas%20de%20entrenamiento.%20¿Podrías%20ayudarme?"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full rounded-xl relative"
      >
        <div className="flex flex-col flex-1 gap-4 md:gap-6 lg:gap-8 min-w-0">
          <h2
            className="text-4xl md:text-6xl lg:text-[120px] xl:text-[180px] font-normal uppercase leading-[0.9] tracking-[-0.04em] font-neue-montreal-bold m-0 text-black text-left break-words"
          >
            Hablemos!
          </h2>
          <p
            className="text-sm md:text-lg lg:text-xl xl:text-2xl font-normal leading-[1.2] tracking-[-0.02em] text-left mt-0 mb-0 text-black break-words"
          >
            SI TIENES MAS DUDAS SOBRE LOS PROGRAMAS DE ENTRENAMIENTO, NO DUDES EN ESCRIBIRME
          </p>
        </div>
        <div className="footer_contact-illo-wrap ml-2 md:ml-4 lg:ml-8 flex-shrink-0 hidden md:flex">
          
        </div>
      </a>
    </div>
  )
}

export default ContactCard; 