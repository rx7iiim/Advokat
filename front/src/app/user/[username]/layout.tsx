"use client"; // Enables hooks in App Router

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { username } = useParams();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("http://localhost:5008/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || data.username !== username) {
          router.push("/login");
        } else {
          setAuthenticated(true);
        }
      })
      .catch(() => router.push("/login"));
  }, [username, router]);

  if (authenticated === null) return <p>Loading...</p>; // Show a loader while checking auth

  return <>{children}</>; // Render subpages when authenticated
}
