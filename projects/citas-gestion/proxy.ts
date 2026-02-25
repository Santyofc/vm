import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""

  // 1. Excluir rutas internas de rescrituras
  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  // 2. Lógica para subdominio ADMIN
  if (hostname.startsWith("admin.")) {
    // FIX: Evitar bucle en admin
    if (url.pathname.startsWith("/admin")) return NextResponse.next()
    return NextResponse.rewrite(new URL(`/admin${url.pathname}`, req.url))
  }

  // 3. Lógica para subdominio CITA (Tenant)
  if (hostname.startsWith("cita.")) {
    // FIX: Evitar bucle en cita
    if (url.pathname.startsWith("/tenant")) return NextResponse.next()
    return NextResponse.rewrite(new URL(`/tenant${url.pathname}`, req.url))
  }

  // 4. Lógica para dominio principal (Landing)
  if (hostname === "zonasurtech.online" || hostname === "www.zonasurtech.online") {
    // FIX: Evitar el bucle infinito de /landing/landing/landing...
    if (url.pathname.startsWith("/landing")) {
      return NextResponse.next()
    }
    
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/landing", req.url))
    }
    return NextResponse.rewrite(new URL(`/landing${url.pathname}`, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
