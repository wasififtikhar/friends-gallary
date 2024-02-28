import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const cookiesLogin = cookies();

  if (cookiesLogin.get("login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/apiUsers";
    return NextResponse.rewrite(url.href);
  } else {
  }
}

export const config = {
  matcher: ["/apiUsers", "/login", "/registration", "/"],
};
