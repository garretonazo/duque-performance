import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { estado } = await req.json();
    if (!estado) {
      return NextResponse.json({ success: false, error: "Falta el estado" }, { status: 400 });
    }
    const updated = await prisma.solicitud.update({
      where: { id },
      data: { estado, fecha_actualizacion: new Date() },
    });
    return NextResponse.json({ success: true, solicitud: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 