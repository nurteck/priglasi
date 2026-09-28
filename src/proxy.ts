import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "saltanat_admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_PASSWORD;

  const authorized = Boolean(expected) && cookie === expected;

  if (!authorized) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
