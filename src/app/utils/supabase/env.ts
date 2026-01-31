/**
 * Supabase environment validation.
 * Use this before creating a client so missing env shows a clear error with a link.
 */

const SUPABASE_DASHBOARD_URL = "https://supabase.com/dashboard/project/_/settings/api";

export class SupabaseEnvError extends Error {
  readonly helpUrl = SUPABASE_DASHBOARD_URL;

  constructor() {
    super("Your project's URL and API key are required to create a Supabase client. " + "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment. " + `See: ${SUPABASE_DASHBOARD_URL}`);
    this.name = "SupabaseEnvError";
  }
}

export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url?.trim() || !anonKey?.trim()) {
    throw new SupabaseEnvError();
  }

  return { url: url.trim(), anonKey: anonKey.trim() };
}
