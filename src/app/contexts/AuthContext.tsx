"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseEnvError } from "@/app/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  /** Set when Supabase env vars are missing; message includes help link */
  supabaseEnvError: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseEnvError, setSupabaseEnvError] = useState<string | null>(null);

  useEffect(() => {
    let supabase;
    try {
      supabase = createClient();
    } catch (e) {
      if (e instanceof SupabaseEnvError) {
        setSupabaseEnvError(e.message);
        setLoading(false);
        return;
      }
      throw e;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error);
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.email);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      if (e instanceof SupabaseEnvError) {
        setUser(null);
        return;
      }
      throw e;
    }
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, supabaseEnvError, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
