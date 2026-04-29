import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/types";

interface AuthState {
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = useCallback(async (uid: string | null) => {
    if (!uid) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("id,email,role,network_id,organization_id,approval_status,created_at")
      .eq("id", uid)
      .maybeSingle();
    if (error) {
      console.warn("[AuthProvider] profile load error", error.code, error.message);
      setProfile(null);
      return;
    }
    setProfile((data as Profile) ?? null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(session?.user?.id ?? null);
  }, [loadProfile, session?.user?.id]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      await loadProfile(data.session?.user?.id ?? null);
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, s) => {
      setSession(s);
      await loadProfile(s?.user?.id ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  return (
    <Ctx.Provider value={{ loading, session, profile, refreshProfile, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}
