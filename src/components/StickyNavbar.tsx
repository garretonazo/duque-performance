'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'contacto', label: 'Contacto' },
  { id: 'programas', label: 'Programas' },
  { id: 'testimonios', label: 'Testimonios' },
]

export default function StickyNavbar() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      let found = ''
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80 && rect.bottom > 80) {
            found = section.id
            break
          }
        }
      }
      setActive(found)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2">
      {/* Fondo sólido oscuro con opacidad */}
      <div className="bg-[rgba(34,34,34,0.85)] p-[6px] rounded-[12px] inline-flex items-center border border-[rgba(212,212,212,0.2)]">
        {/* Label rojo a la izquierda */}
        <div className="bg-[#EF400B] text-white font-bold rounded-[12px] h-[60px] flex items-center px-4 text-[13px] mr-3 cursor-pointer transition-colors duration-200 hover:bg-[#c93400]">
          Elige tu plan
        </div>
        {/* Menú gris a la derecha */}
        <div className="bg-[#3e3e3e] rounded-[12px] flex items-center gap-[6px] h-[60px] px-[6px] text-[13px] text-[#dedede]">
          <ul className="flex items-center gap-[6px] h-full m-0 p-0">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={
                    `inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300
                    ${active === section.id
                      ? 'border-[#EF400B] text-[#EF400B]'
                      : 'border-[#4e4e4e] text-[#dedede]'}
                    hover:border-white`
                  }
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
} 