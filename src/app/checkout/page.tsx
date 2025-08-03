"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Tipos para el formulario y programa
interface Program {
  id: string;
  title: string;
  price: string;
  description: string;
  includes: string[];
}

interface FormState {
  nombre: string;
  pesoActual: string;
  unidadPeso: string;
  porcentajeGrasa: string;
  altura: string;
  unidadAltura: string;
  objetivo: string;
  deporte: string;
  celular: string;
  gmail: string;
}

interface Errors {
  nombre?: string;
  pesoActual?: string;
  porcentajeGrasa?: string;
  altura?: string;
  objetivo?: string;
  deporte?: string;
  celular?: string;
  gmail?: string;
}

interface Touched {
  nombre?: boolean;
  pesoActual?: boolean;
  porcentajeGrasa?: boolean;
  altura?: boolean;
  objetivo?: boolean;
  deporte?: boolean;
  celular?: boolean;
  gmail?: boolean;
}

const PROGRAMS: Program[] = [
  {
    id: "duque-s",
    title: "DUQUE ALIMENTACIÓN",
    price: "$50.000",
    description: "Plan alimenticio según objetivos. Ideal para perder grasa, ganar músculo o mantenerte saludable.",
    includes: [
      "Plan alimenticio según objetivos",
      "Ideal para perder grasa, ganar músculo o mantenerte saludable"
    ],
  },
  {
    id: "duque-pro",
    title: "DUQUE TRAINING",
    price: "$90.000",
    description: "Rutinas enfocadas para capacidades físicas de tu deporte.",
    includes: [
      "Rutinas enfocadas para capacidades físicas de tu deporte"
    ],
  },
  {
    id: "centro-duque",
    title: "DUQUE ULTIMATE",
    price: "Desde $120.000",
    description: "Entrenamiento presencial 1 a 1 en el centro de Basketball Performance Center. Ubicación: Santiago de Chile, comuna Las Condes.",
    includes: [
      "Entrenamiento presencial 1 a 1 en el centro de Basketball Performance Center",
      "Ubicación: Santiago de Chile, comuna Las Condes"
    ],
  },
];

const sportsOptions = [
  "Fútbol",
  "Baloncesto",
  "Running/Carrera",
  "Ciclismo",
  "Natación",
  "Tenis",
  "CrossFit",
  "Gimnasia",
  "Artes marciales",
  "Otro",
];

