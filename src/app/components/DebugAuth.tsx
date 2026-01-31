"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

/**
 * Debug component to help troubleshoot auth issues
 * Remove this in production!
 */
export default function DebugAuth({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return null;
  }

  const { user, loading, supabaseEnvError } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseEnvError) return;

    const supabase = createClient();

    // Get session info
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setSessionInfo({
          session: data.session ? "exists" : "null",
          user: data.session?.user?.id || "no user",
          expiresAt: data.session?.expires_at,
        });
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSessionInfo({
        session: session ? "exists" : "null",
        user: session?.user?.id || "no user",
        event: event,
      });
    });

    return () => subscription.unsubscribe();
  }, [supabaseEnvError]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "#1a1a1a",
        color: "#fff",
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.75rem",
        maxWidth: "300px",
        zIndex: 500,
        border: "1px solid #333",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Auth Debug</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {supabaseEnvError && (
          <div style={{ color: "#ffb347", marginBottom: "0.5rem" }}>
            <strong>Env:</strong>{" "}
            <a href="https://supabase.com/dashboard/project/_/settings/api" target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "underline" }}>
              Supabase not configured
            </a>
            — {supabaseEnvError}
          </div>
        )}
        <div>
          <strong>Loading:</strong> {loading ? "true" : "false"}
        </div>
        <div>
          <strong>User:</strong> {user ? user.email : "null"}
        </div>
        <div>
          <strong>User ID:</strong> {user?.id || "null"}
        </div>
        <div>
          <strong>Session:</strong> {sessionInfo?.session || "checking..."}
        </div>
        <div>
          <strong>Event:</strong> {sessionInfo?.event || "none"}
        </div>
        {error && (
          <div style={{ color: "#ff6b6b" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", opacity: 0.7 }}>Check browser console for more details</div>
      </div>
    </div>
  );
}
