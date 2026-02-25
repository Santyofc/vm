import { NextResponse } from "next/server";

/**
 * GET /api/health
 * Endpoint de liveness check usado por el healthcheck de Docker.
 * Responde rápido y sin dependencias externas (no consulta la DB).
 * Para un readiness check real, agrega: await prisma.$queryRaw`SELECT 1`
 */
export async function GET() {
  return NextResponse.json(
    { status: "ok", timestamp: new Date().toISOString() },
    { status: 200 },
  );
}
