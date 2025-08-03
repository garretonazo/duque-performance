'use client'

import { useState } from 'react'

const sections = [
  { id: 'programas', label: 'Programas' },
  { id: 'contacto', label: 'Contacto' },
]

export default function StickyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    // Si es contacto, redirigir a WhatsApp
    if (sectionId === 'contacto') {
      const message = encodeURIComponent("Hola Frank! Quiero más información sobre tus programas de entrenamiento. ¿Podrías ayudarme?");
      window.open(`https://wa.me/56961530977?text=${message}`, '_blank');
      setIsMenuOpen(false);
      return;
    }
    
    // Marcar como navegación intencional
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('navigation-intentional', 'true');
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation - Oculto en mobile/tablet */}
      <nav className="absolute top-8 right-8 z-50 px-2 group hidden lg:block">
        {/* Fondo sólido oscuro con opacidad */}
        <div className="bg-transparent p-[6px] rounded-[12px] inline-flex items-center ">
          {/* Label rojo a la izquierda */}
          
          {/* Menú gris a la derecha */}
          <div className="rounded-[12px] flex items-center gap-[6px] h-[60px] px-[6px] text-[13px] text-[#dedede]">
            <ul className=" flex items-center gap-[6px] h-full m-0 p-0">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => handleNavClick(section.id)}
                    className="bg-[#201E1F] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white border-[#4e4e4e] text-[#dedede]"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu Icon - Solo visible en mobile/tablet */}
      <div className="absolute top-8 right-8 z-50 lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#201E1F] p-3 rounded-[8px] border border-[#4e4e4e] text-[#dedede] hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 bg-[#201E1F] rounded-[8px] border border-[#4e4e4e] shadow-lg">
            <ul className="py-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => handleNavClick(section.id)}
                    className="block px-4 py-2 text-[#dedede] hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] transition-all duration-300"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
} 