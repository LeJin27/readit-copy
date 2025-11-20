import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  console.log("Middleware triggered for path:", req.nextUrl.pathname);
  const { pathname } = req.nextUrl;
  console.log(pathname);

  const isPublic = publicRoutes.includes(pathname);
  try {
    const cookie = req.cookies.get("session")?.value;
    console.log(cookie);
    //await new AuthService().validJwt(cookie);
    // delete later
    if (!isPublic) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch {
    if (!isPublic) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
      Match only application routes, not static files or Next.js internals.
      Adjust as needed for your app structure.
    */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
