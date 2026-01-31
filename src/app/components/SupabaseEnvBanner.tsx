"use client";

import { useAuth } from "@/app/contexts/AuthContext";

const DASHBOARD_URL = "https://supabase.com/dashboard/project/_/settings/api";

/**
 * Shows a banner when Supabase env vars are missing so devs get a clear message and link.
 * Renders nothing when env is configured.
 */
export default function SupabaseEnvBanner() {
  const { supabaseEnvError } = useAuth();

  if (!supabaseEnvError) return null;

  return (
    <div
      role="alert"
      style={{
        background: "#1c1917",
        color: "#fef3c7",
        padding: "0.75rem 1rem",
        fontSize: "0.875rem",
        borderBottom: "1px solid #78716c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      <span>Supabase not configured.</span>
      <span style={{ opacity: 0.9 }}>Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</span>
      <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "underline", fontWeight: 500 }}>
        Get values →
      </a>
    </div>
  );
}
