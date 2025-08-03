'use client'
import { FaWhatsapp } from "react-icons/fa";

export default function ProgramasSection() {

  // Función para redirigir a WhatsApp Business
  const redirectToWhatsAppBusiness = (programName: string, price: string) => {
    // Número de WhatsApp Business de Frank
    const WHATSAPP_BUSINESS_URL = "https://wa.me/56961530977";
    
    // Mensajes personalizados por programa
    let message = "";
    
    switch (programName) {
      case "DUQUE ALIMENTACIÓN":
        message = "Hola Frank! Me interesa el programa DUQUE ALIMENTACIÓN ($50.000). ¿Podrías enviarme el plan nutricional personalizado?";
        break;
      case "DUQUE TRAINING":
        message = "Hola Frank! Quiero información sobre DUQUE TRAINING ($90.000). ¿Cómo funciona el programa de entrenamiento?";
        break;
      case "DUQUE ULTIMATE":
        message = "Hola Frank! Me interesa DUQUE ULTIMATE (desde $120.000). ¿Podrías explicarme qué incluye el programa completo?";
        break;
      default:
        message = `Hola Frank! Estoy interesado en ${programName} por ${price}. ¿Podrías enviarme más información?`;
    }
    
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp Business en nueva ventana
    window.open(`${WHATSAPP_BUSINESS_URL}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full max-w-full bg-duque-gray py-20 flex justify-center overflow-x-hidden">
      <div className="max-w-5xl w-full px-4 md:px-6 lg:px-12">
      <h2 className="text-5xl md:text-7xl font-neue-montreal-bold uppercase text-white mb-6 break-words">
          Programas 
        </h2>
        <p className="text-lg md:text-2xl text-white mb-12 break-words">Descubre nuestros planes de entrenamiento y nutrición diseñados para potenciar tu rendimiento.</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 w-full max-w-full">
          {/* Card 1: DUQUE ALIMENTACIÓN */}
          <div className="bg-[#232323] rounded-2xl p-4 md:p-8 shadow-sm border border-[#4e4e4e] flex flex-col w-full max-w-full relative">
            <span className="absolute top-4 right-4 text-xs text-gray-400 font-normal">Online</span>
            <div className="mb-2">
              <h2 className="text-2xl md:text-3xl font-neue-montreal-bold text-white uppercase break-words tracking-wider">ALIMENTACIÓN</h2>
            </div>
            <div className="text-lg md:text-xl font-bold text-[#DAFF02] mb-4">$50.000</div>
            <p className="text-white text-sm md:text-base mb-2">INCLUYE:</p>
            <ul className="text-white text-sm md:text-base list-disc pl-5 space-y-1 mb-6">
              <li>Plan alimenticio según objetivos</li>
              <li>Ideal para perder grasa, ganar músculo o mantenerte saludable</li>
            </ul>
            <button
              className="bg-[#DAFF02] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border border-[#DAFF02] whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[#201E1F] hover:text-[#DAFF02] hover:border-[#DAFF02] text-[#201E1F] uppercase mt-auto font-bold"
              onClick={() => redirectToWhatsAppBusiness("DUQUE ALIMENTACIÓN", "$50.000")}
            >
              <FaWhatsapp className="mr-2 text-lg" />
              CONTACTAR AHORA
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">Te conectamos directamente con Frank por WhatsApp Business</p>
          </div>
          {/* Card 2: Duque Training */}
          <div className="bg-[#232323] rounded-2xl p-4 md:p-8 shadow-sm border border-[#4e4e4e] flex flex-col w-full max-w-full relative">
            <span className="absolute top-4 right-4 text-xs text-gray-400 font-normal">Online</span>
            <div className="mb-2">
              <h2 className="text-2xl md:text-3xl font-neue-montreal-bold text-white uppercase break-words tracking-wider">ENTRENAMIENTO</h2>
            </div>
            <div className="text-lg md:text-xl font-bold text-[#DAFF02] mb-4">$90.000</div>
            <p className="text-white text-sm md:text-base mb-2">INCLUYE:</p>
            <ul className="text-white text-sm md:text-base list-disc pl-5 space-y-1 mb-6">
              <li>Programas personalizados enfocados en la capacidad fisica solicitada</li>
                <li>Con Videos explicativos de los ejercicios</li>
            </ul>
            <button
              className="bg-[#DAFF02] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border border-[#DAFF02] whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[#201E1F] hover:text-[#DAFF02] hover:border-[#DAFF02] text-[#201E1F] uppercase mt-auto font-bold"
              onClick={() => redirectToWhatsAppBusiness("DUQUE TRAINING", "$90.000")}
            >
              <FaWhatsapp className="mr-2 text-lg" />
              CONTACTAR AHORA
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">Respuesta garantizada en menos de 2 horas</p>
          </div>
          {/* Card 3: DUQUE ULTIMATE (exclusiva) */}
          <div className="bg-[#232323] rounded-2xl p-4 md:p-8 shadow-lg border-2 border-[#DAFF02] flex flex-col w-full max-w-full relative">
            <span className="absolute top-4 right-4 text-xs font-normal text-[#DAFF02]">Presencial</span>
            <div className="mb-2">
              <h2 className="text-2xl md:text-3xl font-neue-montreal-bold text-white uppercase break-words tracking-wider">ENtrenamiento</h2>
            </div>
            <div className="text-lg md:text-xl font-bold text-white mb-4">Desde $120.000</div>
            <p className="text-white text-sm md:text-base mb-2">INCLUYE:</p>
            <ul className="text-white text-sm md:text-base list-disc pl-5 space-y-1 mb-6">
              <li>Entrenamiento presencial 1 a 1 en el centro de Basketball Performance Center</li>
    
            </ul>
            <button
              className="bg-[#DAFF02] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border border-[#DAFF02] whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[#201E1F] hover:text-[#DAFF02] hover:border-[#DAFF02] text-[#201E1F] uppercase mt-auto font-bold"
              onClick={() => redirectToWhatsAppBusiness("DUQUE ULTIMATE", "desde $120.000")}
            >
              <FaWhatsapp className="mr-2 text-lg" />
              CONTACTAR AHORA
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">Ubicación: Santiago de Chile, comuna Las Condes</p>
          </div>
        </div>
      </div>
    </div>
  )
} 