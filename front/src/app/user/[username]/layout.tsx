"use client"; // Enables hooks in App Router

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as dotenv from 'dotenv';
dotenv.config();


export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { username } = useParams();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/auth/session`, { credentials: "include" })
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