// Opciones de objetivo principal
const objetivos = [
  "Perder grasa",
  "Ganar masa muscular",
  "Perder grasa y ganar masa muscular",
  "Mantenerme saludable",
  "Aumentar rendimiento deportivo"
];

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<FormState>({
    nombre: "",
    pesoActual: "",
    unidadPeso: "kg",
    porcentajeGrasa: "",
    altura: "",
    unidadAltura: "cm",
    objetivo: "",
    deporte: "",
    celular: "",
    gmail: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [loading, setLoading] = useState(false);

  // Redirigir al inicio si se refresca la página sin parámetros
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = params.get("program");
      if (!id) {
        // Si no hay parámetro program, redirigir al inicio inmediatamente
        router.replace('/');
        return;
      }
      setIsLoading(false);
    }
  }, [params, router]);

  // Recuperar info del programa
  useEffect(() => {
    const id = params.get("program");
    const found = PROGRAMS.find((p) => p.id === id);
    setProgram(found || null);
  }, [params]);

  // Función de navegación que va a la página principal con hash
  const handleNavClick = () => {
    // Marcar como navegación intencional
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('navigation-intentional', 'true');
    }
    router.push('/#programas');
  }

  // Validaciones
  function capitalizeWords(str: string) {
    return str.replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    let val = value;
    if (name === "nombre") {
      val = capitalizeWords(value.trimStart());
    }
    setForm((f) => ({ ...f, [name]: val }));
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function validate(f: FormState) {
    const e: Errors = {};
    if (!f.nombre) e.nombre = "Obligatorio";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\- ]{2,50}$/.test(f.nombre.trim())) e.nombre = "Solo letras, espacios y guiones (2-50)";
    if (!f.pesoActual) e.pesoActual = "Obligatorio";
    if (!f.porcentajeGrasa) e.porcentajeGrasa = "Obligatorio";
    else {
      const pg = parseFloat(f.porcentajeGrasa);
      if (pg < 3 || pg > 60) e.porcentajeGrasa = "% de grasa fuera de rango (3-60)";
    }
    if (!f.altura) e.altura = "Obligatorio";
    if (!f.objetivo) e.objetivo = "Obligatorio";
    if (f.objetivo === 'Aumentar rendimiento deportivo' && !f.deporte) e.deporte = "Obligatorio";
    if (!f.celular) e.celular = "Obligatorio";
    else if (!/^\d{8,15}$/.test(f.celular)) e.celular = "Número inválido";
    if (!f.gmail) e.gmail = "Obligatorio";
    else if (!/^([a-zA-Z0-9_.+-]+)@gmail\.com$/.test(f.gmail)) e.gmail = "Solo se permite correo Gmail válido";
    if (f.pesoActual) {
      const actual = parseFloat(f.pesoActual);
      if (actual < 30 || actual > 250) e.pesoActual = "Peso fuera de rango";
    }
    if (f.altura) {
      const altura = parseFloat(f.altura);
      if (f.unidadAltura === "cm" && (altura < 100 || altura > 250)) e.altura = "Altura fuera de rango";
      if (f.unidadAltura === "ft" && (altura < 3 || altura > 8)) e.altura = "Altura fuera de rango";
    }
    return e;
  }

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ pesoActual: true, porcentajeGrasa: true, altura: true, deporte: true, celular: true, gmail: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const res = await fetch("/api/checkout/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          router.push("/checkout/confirmation");
        } else {
          alert(data.error || "Ocurrió un error al procesar tu solicitud. Intenta nuevamente.");
        }
      } catch {
        alert("Ocurrió un error de red. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }
  }

  // Mostrar loading mientras se verifica
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-duque-gray">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-duque-gray text-white">
        <h2 className="text-3xl font-bold mb-4">Programa no encontrado</h2>
        <button onClick={handleNavClick} className="bg-[#201E1F] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white border-[#4e4e4e] text-[#dedede] uppercase">Volver</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duque-gray flex flex-col items-center py-8 px-2 md:px-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario principal */}
        <div className="md:col-span-2 bg-[#232323] rounded-2xl p-6 md:p-8 shadow-md border border-gray-700 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-neue-montreal-bold text-white mb-2 uppercase">Información Personal</h1>
          <p className="text-[#DAFF02] text-base mb-8 font-medium">Para que Duque pueda diseñar un programa 100% personalizado y ponerse en contacto contigo, necesitamos conocer tus datos físicos y de contacto. Esta información es esencial para adaptar el plan a tus objetivos y brindarte la mejor atención posible.</p>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl mx-auto">
            {/* Campo Nombre Completo */}
            <div>
              <label className="block text-white mb-1">Nombre Completo <span className="text-duque-red">*</span></label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                onBlur={() => setForm((f) => ({ ...f, nombre: f.nombre.trim() }))}
                className={`w-full px-3 py-2 rounded bg-duque-gray-light border ${errors.nombre && touched.nombre ? 'border-duque-red' : 'border-gray-600'} text-white capitalize`}
                placeholder="Ingresa tu nombre completo"
                minLength={2}
                maxLength={50}
                required
                autoComplete="name"
              />
              {errors.nombre && touched.nombre && <span className="text-duque-red text-xs ml-2">{errors.nombre}</span>}
            </div>
            <div>
              <label className="block text-white mb-1">Objetivo principal <span className="text-duque-red">*</span></label>
              <select
                name="objetivo"
                value={form.objetivo}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-[#232323] text-[#DAFF02] border ${errors.objetivo && touched.objetivo ? 'border-duque-red' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#DAFF02]`}
                required
                onBlur={() => setTouched((t) => ({ ...t, objetivo: true }))}
              >
                <option value="" className="bg-[#232323] text-[#DAFF02]">Selecciona tu objetivo</option>
                {objetivos.map((obj) => (
                  <option key={obj} value={obj} className="bg-[#232323] text-[#DAFF02]">{obj}</option>
                ))}
              </select>
              {errors.objetivo && touched.objetivo && <span className="text-duque-red text-xs ml-2">{errors.objetivo}</span>}
            </div>
            {form.objetivo === 'Aumentar rendimiento deportivo' && (
              <div>
                <label className="block text-white mb-1">Deporte Principal <span className="text-duque-red">*</span></label>
                <select
                  name="deporte"
                  value={form.deporte}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded bg-[#232323] text-[#DAFF02] border ${errors.deporte && touched.deporte ? 'border-duque-red' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-[#DAFF02]`}
                  required
                  onBlur={() => setTouched((t) => ({ ...t, deporte: true }))}
                >
                  <option value="" className="bg-[#232323] text-[#DAFF02]">Selecciona un deporte</option>
                  {sportsOptions.map((sport) => (
                    <option key={sport} value={sport} className="bg-[#232323] text-[#DAFF02]">{sport}</option>
                  ))}
                </select>
                {errors.deporte && touched.deporte && <span className="text-duque-red text-xs ml-2">{errors.deporte}</span>}
              </div>
            )}
            <div>
              <label className="block text-white mb-1">Peso Actual <span className="text-duque-red">*</span></label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="pesoActual"
                  value={form.pesoActual}
                  onChange={handleChange}
                  className={`w-32 px-3 py-2 rounded bg-duque-gray-light border ${errors.pesoActual && touched.pesoActual ? 'border-duque-red' : 'border-gray-600'} text-white`}
                  min={30}
                  max={250}
                  step={0.1}
                  placeholder="Ej: 70"
                  required
                />
                <select name="unidadPeso" value={form.unidadPeso} onChange={handleChange} className="bg-[#232323] text-[#DAFF02] rounded px-2 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DAFF02]">
                  <option value="kg" className="bg-[#232323] text-[#DAFF02]">kg</option>
                  <option value="lbs" className="bg-[#232323] text-[#DAFF02]">lbs</option>
                </select>
                {errors.pesoActual && touched.pesoActual && <span className="text-duque-red text-xs ml-2">{errors.pesoActual}</span>}
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">% de grasa <span className="text-duque-red">*</span></label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="porcentajeGrasa"
                  value={form.porcentajeGrasa}
                  onChange={handleChange}
                  className={`w-32 px-3 py-2 rounded bg-duque-gray-light border ${errors.porcentajeGrasa && touched.porcentajeGrasa ? 'border-duque-red' : 'border-gray-600'} text-white`}
                  min={3}
                  max={60}
                  step={0.1}
                  placeholder="Ej: 18"
                  required
                />
                <span className="text-[#DAFF02]">%</span>
                {errors.porcentajeGrasa && touched.porcentajeGrasa && <span className="text-duque-red text-xs ml-2">{errors.porcentajeGrasa}</span>}
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">Altura <span className="text-duque-red">*</span></label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="altura"
                  value={form.altura}
                  onChange={handleChange}
                  className={`w-32 px-3 py-2 rounded bg-duque-gray-light border ${errors.altura && touched.altura ? 'border-duque-red' : 'border-gray-600'} text-white`}
                  min={form.unidadAltura === 'cm' ? 100 : 3}
                  max={form.unidadAltura === 'cm' ? 250 : 8}
                  step={form.unidadAltura === 'cm' ? 1 : 0.01}
                  placeholder={form.unidadAltura === 'cm' ? 'Ej: 175' : 'Ej: 5.8'}
                  required
                />
                <select name="unidadAltura" value={form.unidadAltura} onChange={handleChange} className="bg-[#232323] text-[#DAFF02] rounded px-2 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DAFF02]">
                  <option value="cm" className="bg-[#232323] text-[#DAFF02]">cm</option>
                  <option value="ft" className="bg-[#232323] text-[#DAFF02]">pies</option>
                </select>
                {errors.altura && touched.altura && <span className="text-duque-red text-xs ml-2">{errors.altura}</span>}
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">Número de Celular <span className="text-duque-red">*</span></label>
              <input
                type="tel"
                name="celular"
                value={form.celular}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-duque-gray-light border ${errors.celular && touched.celular ? 'border-duque-red' : 'border-gray-600'} text-white`}
                placeholder="Ej: 56912345678"
                required
                maxLength={15}
                minLength={8}
                pattern="\d{8,15}"
                onBlur={() => setTouched((t) => ({ ...t, celular: true }))}
              />
              {errors.celular && touched.celular && <span className="text-duque-red text-xs ml-2">{errors.celular}</span>}
            </div>
            <div>
              <label className="block text-white mb-1">Correo Gmail <span className="text-duque-red">*</span></label>
              <input
                type="email"
                name="gmail"
                value={form.gmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-duque-gray-light border ${errors.gmail && touched.gmail ? 'border-duque-red' : 'border-gray-600'} text-white`}
                placeholder="Ej: usuario@gmail.com"
                required
                pattern="^[a-zA-Z0-9_.+-]+@gmail.com$"
                onBlur={() => setTouched((t) => ({ ...t, gmail: true }))}
              />
              {errors.gmail && touched.gmail && <span className="text-duque-red text-xs ml-2">{errors.gmail}</span>}
            </div>
            <div className="flex justify-between mt-8">
              <button type="button" onClick={handleNavClick} className="bg-[#201E1F] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white border-[#4e4e4e] text-[#dedede] uppercase">Volver</button>
              <button type="submit" disabled={loading} className="bg-[#201E1F] inline-flex items-center h-[44px] px-[12px] rounded-[8px] border whitespace-nowrap font-normal cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[color:var(--duque-yellow)] hover:text-[#201E1F] hover:border-white border-[#4e4e4e] text-[#dedede] uppercase disabled:opacity-60 disabled:cursor-not-allowed">{loading ? "Enviando..." : "Continuar"}</button>
            </div>
          </form>
        </div>
        {/* Panel lateral sticky de Programa Seleccionado */}
        <aside className="md:col-span-1 sticky top-8 self-start bg-[#201E1F] rounded-2xl border border-gray-600 shadow-lg p-6 flex flex-col gap-4 min-w-[260px] max-w-md w-full">
          <h2 className="text-[#DAFF02] text-xl font-bold uppercase mb-2">Programa Seleccionado</h2>
          <hr className="border-[#DAFF02] mb-2" />
          <div>
            <h3 className="text-white text-lg font-bold mb-1">{program.title}</h3>
            <div className="text-3xl font-bold text-[#DAFF02] mb-2">{program.price}</div>
            <p className="text-white text-base mb-3">{program.description}</p>
            <div>
              <h4 className="text-[#DAFF02] font-semibold mb-1">Qué incluye:</h4>
              <ul className="list-disc pl-5 text-white text-sm space-y-1">
                {program.includes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <select
            value={program.id}
            onChange={e => {
              const newId = e.target.value;
              router.replace(`/checkout?program=${newId}`);
            }}
            className="bg-[#201E1F] text-[#dedede] border border-[#4e4e4e] rounded-[8px] h-[44px] px-[12px] pr-8 mt-auto uppercase font-normal cursor-pointer transition-all duration-300 hover:bg-[#DAFF02] hover:text-[#201E1F] hover:border-white"
          >
            {PROGRAMS.map(p => (
              <option key={p.id} value={p.id} className="bg-[#201E1F] text-[#dedede]">{p.title}</option>
            ))}
          </select>
        </aside>
      </div>
    </div>
  );
} 