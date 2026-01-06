import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`,
      {
        status: 301,
      }
    );
  }

  if (data?.url) {
    return NextResponse.redirect(data.url, {
      status: 301,
    });
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
}

