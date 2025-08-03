"use client";
import { useRouter } from "next/navigation";

export default function CheckoutConfirmationPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-duque-gray flex flex-col items-center py-8 px-2 md:px-6">
      <div className="w-full max-w-2xl mx-auto bg-[#232323] rounded-2xl p-8 shadow-md border border-gray-700 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-neue-montreal-bold text-[#DAFF02] mb-4 uppercase">¡Compra Exitosa!</h1>
        <p className="text-white text-lg mb-4">Tu información fue recibida correctamente.</p>
        <div className="bg-[#201E1F] rounded-xl border border-[#4e4e4e] p-6 mb-6 w-full max-w-lg mx-auto">
          <p className="text-[#DAFF02] text-base font-semibold mb-2">¿Qué sigue?</p>
          <ul className="text-white text-left text-base space-y-2 mb-2">
            <li>✔️ Te llegará un <span className="text-[#DAFF02] font-bold">correo Gmail</span> con tu programa personalizado.</li>
            <li>⏱️ <span className="text-[#DAFF02] font-bold">Tiempo estimado de entrega:</span> 24-48 horas hábiles.</li>
            <li>📞 Si tienes dudas, contáctanos por WhatsApp al <a href="https://wa.me/56912345678" className="underline text-[#DAFF02]">+56 9 1234 5678</a> o por email a <a href="mailto:soporte@duqueperformance.com" className="underline text-[#DAFF02]">soporte@duqueperformance.com</a>.</li>
          </ul>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-[#201E1F] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white border-[#4e4e4e] text-[#dedede] uppercase mt-4"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
} 