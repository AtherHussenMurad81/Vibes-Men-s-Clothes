import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PrivateRoute = ["/dashboard", "/cart", "/checkout"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //   console.log(token);
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);
  //   console.log(isAuthenticated);

  const isPrivateReq = PrivateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callback=${reqPath}`, req.url)
    );
  }
  console.log({ token, isPrivateReq, reqPath });
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
