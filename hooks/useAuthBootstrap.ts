"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/lib/config/supabase"; // adjust the import to your config

export function useAuthBootstrap() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        const session = data.session;

        if (!session) {
          setAuthenticated(false);
          router.push("/login");
        } else {
          // Check if access token is expired
          const expiresAt = session.expires_at; // unix timestamp in seconds
          const now = Math.floor(Date.now() / 1000);

          if (expiresAt && expiresAt < now) {
            // Access token expired, try to refresh
            const { data: refreshedData, error: refreshError } =
              await supabase.auth.refreshSession();

            if (refreshError || !refreshedData.session) {
              setAuthenticated(false);
              router.push("/login");
            } else {
              setAuthenticated(true);
            }
          } else {
            // Access token valid
            setAuthenticated(true);
          }
        }
      } catch (err) {
        setAuthenticated(false);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router, setAuthenticated]);

  return { loading, authenticated };
}
