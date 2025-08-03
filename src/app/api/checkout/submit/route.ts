import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Validación básica (puedes expandirla según tus necesidades)
    if (!data.nombre || !data.objetivo || !data.pesoActual || !data.unidadPeso || !data.porcentajeGrasa || !data.altura || !data.unidadAltura || !data.celular || !data.gmail) {
      return NextResponse.json({ success: false, error: "Faltan campos obligatorios" }, { status: 400 });
    }
    // Guardar en la base de datos
    const nuevaSolicitud = await prisma.solicitud.create({
      data: {
        nombre_completo: data.nombre,
        objetivo_principal: data.objetivo,
        peso_actual: parseFloat(data.pesoActual),
        unidad_peso: data.unidadPeso,
        porcentaje_grasa: parseFloat(data.porcentajeGrasa),
        altura: parseFloat(data.altura),
        unidad_altura: data.unidadAltura,
        numero_celular: data.celular,
        correo_gmail: data.gmail,
        estado: "pendiente",
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
        notas_admin: "",
      },
    });
    return NextResponse.json({ success: true, id: nuevaSolicitud.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 