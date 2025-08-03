'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sidebar items
const sidebarItems = [
  { label: "Dashboard Principal", key: "dashboard" },
  { label: "Gestión de Clientes", key: "clientes" },
  { label: "Notificaciones", key: "notificaciones" },
  { label: "Crear Programa", key: "programa" },
  { label: "Configuración", key: "configuracion" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [section, setSection] = useState("dashboard");

  // Protección de ruta
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("frank-auth") !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("frank-auth");
    router.replace("/admin/login");
  };

  const today = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex bg-[#232323] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#232323] flex flex-col py-8 px-4 gap-4 border-r border-[#4e4e4e]">
        <div className="mb-8">
          <span className="text-xl font-bold text-[#DAFF02]">ADMIN</span>
        </div>
        {sidebarItems.map((item) => {
          const isActive = section === item.key;
          return (
          <Button
            key={item.key}
            variant="ghost"
              className={
                `justify-start w-full text-left rounded-[8px] border capitalize transition-colors ` +
                (isActive
                  ? 'bg-[#DAFF02] text-black border-[#4e4e4e] pointer-events-none'
                  : 'bg-[#201E1F] text-white border-[#4e4e4e] hover:bg-[#DAFF02] hover:text-black')
              }
              style={{ textTransform: 'none' }}
              onClick={() => setSection(item.key)}
              {...(isActive ? { tabIndex: -1 } : {})}
          >
            {item.label}
            {item.key === "notificaciones" && (
              <Badge className="ml-2 bg-green-600">3</Badge>
            )}
          </Button>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-[#4e4e4e] bg-[#232323]">
          <div>
            <h1 className="text-2xl font-bold text-[#DAFF02]">Dashboard - Frank Duque</h1>
            <span className="text-sm text-[#DAFF02]">Fecha: {today}</span>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="bg-[#DAFF02] text-[#201E1F] rounded-[8px] border border-[#DAFF02] hover:bg-[#e6e600]">
            Cerrar sesión
          </Button>
        </header>

        {/* Render section */}
        <section className="flex-1 overflow-y-auto">
          {section === "dashboard" && <DashboardHome />}
          {section === "clientes" && <ClientesSection />}
          {section === "notificaciones" && <NotificacionesSection />}
          {section === "programa" && <CrearProgramaSection />}
          {section === "configuracion" && <ConfiguracionSection />}
        </section>
      </main>
    </div>
  );
}

// --- Sección Dashboard Principal ---
function DashboardHome() {
  type Solicitud = {
    id: string;
    nombre_completo: string;
    fecha_creacion: string;
    objetivo_principal: string;
    estado: string;
  };
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/solicitudes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSolicitudes(data.solicitudes);
      })
      .finally(() => setLoading(false));
  }, []);

  // Estadísticas
  const totalClientes = solicitudes.length;
  const totalPendientes = solicitudes.filter(s => s.estado === "pendiente").length;
  const now = new Date();
  const comprasMes = solicitudes.filter(s => {
    const fecha = new Date(s.fecha_creacion);
    return fecha.getMonth() === now.getMonth() && fecha.getFullYear() === now.getFullYear();
  }).length;
  // Ingresos: si tienes campo de monto, suma aquí. Por ahora simulado en 0.
  const ingresosMes = 0;

  return (
    <div className="p-8">
      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#201E1F] rounded-2xl border border-[#4e4e4e] text-white">
            <CardHeader>
              <CardTitle>Total Clientes</CardTitle>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">{loading ? '--' : totalClientes}</span>
            </CardContent>
          </Card>
        <Card className="bg-[#201E1F] rounded-2xl border border-[#4e4e4e] text-white">
            <CardHeader>
              <CardTitle>Nuevas Compras (Mes)</CardTitle>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">{loading ? '--' : comprasMes}</span>
            </CardContent>
          </Card>
        <Card className="bg-[#201E1F] rounded-2xl border border-[#4e4e4e] text-white">
            <CardHeader>
              <CardTitle>Programas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">{loading ? '--' : totalPendientes}</span>
            </CardContent>
          </Card>
        <Card className="bg-[#201E1F] rounded-2xl border border-[#4e4e4e] text-white">
            <CardHeader>
              <CardTitle>Ingresos (Mes)</CardTitle>
            </CardHeader>
            <CardContent>
            <span className="text-3xl font-bold">${loading ? '--' : ingresosMes}</span>
            </CardContent>
          </Card>
      </div>
        {/* Actividad Reciente */}
      <div>
          <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
          <ul className="space-y-2">
          <li className="bg-[#201E1F] rounded-2xl border border-[#4e4e4e] p-4 text-white">No hay actividad reciente.</li>
          </ul>
      </div>
    </div>
  );
}

// --- Sección Gestión de Clientes ---
function ClientesSection() {
  type Solicitud = {
    id: string;
    nombre_completo: string;
    fecha_creacion: string;
    objetivo_principal: string;
    estado: string;
    peso_actual?: number;
    unidad_peso?: string;
    porcentaje_grasa?: number;
    altura?: number;
    unidad_altura?: string;
    numero_celular?: string;
    correo_gmail?: string;
    notas_admin?: string;
  };
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Solicitud | null>(null);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [objetivoFilter, setObjetivoFilter] = useState("");
  const [estadoUpdating, setEstadoUpdating] = useState<string | null>(null);
  const [estadoError, setEstadoError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/solicitudes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSolicitudes(data.solicitudes);
        else setError(data.error || "Error al cargar solicitudes");
      })
      .catch(() => setError("Error de red"))
      .finally(() => setLoading(false));
  }, []);

  // Filtros y búsqueda
  const filtered = solicitudes.filter((s) => {
    const matchesSearch =
      s.nombre_completo.toLowerCase().includes(search.toLowerCase()) ||
      (s.correo_gmail && s.correo_gmail.toLowerCase().includes(search.toLowerCase())) ||
      (s.numero_celular && s.numero_celular.includes(search));
    const matchesEstado = estadoFilter ? s.estado === estadoFilter : true;
    const matchesObjetivo = objetivoFilter ? s.objetivo_principal === objetivoFilter : true;
    return matchesSearch && matchesEstado && matchesObjetivo;
  });

  // Objetivos únicos para el filtro
  const objetivosUnicos = Array.from(new Set(solicitudes.map(s => s.objetivo_principal)));

  // Función para actualizar estado
  const handleEstadoChange = async (id: string, newEstado: string) => {
    setEstadoUpdating(id);
    setEstadoError(null);
    try {
      const res = await fetch(`/api/admin/solicitudes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: newEstado }),
      });
      const data = await res.json();
      if (data.success) {
        setSolicitudes((prev) => prev.map(s => s.id === id ? { ...s, estado: newEstado } : s));
      } else {
        setEstadoError(data.error || "Error al actualizar estado");
      }
    } catch {
      setEstadoError("Error de red");
    } finally {
      setEstadoUpdating(null);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Gestión de Clientes</h2>
      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre, email o celular..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 rounded bg-[#201E1F] border border-[#4e4e4e] text-white w-full md:w-64"
        />
        <select
          value={estadoFilter}
          onChange={e => setEstadoFilter(e.target.value)}
          className="px-3 py-2 rounded bg-[#201E1F] border border-[#4e4e4e] text-white w-full md:w-48"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completado">Completado</option>
        </select>
        <select
          value={objetivoFilter}
          onChange={e => setObjetivoFilter(e.target.value)}
          className="px-3 py-2 rounded bg-[#201E1F] border border-[#4e4e4e] text-white w-full md:w-64"
        >
          <option value="">Todos los objetivos</option>
          {objetivosUnicos.map(obj => (
            <option key={obj} value={obj}>{obj}</option>
          ))}
        </select>
      </div>
      <div className="bg-[#232323] rounded-lg p-4 md:p-8 overflow-x-auto">
        {loading ? (
          <div className="text-gray-400 text-center py-8">Cargando...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Sin registros</div>
        ) : (
          <table className="min-w-[700px] w-full text-sm text-left">
            <thead>
              <tr className="text-[#DAFF02] border-b border-[#4e4e4e]">
                <th className="py-2 px-2">ID</th>
                <th className="py-2 px-2">Nombre</th>
                <th className="py-2 px-2">Fecha</th>
                <th className="py-2 px-2">Objetivo</th>
                <th className="py-2 px-2">Estado</th>
                <th className="py-2 px-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-[#333] hover:bg-[#201E1F] transition-colors">
                  <td className="py-2 px-2 font-mono text-xs max-w-[120px] truncate">{s.id}</td>
                  <td className="py-2 px-2">{s.nombre_completo}</td>
                  <td className="py-2 px-2">{new Date(s.fecha_creacion).toLocaleString("es-ES")}</td>
                  <td className="py-2 px-2">{s.objetivo_principal}</td>
                  <td className="py-2 px-2">
                    <select
                      value={s.estado}
                      onChange={e => handleEstadoChange(s.id, e.target.value)}
                      className={
                        `rounded px-2 py-1 text-xs border border-[#4e4e4e] ` +
                        (s.estado === 'pendiente'
                          ? 'bg-yellow-700 text-yellow-200'
                          : s.estado === 'en_proceso'
                          ? 'bg-blue-700 text-blue-200'
                          : 'bg-green-700 text-green-200')
                      }
                      disabled={estadoUpdating === s.id}
                    >
                      <option value="pendiente" className="bg-yellow-700 text-yellow-200">Pendiente</option>
                      <option value="en_proceso" className="bg-blue-700 text-blue-200">En proceso</option>
                      <option value="completado" className="bg-green-700 text-green-200">Completado</option>
                    </select>
                    {estadoUpdating === s.id && <span className="ml-2 text-[#DAFF02] text-xs">Guardando...</span>}
                  </td>
                  <td className="py-2 px-2">
                    <button className="text-[#DAFF02] underline hover:text-white transition-colors text-xs" onClick={() => setSelected(s)}>Ver detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {estadoError && <div className="text-red-500 text-center mt-2 text-xs">{estadoError}</div>}
      </div>
      {/* Modal de detalle */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#232323] rounded-2xl border border-[#4e4e4e] shadow-xl p-6 w-full max-w-lg mx-auto relative">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[#DAFF02] text-xl font-bold hover:text-white">×</button>
            <h3 className="text-2xl font-bold text-[#DAFF02] mb-4">Detalle de Solicitud</h3>
            <div className="space-y-2 text-white text-sm">
              <div><span className="font-semibold text-[#DAFF02]">ID:</span> <span className="font-mono">{selected.id}</span></div>
              <div><span className="font-semibold text-[#DAFF02]">Nombre:</span> {selected.nombre_completo}</div>
              <div><span className="font-semibold text-[#DAFF02]">Fecha:</span> {new Date(selected.fecha_creacion).toLocaleString("es-ES")}</div>
              <div><span className="font-semibold text-[#DAFF02]">Objetivo:</span> {selected.objetivo_principal}</div>
              <div><span className="font-semibold text-[#DAFF02]">Estado:</span> <span className={
                selected.estado === "pendiente"
                  ? "bg-yellow-700 text-yellow-200 px-2 py-1 rounded text-xs"
                  : selected.estado === "en_proceso"
                  ? "bg-blue-700 text-blue-200 px-2 py-1 rounded text-xs"
                  : "bg-green-700 text-green-200 px-2 py-1 rounded text-xs"
              }>{selected.estado.replace(/_/g, ' ')}</span></div>
              <div><span className="font-semibold text-[#DAFF02]">Peso Actual:</span> {selected.peso_actual} {selected.unidad_peso}</div>
              <div><span className="font-semibold text-[#DAFF02]">% Grasa:</span> {selected.porcentaje_grasa} %</div>
              <div><span className="font-semibold text-[#DAFF02]">Altura:</span> {selected.altura} {selected.unidad_altura}</div>
              <div><span className="font-semibold text-[#DAFF02]">Celular:</span> {selected.numero_celular}</div>
              <div><span className="font-semibold text-[#DAFF02]">Email:</span> {selected.correo_gmail}</div>
              <div><span className="font-semibold text-[#DAFF02]">Notas admin:</span> {selected.notas_admin || <span className="italic text-gray-400">(vacío)</span>}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sección Notificaciones ---
function NotificacionesSection() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
      {/* Aquí irá la lista de notificaciones */}
      <div className="bg-[#232323] rounded-lg p-8 text-center text-gray-400">
        Panel de notificaciones próximamente...
      </div>
    </div>
  );
}

// --- Sección Crear Programa ---
function CrearProgramaSection() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Crear Programa</h2>
      {/* Aquí irá el formulario de creación de programas */}
      <div className="bg-[#232323] rounded-lg p-8 text-center text-gray-400">
        Formulario de creación de programas próximamente...
      </div>
    </div>
  );
}

// --- Sección Configuración ---
function ConfiguracionSection() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Configuración</h2>
      {/* Aquí irá la configuración de Frank */}
      <div className="bg-[#232323] rounded-lg p-8 text-center text-gray-400">
        Configuración de perfil y sistema próximamente...
      </div>
    </div>
  );
}