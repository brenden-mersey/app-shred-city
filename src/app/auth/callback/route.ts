import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";
  const error = requestUrl.searchParams.get("error");

  // If there's an error from OAuth, redirect with error
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error)}`,
      { status: 301 }
    );
  }

  if (code) {
    // Explicitly access cookies before creating client to ensure PKCE code verifier is available
    // This is necessary for Next.js 14+ due to lazy cookie evaluation
    const cookieStore = await cookies();
    cookieStore.getAll(); // Force Next.js to read cookies

    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(
          exchangeError.message
        )}`,
        { status: 301 }
      );
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
