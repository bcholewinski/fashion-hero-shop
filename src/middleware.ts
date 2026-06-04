import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Read the PostHog distinct_id from the cookie and pass it as a header
  // so server components can use it for feature flags / server-side capture.
  const phCookieKey = `ph_${process.env.NEXT_PUBLIC_POSTHOG_KEY}_posthog`;
  const phCookie = request.cookies.get(phCookieKey);

  if (phCookie) {
    try {
      const parsed = JSON.parse(phCookie.value) as { distinct_id?: string };
      if (parsed.distinct_id) {
        response.headers.set("x-posthog-distinct-id", parsed.distinct_id);
      }
    } catch {
      // Ignore malformed cookie
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
