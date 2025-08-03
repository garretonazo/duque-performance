import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      orderBy: { fecha_creacion: "desc" }
    });
    return NextResponse.json({ success: true, solicitudes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 